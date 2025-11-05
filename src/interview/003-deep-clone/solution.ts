// src/interview/002-deep-clone/solution.ts

// 为了方便，我们定义一个可接受任何值的类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string | symbol, any>

/**
 * 解法一：JSON.stringify (简陋版)
 */
export function deepCloneJSON<T>(obj: T): T {
  // 检查 null 和非 object 类型，因为 JSON.stringify(null) 是 "null"
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 解法二 & 三 & 四：递归实现 (完整版)
 * 这个函数整合了基础、进阶和完整版的思路
 */
export function deepCloneRecursive<T>(obj: T, cache = new WeakMap()): T {
  // 1. 基本类型和 null 直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 2. 处理特殊对象类型
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T
  }

  // 3. 处理循环引用
  if (cache.has(obj as object)) {
    return cache.get(obj as object) as T
  }

  // 4. 处理数组和普通对象
  // 使用 obj.constructor 来保留原型链上的属性和方法，比 [] 或 {} 更健壮
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const copy = new (obj as any).constructor()

  // 5. 先将新创建的拷贝对象放入缓存，再进行递归
  cache.set(obj as object, copy)

  // 6. 遍历属性并递归拷贝
  for (const key in obj) {
    // hasOwnProperty 确保我们只拷贝对象自身的属性，而不是原型链上的
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCloneRecursive(obj[key], cache)
    }
  }

  return copy
}

/**
 * 这是一个更现代、更全面的实现，考虑了 Map, Set 等
 */
export function deepCloneFull<T>(obj: T, cache = new WeakMap()): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) return new Date(obj) as T
  if (obj instanceof RegExp) return new RegExp(obj) as T

  if (cache.has(obj as object)) {
    return cache.get(obj as object) as T
  }

  if (obj instanceof Map) {
    const copy = new Map()
    cache.set(obj, copy)
    obj.forEach((value, key) => {
      copy.set(deepCloneFull(key, cache), deepCloneFull(value, cache))
    })
    return copy as T
  }

  if (obj instanceof Set) {
    const copy = new Set()
    cache.set(obj, copy)
    obj.forEach((value) => {
      copy.add(deepCloneFull(value, cache))
    })
    return copy as T
  }

  // 处理数组和普通对象
  const copy = Array.isArray(obj) ? [] : {}
  cache.set(obj as object, copy)

  // 使用 Reflect.ownKeys 可以拷贝 Symbol 类型的 key
  Reflect.ownKeys(obj as object).forEach((key) => {
    ;(copy as AnyObject)[key] = deepCloneFull((obj as AnyObject)[key], cache)
  })

  return copy as T
}
