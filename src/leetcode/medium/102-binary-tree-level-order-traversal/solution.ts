// src/leetcode/medium/102-binary-tree-level-order-traversal/solution.ts

/**
 * Definition for a binary tree node.
 */
export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/**
 * 将数组转换为二叉树 (辅助函数，用于测试)
 * 例如: [3,9,20,null,null,15,7]
 */
export function arrayToTree(arr: (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null) {
    return null
  }

  const root = new TreeNode(arr[0])
  const queue: (TreeNode | null)[] = [root]
  let i = 1

  while (i < arr.length) {
    const current = queue.shift()
    if (current) {
      if (arr[i] !== null && arr[i] !== undefined) {
        current.left = new TreeNode(arr[i]!)
        queue.push(current.left)
      }
      i++
      if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
        current.right = new TreeNode(arr[i]!)
        queue.push(current.right)
      }
      i++
    }
  }
  return root
}

export function levelOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return []
  }

  const result: number[][] = []
  const queue: TreeNode[] = [root]

  while (queue.length > 0) {
    const levelSize = queue.length
    const currentLevel: number[] = []

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()! // ! 断言 node 不会是 undefined

      currentLevel.push(node.val)

      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    result.push(currentLevel)
  }

  return result
}
