// src/interview/004-promise-concurrency-control/solution.ts

// 定义任务函数的类型
type AsyncTask<T> = () => Promise<T>

/**
 * Promise 并发控制器
 * @param poolLimit 并发池限制
 * @param tasks 任务数组，每个任务是一个返回 Promise 的函数
 * @returns 当所有任务完成后，resolve 一个包含所有结果的数组
 */
export function promisePool<T>(poolLimit: number, tasks: AsyncTask<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = []
    let executingCount = 0 // 当前正在执行的任务数
    let completedCount = 0 // 已完成的任务数
    let taskIndex = 0 // 下一个要执行的任务索引

    function enqueue() {
      // 循环，直到没有更多任务或并发池已满
      while (executingCount < poolLimit && taskIndex < tasks.length) {
        executingCount++
        const currentIndex = taskIndex
        const task = tasks[taskIndex++]

        task()
          .then((result) => {
            results[currentIndex] = result
          })
          .catch((error) => {
            // 如果一个任务失败，可以根据需求选择：
            // 1. 立即 reject 整个 promisePool (当前实现)
            // 2. 将 error 存入 results，继续执行其他任务
            reject(error)
          })
          .finally(() => {
            executingCount--
            completedCount++

            // 如果所有任务都已完成
            if (completedCount === tasks.length) {
              resolve(results)
            } else {
              // 否则，尝试将下一个任务入队
              enqueue()
            }
          })
      }
    }

    if (tasks.length === 0) {
      resolve([])
      return
    }

    enqueue()
  })
}
