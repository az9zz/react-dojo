// src/leetcode/medium/912-sort-an-array/solution.ts

// --- 解法一：快速排序 ---

function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * 分区操作 (Lomuto partition scheme)
 * @returns 基准元素的最终索引
 */
function partition(nums: number[], left: number, right: number): number {
  // 优化：随机化基准
  const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left
  swap(nums, randomIndex, right)

  const pivot = nums[right]
  let i = left - 1

  for (let j = left; j < right; j++) {
    if (nums[j] < pivot) {
      i++
      swap(nums, i, j)
    }
  }
  swap(nums, i + 1, right)
  return i + 1
}

function quickSortHelper(nums: number[], left: number, right: number): void {
  if (left < right) {
    const pivotIndex = partition(nums, left, right)
    quickSortHelper(nums, left, pivotIndex - 1)
    quickSortHelper(nums, pivotIndex + 1, right)
  }
}

export function quickSort(nums: number[]): number[] {
  // 快速排序是原地排序，但为了函数签名一致，我们返回它
  quickSortHelper(nums, 0, nums.length - 1)
  return nums
}

// --- 解法二：归并排序 ---

/**
 * 合并两个已排序的子数组
 */
function merge(nums: number[], left: number, mid: number, right: number): void {
  const temp: number[] = []
  let i = left
  let j = mid + 1

  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      temp.push(nums[i])
      i++
    } else {
      temp.push(nums[j])
      j++
    }
  }

  // 将剩余的元素加入
  while (i <= mid) {
    temp.push(nums[i])
    i++
  }
  while (j <= right) {
    temp.push(nums[j])
    j++
  }

  // 将合并后的数组复制回原数组
  for (let k = 0; k < temp.length; k++) {
    nums[left + k] = temp[k]
  }
}

function mergeSortHelper(nums: number[], left: number, right: number): void {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)
    mergeSortHelper(nums, left, mid)
    mergeSortHelper(nums, mid + 1, right)
    merge(nums, left, mid, right)
  }
}

export function mergeSort(nums: number[]): number[] {
  // 归并排序也是原地修改（通过辅助数组），返回修改后的数组
  mergeSortHelper(nums, 0, nums.length - 1)
  return nums
}
