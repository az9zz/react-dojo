// src/leetcode/medium/647-palindromic-substrings/solution.ts

/**
 * 解法一：动态规划
 */
export function countSubstrings_DP(s: string): number {
  const n = s.length
  if (n === 0) return 0

  let count = 0
  const dp = Array.from({ length: n }, () => new Array(n).fill(false))

  // 从下到上，从左到右遍历
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j]) {
        if (j - i <= 1) {
          // 长度为 1 أو 2 的情况
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }
      if (dp[i][j]) {
        count++
      }
    }
  }
  return count
}

/**
 * 解法二：中心扩展法
 */
export function countSubstrings_CenterExpand(s: string): number {
  const n = s.length
  if (n === 0) return 0

  let count = 0

  const expandAroundCenter = (left: number, right: number) => {
    while (left >= 0 && right < n && s[left] === s[right]) {
      count++
      left--
      right++
    }
  }

  for (let i = 0; i < n; i++) {
    // 奇数长度的回文串 (中心是一个字符)
    expandAroundCenter(i, i)
    // 偶数长度的回文串 (中心是两个字符之间)
    expandAroundCenter(i, i + 1)
  }

  return count
}
