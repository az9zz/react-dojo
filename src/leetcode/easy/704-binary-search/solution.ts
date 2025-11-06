// src/leetcode/easy/704-binary-search/solution.ts

/**
 * 解法一：左闭右闭区间 [left, right]
 * @param nums 有序数组
 * @param target 目标值
 * @returns 目标值的索引，如果不存在则返回 -1
 */
export function binarySearch_closed(nums: number[], target: number): number {
  let left = 0
  let right = nums.length - 1 // 区间是 [0, nums.length-1]

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] === target) {
      return mid // 找到了
    } else if (nums[mid] < target) {
      left = mid + 1 // target 在右半部分
    } else {
      // nums[mid] > target
      right = mid - 1 // target 在左半部分
    }
  }

  return -1 // 未找到
}

/**
 * 解法二：左闭右开区间 [left, right)
 * @param nums 有序数组
 * @param target 目标值
 * @returns 目标值的索引，如果不存在则返回 -1
 */
export function binarySearch_open(nums: number[], target: number): number {
  let left = 0
  let right = nums.length // 区间是 [0, nums.length)

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      // nums[mid] > target
      right = mid // 新的右边界是 mid，不包含 mid
    }
  }

  return -1
}
