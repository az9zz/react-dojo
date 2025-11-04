// src/interview/001-array-flatten/solution.ts

// 为了类型清晰，我们定义一个可嵌套的数组类型

export type NestedArray<T> = Array<T | NestedArray<T>>

/**
 * 解法一：ES6 flat()
 */
export function flattenByFlat<T>(arr: NestedArray<T>): T[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (arr as any).flat(Infinity) as T[]
}

/**
 * 解法二：递归
 */
export function flattenByRecursion<T>(arr: NestedArray<T>): T[] {
  const result: T[] = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenByRecursion(item))
    } else {
      result.push(item)
    }
  }
  return result
}

/**
 * 解法三：reduce + 递归
 */
export function flattenByReduce<T>(arr: NestedArray<T>): T[] {
  return arr.reduce<T[]>((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flattenByReduce(cur) : cur)
  }, [])
}

/**
 * 解法四：迭代 + 栈
 */
export function flattenByStack<T>(arr: NestedArray<T>): T[] {
  const stack = [...arr] // 浅拷贝，避免修改原数组
  const result: T[] = []

  while (stack.length > 0) {
    const item = stack.pop() // 从栈顶取出

    if (Array.isArray(item)) {
      // 如果是数组，将其元素倒序压入栈
      stack.push(...item)
    } else {
      // 如果不是数组，存入结果
      if (item !== undefined) {
        // pop()可能返回undefined
        result.unshift(item) // 头插法保持顺序
      }
    }
  }
  return result
}

/**
 * 解法五：toString() + split() (Hack)
 * 注意：此方法仅适用于纯数字数组
 */
export function flattenByToString(arr: NestedArray<number>): number[] {
  return arr.toString().split(',').map(Number)
}
