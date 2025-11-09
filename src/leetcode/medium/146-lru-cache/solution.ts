// src/leetcode/medium/146-lru-cache/solution.ts

// 定义双向链表节点
class DLinkedNode {
  key: number
  value: number
  prev: DLinkedNode | null
  next: DLinkedNode | null

  constructor(key = 0, value = 0) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

export class LRUCache {
  private capacity: number
  private cache: Map<number, DLinkedNode>
  private head: DLinkedNode
  private tail: DLinkedNode

  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map()
    // 初始化哨兵节点
    this.head = new DLinkedNode()
    this.tail = new DLinkedNode()
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  private moveToTail(node: DLinkedNode): void {
    // 先从链表中移除 node
    node.prev!.next = node.next
    node.next!.prev = node.prev
    // 再将 node 添加到尾部
    node.prev = this.tail.prev
    node.next = this.tail
    this.tail.prev!.next = node
    this.tail.prev = node
  }

  private addToTail(node: DLinkedNode): void {
    node.prev = this.tail.prev
    node.next = this.tail
    this.tail.prev!.next = node
    this.tail.prev = node
  }

  private removeHead(): DLinkedNode {
    const node = this.head.next!
    this.head.next = node.next
    node.next!.prev = this.head
    return node
  }

  get(key: number): number {
    const node = this.cache.get(key)
    if (!node) {
      return -1
    }
    // 将访问过的节点移动到链表尾部
    this.moveToTail(node)
    return node.value
  }

  put(key: number, value: number): void {
    const node = this.cache.get(key)

    if (node) {
      // key 已存在，更新 value 并移动到尾部
      node.value = value
      this.moveToTail(node)
    } else {
      // key 不存在，创建新节点
      const newNode = new DLinkedNode(key, value)
      this.cache.set(key, newNode)
      this.addToTail(newNode)

      // 检查容量是否超限
      if (this.cache.size > this.capacity) {
        // 移除最久未使用的节点
        const headNode = this.removeHead()
        this.cache.delete(headNode.key)
      }
    }
  }
}
