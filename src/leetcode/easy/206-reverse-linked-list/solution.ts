// src/leetcode/easy/206-reverse-linked-list/solution.ts

// --- 数据结构定义 ---
// 在实际大项目中，这个类可能会被放在一个通用的 'types' 或 'ds' (Data Structures) 目录下
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

/**
 * @description 反转一个单链表（迭代法）
 * @param {ListNode | null} head 链表的头节点
 * @returns {ListNode | null} 反转后链表的头节点
 */
export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null
  let curr: ListNode | null = head

  while (curr !== null) {
    const nextTemp: ListNode | null = curr.next // 1. 保存下一个节点
    curr.next = prev // 2. 反转指针

    // 3 & 4. 移动 prev 和 curr 指针
    prev = curr
    curr = nextTemp
  }

  // 当循环结束时, prev 就是新的头节点
  return prev
}
