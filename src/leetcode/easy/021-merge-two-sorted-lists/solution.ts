// src/leetcode/easy/021-merge-two-sorted-lists/solution.ts

// --- 链表部分 ---
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

/**
 * 辅助函数：数组转链表
 */
export function arrayToList(arr: number[]): ListNode | null {
  if (!arr || arr.length === 0) return null
  const dummyHead = new ListNode()
  let current = dummyHead
  for (const val of arr) {
    current.next = new ListNode(val)
    current = current.next
  }
  return dummyHead.next
}

/**
 * 辅助函数：链表转数组
 */
export function listToArray(head: ListNode | null): number[] {
  const arr: number[] = []
  let current = head
  while (current) {
    arr.push(current.val)
    current = current.next
  }
  return arr
}

/**
 * 21. 合并两个有序链表
 */
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode()
  let current = dummyHead
  let p1 = list1
  let p2 = list2

  while (p1 && p2) {
    if (p1.val < p2.val) {
      current.next = p1
      p1 = p1.next
    } else {
      current.next = p2
      p2 = p2.next
    }
    current = current.next
  }

  // 链接剩余部分
  current.next = p1 || p2

  return dummyHead.next
}

// --- 数组部分 ---

/**
 * 88. 合并两个有序数组 (原地修改)
 */
export function mergeSortedArray(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1
  let p2 = n - 1
  let p = m + n - 1

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1]
      p1--
    } else {
      nums1[p] = nums2[p2]
      p2--
    }
    p--
  }

  // 如果 nums2 还有剩余元素
  while (p2 >= 0) {
    nums1[p] = nums2[p2]
    p2--
    p--
  }
}
