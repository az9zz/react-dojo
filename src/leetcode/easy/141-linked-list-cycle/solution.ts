// src/leetcode/easy/141-linked-list-cycle/solution.ts

// 定义链表节点的数据结构
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

/**
 * @description 辅助函数：根据数组和环的起始位置创建一个带环的链表
 * @param {number[]} arr - 节点值的数组
 * @param {number} pos - 环的起始位置索引，-1 表示无环
 * @returns {ListNode | null} - 创建的链表的头节点
 */
export function createLinkedListWithCycle(arr: number[], pos: number): ListNode | null {
  if (arr.length === 0) {
    return null
  }

  const head = new ListNode(arr[0])
  let currentNode = head
  const nodes: ListNode[] = [head] // 存储所有节点以便后续连接环

  for (let i = 1; i < arr.length; i++) {
    currentNode.next = new ListNode(arr[i])
    currentNode = currentNode.next
    nodes.push(currentNode)
  }

  // 如果 pos 有效，创建环
  if (pos !== -1 && pos < arr.length) {
    currentNode.next = nodes[pos]
  }

  return head
}

/**
 * @description 使用快慢指针法判断链表中是否有环
 * @param {ListNode | null} head 链表的头节点
 * @returns {boolean} 如果有环则返回 true，否则返回 false
 */
export function hasCycle(head: ListNode | null): boolean {
  if (!head || !head.next) {
    // 链表为空或只有一个节点，不可能有环
    return false
  }

  let slow: ListNode | null = head
  let fast: ListNode | null = head

  while (fast && fast.next) {
    slow = slow!.next // slow 走一步
    fast = fast.next.next // fast 走两步

    if (slow === fast) {
      // 快慢指针相遇，说明有环
      return true
    }
  }

  // fast 走到了链表末尾，说明无环
  return false
}
