// src/interview/002-function-currying/solution.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
// fully type-safe curry function is a very advanced topic in TypeScript.
// We use `any` here to focus on the logic implementation.
/**
 * @description 柯里化函数
 * @param fn - 需要被柯里化的原始函数
 * @returns 一个柯里化后的新函数
 */
export function curry(fn: (...args: any[]) => any) {
  // 返回一个新函数，它可以接收任意数量的初始参数
  // `this: any` 是一个特殊的 TypeScript 语法，它不计入参数列表，
  // 仅用来告诉 TypeScript `curried` 函数内部的 `this` 是什么类型。
  // 我们在这里使用 `any` 是为了保持最大的灵活性。
  return function curried(this: any, ...args: any[]) {
    // 检查当前收集到的参数数量是否足够
    if (args.length >= fn.length) {
      // 如果参数足够，直接执行原始函数并返回结果
      // 这里的 this 会被正确地传递给 fn
      return fn.apply(this, args)
    } else {
      // 如果参数不够，返回一个新的函数，等待接收剩余的参数
      return function (this: any, ...nextArgs: any[]) {
        // 递归调用 curried，将旧参数和新参数合并
        // 这里的 this 会被正确地传递给下一次的 curried 调用
        return curried.apply(this, [...args, ...nextArgs])
      }
    }
  }
}
