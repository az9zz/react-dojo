// src/interview/008-array-to-tree/solution.ts
export interface TreeNode {
  id: number
  parentId: number | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // 允许有其他属性
  children?: TreeNode[]
}
/**
 * 解法一：使用 Map (O(n))
 */
export function arrayToTreeByMap(nodes: TreeNode[]): TreeNode[] {
  if (!nodes || nodes.length === 0) {
    return []
  }

  const tree: TreeNode[] = []
  const map = new Map<number, TreeNode>()
  // 第一次遍历：初始化 map 和 children 属性
  nodes.forEach((node) => {
    map.set(node.id, { ...node, children: [] })
  })

  // 第二次遍历：构建树形关系
  nodes.forEach((node) => {
    const mappedNode = map.get(node.id)!
    if (node.parentId !== null && map.has(node.parentId)) {
      const parent = map.get(node.parentId)!
      // 因为是对象引用，直接修改 map 中的对象即可
      parent.children?.push(mappedNode)
    } else {
      // 是根节点
      tree.push(mappedNode)
    }
  })
  return tree
}
/**
 * 解法二：递归 (O(n^2))
 */
export function arrayToTreeByRecursion(nodes: TreeNode[]): TreeNode[] {
  if (!nodes || nodes.length === 0) {
    return []
  }
  const findChildren = (parentNode: TreeNode): void => {
    parentNode.children = []
    nodes.forEach((node) => {
      if (node.parentId === parentNode.id) {
        // 找到了一个子节点
        parentNode.children?.push(node)
        // 继续为这个子节点找它的子节点
        findChildren(node)
      }
    })
    // 如果没有子节点，可以删除空的 children 数组，保持清洁
    if (parentNode.children.length === 0) {
      delete parentNode.children
    }
  }

  // 找到所有的根节点
  const roots = nodes.filter((node) => node.parentId === null)

  // 为每个根节点递归地构建子树
  roots.forEach((root) => findChildren(root))

  return roots
}
