// src/leetcode/easy/001-two-sum/solution.ts

/**
 * @description 使用哈希表求解两数之和
 * @param {number[]} nums 整数数组
 * @param {number} target 目标值
 * @returns {number[]} 两个数的下标数组
 */
export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i]
    const complement = target - currentNum

    // 检查 map 中是否存在需要的“另一半”
    if (map.has(complement)) {
      // 如果存在，返回“另一半”的索引和当前数字的索引
      return [map.get(complement)!, i]
    }

    // 如果不存在，将当前数字和它的索引存入 map
    map.set(currentNum, i)
  }

  // 按照题目约束，一定会找到答案，这里为了类型安全返回空数组
  return []
}
