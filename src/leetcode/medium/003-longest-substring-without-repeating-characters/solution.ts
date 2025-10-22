// src/leetcode/medium/003-longest-substring-without-repeating-characters/solution.ts

/**
 * @description 使用滑动窗口求解无重复字符的最长子串
 * @param {string} s 输入字符串
 * @returns {number} 最长子串的长度
 */
export function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) {
    return 0
  }

  let maxLength = 0
  let left = 0 // 窗口左边界
  const charSet = new Set<string>() // 存储当前窗口内的字符

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right]

    // 如果当前字符已存在于窗口中，则收缩窗口左侧
    while (charSet.has(currentChar)) {
      charSet.delete(s[left])
      left++
    }

    // 将当前字符加入窗口
    charSet.add(currentChar)

    // 更新最大长度
    maxLength = Math.max(maxLength, right - left + 1)
  }

  return maxLength
}
