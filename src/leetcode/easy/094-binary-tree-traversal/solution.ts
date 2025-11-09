// src/leetcode/easy/094-binary-tree-traversal/solution.ts

// 复用之前定义的 TreeNode 和 arrayToTree
import { TreeNode, arrayToTree } from '../../medium/102-binary-tree-level-order-traversal/solution'
export { TreeNode, arrayToTree } // 重新导出，方便 index.tsx 导入

// --- 前序遍历 ---
export function preorderTraversalRecursive(root: TreeNode | null): number[] {
  const result: number[] = []
  function traverse(node: TreeNode | null) {
    if (!node) return
    result.push(node.val) // 根
    traverse(node.left) // 左
    traverse(node.right) // 右
  }
  traverse(root)
  return result
}

export function preorderTraversalIterative(root: TreeNode | null): number[] {
  if (!root) return []
  const result: number[] = []
  const stack: TreeNode[] = [root]
  while (stack.length > 0) {
    const node = stack.pop()!
    result.push(node.val)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return result
}

// --- 中序遍历 ---
export function inorderTraversalRecursive(root: TreeNode | null): number[] {
  const result: number[] = []
  function traverse(node: TreeNode | null) {
    if (!node) return
    traverse(node.left) // 左
    result.push(node.val) // 根
    traverse(node.right) // 右
  }
  traverse(root)
  return result
}

export function inorderTraversalIterative(root: TreeNode | null): number[] {
  const result: number[] = []
  const stack: TreeNode[] = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    const node = stack.pop()!
    result.push(node.val)
    current = node.right
  }
  return result
}

// --- 后序遍历 ---
export function postorderTraversalRecursive(root: TreeNode | null): number[] {
  const result: number[] = []
  function traverse(node: TreeNode | null) {
    if (!node) return
    traverse(node.left) // 左
    traverse(node.right) // 右
    result.push(node.val) // 根
  }
  traverse(root)
  return result
}

export function postorderTraversalIterative(root: TreeNode | null): number[] {
  if (!root) return []
  const result: number[] = []
  const stack: TreeNode[] = [root]
  while (stack.length > 0) {
    const node = stack.pop()!
    result.push(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }
  return result.reverse()
}
