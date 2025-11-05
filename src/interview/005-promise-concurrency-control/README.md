# 004. Promise Concurrency Control (Promise 并发控制)

## 题目描述

实现一个函数 `promisePool(poolLimit, tasks)`，该函数接收两个参数：

1.  `poolLimit` (number): 并发池的限制数量，表示最多可以同时执行的任务数。
2.  `tasks` (Array of functions): 一个任务数组，数组中的每个元素都是一个返回 Promise 的函数 (`() => Promise<any>`)。

该函数需要返回一个新的 Promise，当所有的任务都执行完毕后，这个 Promise 应该 resolve，并返回一个包含了所有任务结果的数组。任务结果的顺序应与 `tasks` 数组中的任务顺序保持一致。

## 设计思路

这个问题的核心在于如何维护一个“池子”，确保池中正在运行的任务数量始终不超过 `poolLimit`。

我们可以使用 `async/await` 结合 Promise 来构建一个优雅的解决方案。

### 核心逻辑

1.  **初始化**:
    - 创建一个 `results` 数组，用于按顺序存储所有任务的结果。
    - 创建一个 `executing` 数组，用于跟踪当前正在执行的 Promise。
    - 创建一个索引 `i`，用于从 `tasks` 数组中取任务。

2.  **任务调度器 `enqueue()`**:
    - 这是整个控制器的核心函数。它的职责是不断地从 `tasks` 数组中取出新任务并启动它，直到所有任务都被启动。
    - **边界条件**: 如果 `tasks` 数组中的所有任务都已经被安排了 (`i >= tasks.length`)，则调度器停止。
    - **启动任务**:
      - 取出当前任务 `task = tasks[i]`，并记录其在原数组中的索引 `taskIndex = i`。
      - 立即执行该任务函数 `promise = task()`。
      - 将这个 `promise` 存入 `executing` 数组中。
    - **处理结果与任务接续**:
      - 当 `promise` 完成后（无论是 resolved 还是 rejected），我们需要将结果存入 `results` 数组的正确位置 (`results[taskIndex] = result`)。
      - **关键点**: 当一个任务完成后，它占用的“并发名额”就被释放了。我们需要从 `executing` 数组中移除这个已完成的 Promise，并**立即调用 `enqueue()` 来安排下一个任务**，形成一个“接力”的效果。

3.  **启动与完成**:
    - 初始时，我们可以根据 `poolLimit` 的大小，循环调用 `enqueue()` 来填满初始的并发池。
    - 如何判断所有任务都已完成？我们可以使用 `Promise.all(executing)`。但这里有个问题：`executing` 数组是动态变化的。一个更好的方法是，当最后一个任务完成并且 `executing` 数组为空时，所有任务就都完成了。
    - 一个更简单的方案是，返回一个包裹了整个过程的 Promise。我们可以创建 `(tasks.length)` 个 Promise，当它们都 resolve 时，主 Promise 才 resolve。

### 改进思路（更简洁）

我们可以创建一个 worker 池，每个 worker 完成一个任务后，再去取下一个任务。

1. **初始化**:
   - `results` 数组，`index` (下一个要执行的任务索引)。
2. **定义 `worker` 函数**:
   - 这是一个 `async` 函数，它在一个循环中运行。
   - `while (index < tasks.length)`: 只要还有任务，就继续工作。
   - 在循环中，原子性地获取并增加 `index`，以确保任务不被重复执行。
   - 执行任务 `tasks[currentIndex]()`。
   - 将结果存入 `results[currentIndex]`。
3. **启动 `poolLimit` 个 `worker`**:
   - 创建 `poolLimit` 个 `worker()` 调用，并将这些 Promise 放入一个数组 `workers`。
4. **等待所有 `worker` 完成**:
   - 使用 `Promise.all(workers)` 来等待所有 worker 都退出循环（即所有任务都已处理完毕）。
   - 当 `Promise.all` resolve 时，返回 `results` 数组。

这个 `worker` 模式更清晰地模拟了一个“工人”池，每个工人完成手头的活就去领新活，直到没活可干。

## 复杂度分析

- **时间复杂度**: 取决于最慢的任务。假设所有任务耗时相似，且远大于调度开销，则约为 (总任务数 / 并发数) \* 单个任务平均耗时。
- **空间复杂度**: O(n)，需要存储 `tasks` 和 `results`。
