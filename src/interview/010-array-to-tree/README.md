# 008. Array to Tree (数组转树形结构)

## 题目描述

给定一个包含对象的扁平数组，每个对象都有 `id` 和 `parentId` 属性，请编写一个函数将其转换为树形结构。根节点的 `parentId` 通常为 `null` 或 `0`。

## 示例

**输入:**

```javascript
const nodes = [
  { id: 1, parentId: null, name: 'Root' },
  { id: 2, parentId: 1, name: 'Child A' },
  { id: 3, parentId: 1, name: 'Child B' },
  { id: 4, parentId: 2, name: 'Grandchild A.1' },
  { id: 5, parentId: 3, name: 'Grandchild B.1' },
  { id: 6, parentId: 3, name: 'Grandchild B.2' },
]
```

**输出:**

```json
[
  {
    "id": 1,
    "parentId": null,
    "name": "Root",
    "children": [
      {
        "id": 2,
        "parentId": 1,
        "name": "Child A",
        "children": [
          {
            "id": 4,
            "parentId": 2,
            "name": "Grandchild A.1",
            "children": []
          }
        ]
      },
      {
        "id": 3,
        "parentId": 1,
        "name": "Child B",
        "children": [
          {
            "id": 5,
            "parentId": 3,
            "name": "Grandchild B.1",
            "children": []
          },
          {
            "id": 6,
            "parentId": 3,
            "name": "Grandchild B.2",
            "children": []
          }
        ]
      }
    ]
  }
]
```

---

## 解法一：使用 Map (空间换时间 - O(n))

这是最高效、最推荐的解法，只需要遍历两次数组。

### 核心思想

1.  **建立 `id` 到节点的映射**: 第一次遍历数组，创建一个 `Map`，`key` 是节点的 `id`，`value` 是节点对象本身。同时，为每个节点对象添加一个 `children` 数组属性。
2.  **构建树形关系**: 第二次遍历数组，对于每个节点：
    - 通过 `node.parentId` 在 `Map` 中查找其父节点。
    - 如果找到了父节点，就将当前节点 `push` 到父节点的 `children` 数组中。
    - 如果 `parentId` 为 `null` (或其他根节点标识)，说明它是一个根节点，将它加入到最终的结果数组中。

### 优点

- **高效**: 时间复杂度为 O(n)，因为两次遍历都是线性的，Map 的查找和插入是 O(1)。
- **优雅**: 代码逻辑清晰，利用了对象引用的特性。当我们将一个节点加入父节点的 `children` 数组时，我们操作的是 Map 中同一个对象的引用，关系自然建立。

---

## 解法二：递归 (更符合直觉)

这种方法更符合树形结构的递归定义，但效率较低。

### 核心思想

1.  **找到根节点**: 首先，遍历一次数组，找到所有根节点（`parentId` 为 `null`）。
2.  **递归查找子节点**: 为每个根节点递归地查找其子节点。
    - 定义一个递归函数 `findChildren(parentNode)`。
    - 在该函数内部，遍历整个扁平数组。
    - 如果某个节点的 `parentId` 等于 `parentNode.id`，说明它是 `parentNode` 的一个子节点。
    - 将这个子节点 `push` 到 `parentNode.children` 数组中。
    - **对这个子节点，继续递归调用 `findChildren(childNode)`**，为其查找孙子节点。

### 缺点

- **低效**: 时间复杂度为 O(n²)。因为对于每个节点，我们都可能需要遍历整个数组来寻找它的子节点。在数据量大时性能会很差。
- **重复遍历**: 整个数组被反复遍历多次。

**结论**: 在实际工程中，**解法一 (Map 法)** 是毋庸置疑的最佳选择。解法二可以作为对递归思想理解的展示。
