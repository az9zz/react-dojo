// src/leetcode/medium/300-longest-increasing-subsequence/solution.ts

/**
 * @description 解法一：动态规划 O(n^2)
 * @param {number[]} nums 整数数组
 * @returns {number} 最长递增子序列的长度
 */
export function lengthOfLIS_DP(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }

  // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
  const dp = new Array(nums.length).fill(1)

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  // 结果是 dp 数组中的最大值
  return Math.max(...dp)
}

/**
 * @description 解法二：贪心 + 二分查找 O(n log n)
 * @param {number[]} nums 整数数组
 * @returns {number} 最长递增子序列的长度
 */
export function lengthOfLIS_Greedy(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }

  const tails: number[] = []

  for (const num of nums) {
    // 如果 tails 为空，或 num 大于 tails 最后一个元素
    if (tails.length === 0 || num > tails[tails.length - 1]) {
      tails.push(num)
    } else {
      // 使用二分查找在 tails 中找到第一个大于等于 num 的位置
      let left = 0
      let right = tails.length - 1
      let pos = 0 // 记录要替换的位置

      while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (tails[mid] >= num) {
          pos = mid
          right = mid - 1 // 继续在左半部分找更小的
        } else {
          left = mid + 1
        }
      }
      // 替换该位置的元素
      tails[pos] = num
    }
  }

  return tails.length
}
