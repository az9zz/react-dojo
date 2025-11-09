// src/interview/009-array-reverse/solution.ts

/**
 * 解法一：使用原生 reverse (原地)
 * 我们封装一下，让它返回一个新数组以保持接口一致
 */
export function reverseWithNative<T>(arr: T[]): T[] {
  return [...arr].reverse()
}

/**
 * 解法二：创建新数组 (非原地)
 */
export function reverseWithNewArray<T>(arr: T[]): T[] {
  const result: T[] = []
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i])
  }
  return result
}

/**
 * 解法三：使用 unshift (非原地，效率低)
 */
export function reverseWithUnshift<T>(arr: T[]): T[] {
  const result: T[] = []
  for (const item of arr) {
    result.unshift(item)
  }
  return result
}

/**
 * 解法四：双指针法 (原地)
 * 我们让它原地修改并返回修改后的数组
 */
export function reverseInPlace<T>(arr: T[]): T[] {
  let left = 0
  let right = arr.length - 1

  while (left < right) {
    // ES6 解构赋值交换，更简洁
    ;[arr[left], arr[right]] = [arr[right], arr[left]]

    left++
    right--
  }
  return arr
}
