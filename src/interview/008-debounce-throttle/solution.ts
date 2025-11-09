// src/interview/006-debounce-throttle/solution.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any

/**
 * 防抖函数 (Debounce)
 * @param fn 需要防抖的函数
 * @param delay 延迟时间 (ms)
 * @returns 返回一个新的防抖函数
 */
export function debounce(fn: Func, delay: number): Func {
  let timer: number | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    // 如果已有定时器，清除它
    if (timer) {
      clearTimeout(timer)
    }

    // 设置新的定时器
    timer = window.setTimeout(() => {
      fn.apply(this, args)
      timer = null // 执行后重置 timer
    }, delay)
  }
}

/**
 * 节流函数 (Throttle) - 定时器版 (非立即执行)
 * @param fn 需要节流的函数
 * @param delay 间隔时间 (ms)
 * @returns 返回一个新的节流函数
 */
export function throttle(fn: Func, delay: number): Func {
  let timer: number | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    // 如果定时器已存在，说明在冷却中，直接返回
    if (timer) {
      return
    }

    // 设置定时器
    timer = window.setTimeout(() => {
      fn.apply(this, args)
      timer = null // 执行后清除定时器，开放下一次执行
    }, delay)
  }
}

/**
 * 节流函数 (Throttle) - 时间戳版 (立即执行)
 * @param fn 需要节流的函数
 * @param delay 间隔时间 (ms)
 * @returns 返回一个新的节流函数
 */
export function throttleTimestamp(fn: Func, delay: number): Func {
  let lastTime = 0

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now // 更新上次执行时间
      fn.apply(this, args)
    }
  }
}
