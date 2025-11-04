// src/interview/001-array-flatten/solution.ts

// 为了类型清晰，我们定义一个可嵌套的数组类型

export type NestedArray<T> = Array<T | NestedArray<T>>

// --- 无深度版本 ---

/**
 * 解法一：ES6 flat()
 */
export function flattenByFlat<T>(arr: NestedArray<T>): T[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (arr as any).flat(Infinity)
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
  // 1. 初始化栈，包含原数组的所有一级元素
  const stack: (T | NestedArray<T>)[] = [...arr]
  const result: T[] = []

  while (stack.length > 0) {
    // 2. 从栈顶弹出一个元素
    const item = stack.pop()

    // 3. 判断元素类型
    if (Array.isArray(item)) {
      // 3a. 如果是数组，将其元素正序压回栈中
      // 使用扩展运算符 ...item 就是正序的
      stack.push(...item)
    } else {
      // 3b. 如果不是数组
      if (item !== undefined) {
        // 预防空数组 pop 出 undefined
        // 使用 unshift 头插法，保证最终顺序正确
        result.unshift(item)
      }
    }
  }
  return result
}

/**
 * 解法五：toString() + split() (Hack)
 */
export function flattenByToString(arr: NestedArray<number>): number[] {
  return arr.toString().split(',').filter(Boolean).map(Number)
}

// --- 带深度版本 ---

/**
 * 解法一 (带深度)：ES6 flat()
 */
export function flattenByFlatDepth<T>(arr: NestedArray<T>, depth = 1): NestedArray<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (arr as any).flat(depth)
}

/**
 * 解法二 (带深度)：递归
 */
export function flattenByRecursionDepth<T>(arr: NestedArray<T>, depth = 1): NestedArray<T> {
  const result: NestedArray<T> = []
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flattenByRecursionDepth(item, depth - 1))
    } else {
      result.push(item)
    }
  }
  return result
}

/**
 * 解法三 (带深度)：reduce + 递归
 */
export function flattenByReduceDepth<T>(arr: NestedArray<T>, depth = 1): NestedArray<T> {
  return arr.reduce<NestedArray<T>>((acc, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      return acc.concat(flattenByReduceDepth(cur, depth - 1))
    }
    return acc.concat(cur)
  }, [])
}

/**
 * 解法四 (带深度)：迭代 + 栈
 */
export function flattenByStackDepth<T>(arr: NestedArray<T>, depth = 1): NestedArray<T> {
  // 栈中存放元组 [元素, 元素所在的深度]
  const stack: [NestedArray<T> | T, number][] = [...arr].map((item) => [item, 1])
  const result: NestedArray<T> = []
  while (stack.length > 0) {
    const [item, currentDepth] = stack.pop()!
    if (Array.isArray(item) && currentDepth < depth) {
      // 深度未满，继续拆解
      // 将子元素和更新后的深度（currentDepth + 1）正序压入栈
      const itemsToPush: [NestedArray<T> | T, number][] = item.map((subItem) => [
        subItem,
        currentDepth + 1,
      ])
      stack.push(...itemsToPush)
    } else {
      // 深度已满或是非数组元素，直接头插入结果
      result.unshift(item)
    }
  }
  return result
}
