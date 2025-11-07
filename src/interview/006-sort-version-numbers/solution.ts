// src/interview/005-sort-version-numbers/solution.ts

/**
 * 比较两个版本号字符串。
 * @param v1 版本号字符串1
 * @param v2 版本号字符串2
 * @returns 1 如果 v1 > v2; -1 如果 v1 < v2; 0 如果 v1 === v2
 */
function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number)
  const parts2 = v2.split('.').map(Number)

  const maxLength = Math.max(parts1.length, parts2.length)

  for (let i = 0; i < maxLength; i++) {
    const num1 = parts1[i] || 0 // 如果段不存在，视为 0
    const num2 = parts2[i] || 0

    if (num1 > num2) {
      return 1
    }
    if (num1 < num2) {
      return -1
    }
  }

  return 0
}

/**
 * 对版本号数组进行排序
 * @param versions 版本号字符串数组
 * @returns 排序后的新数组
 */
export function sortVersionNumbers(versions: string[]): string[] {
  // 创建一个副本进行排序，避免修改原始数组
  return [...versions].sort(compareVersions)
}
