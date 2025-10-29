// src/leetcode/medium/056-merge-intervals/solution.ts

/**
 * @description 合并所有重叠的区间
 * @param {number[][]} intervals 区间数组
 * @returns {number[][]} 合并后的区间数组
 */
export function merge(intervals: number[][]): number[][] {
  // 如果区间数量小于等于1，无需合并
  if (intervals.length <= 1) {
    return intervals
  }

  // 1. 按照区间的起始位置进行升序排序
  intervals.sort((a, b) => a[0] - b[0])

  // 2. 初始化结果数组，并放入第一个区间
  const merged: number[][] = [intervals[0]]

  // 3. 从第二个区间开始遍历
  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i]
    // 获取结果数组中的最后一个区间
    const lastMergedInterval = merged[merged.length - 1]

    // 4. 判断是否重叠
    if (currentInterval[0] <= lastMergedInterval[1]) {
      // 如果重叠，更新最后一个区间的结束位置
      lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1])
    } else {
      // 如果不重叠，直接将当前区间加入结果数组
      merged.push(currentInterval)
    }
  }

  return merged
}
