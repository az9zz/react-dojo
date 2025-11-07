// src/leetcode/medium/015-3sum/solution.ts

export function threeSum(nums: number[]): number[][] {
  const results: number[][] = []
  if (nums.length < 3) {
    return results
  }

  // 1. 排序
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 2; i++) {
    // 优化：如果当前数大于0，后续不可能有和为0的组合
    if (nums[i] > 0) {
      break
    }

    // 去重：跳过重复的固定数
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]

      if (sum === 0) {
        results.push([nums[i], nums[left], nums[right]])

        // 去重：跳过重复的 left 和 right
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--
        }

        // 移动指针，寻找新的组合
        left++
        right--
      } else if (sum < 0) {
        left++
      } else {
        // sum > 0
        right--
      }
    }
  }

  return results
}
