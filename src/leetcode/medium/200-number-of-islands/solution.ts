// src/leetcode/medium/200-number-of-islands/solution.ts

type Grid = string[][]

/**
 * 深度优先搜索 (DFS) 函数，用于淹没岛屿
 * @param grid 网格
 * @param r 当前行
 * @param c 当前列
 */
function dfs(grid: Grid, r: number, c: number): void {
  const rows = grid.length
  const cols = grid[0].length

  // 递归终止条件：越界或遇到水
  if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') {
    return
  }

  // 将当前陆地标记为已访问（淹没）
  grid[r][c] = '0'

  // 向四个方向递归探索
  dfs(grid, r - 1, c) // 上
  dfs(grid, r + 1, c) // 下
  dfs(grid, r, c - 1) // 左
  dfs(grid, r, c + 1) // 右
}

export function numIslands(grid: Grid): number {
  if (!grid || grid.length === 0) {
    return 0
  }

  const rows = grid.length
  const cols = grid[0].length
  let islandCount = 0

  // 注意：为了不修改原始输入，我们应该操作一个副本
  const gridCopy = grid.map((row) => [...row])

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (gridCopy[r][c] === '1') {
        // 发现新岛屿
        islandCount++
        // 淹没整个岛屿
        dfs(gridCopy, r, c)
      }
    }
  }

  return islandCount
}
