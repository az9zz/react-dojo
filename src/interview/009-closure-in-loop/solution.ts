// src/interview/007-closure-in-loop/solution.ts
type LogFunction = (message: string | number) => void
/**
 * 错误的示例
 */
export function runProblematic(log: LogFunction): void {
  // eslint-disable-next-line no-var
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      log(`var: ${i}`)
    }, i * 100) // 缩小延时以快速演示
  }
}
/**
 * 解法一：使用 let
 */
export function runWithLet(log: LogFunction): void {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      log(`let: ${i}`)
    }, i * 100)
  }
}
/**
 * 解法二：使用 IIFE
 */
export function runWithIIFE(log: LogFunction): void {
  for (let i = 0; i < 5; i++) {
    ;(function (j) {
      setTimeout(() => {
        log(`IIFE: ${j}`)
      }, j * 100)
    })(i)
  }
}
/**
 * 解法三：使用 setTimeout 的第三个参数
 */
export function runWithSetTimeoutArg(log: LogFunction): void {
  for (let i = 0; i < 5; i++) {
    setTimeout(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (j: any) => {
        log(`setTimeout arg: ${j}`)
      },
      i * 100,
      i,
    )
  }
}
