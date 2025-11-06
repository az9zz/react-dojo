# 704. Binary Search (二分查找)

## 题目描述

给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target` ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 -1。

## 示例

**示例 1：**

- **输入:** `nums = [-1,0,3,5,9,12]`, `target = 9`
- **输出:** `4`
- **解释:** 9 存在于 nums 中并且下标为 4。

**示例 2：**

- **输入:** `nums = [-1,0,3,5,9,12]`, `target = 2`
- **输出:** `-1`
- **解释:** 2 不存在于 nums 中因此返回 -1。

## 约束条件

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- `nums` 中的所有元素都是 **唯一的**。
- `nums` 是升序排列的。

---

## 核心思想

二分查找的前提是**数组必须是有序的**。

它的核心思想是不断地将搜索区间一分为二，通过比较中间值与目标值的大小，来排除掉一半不可能包含目标值的区间，从而快速缩小搜索范围。

### 实现细节与边界条件

二分查找的实现主要有两种写法，它们的区别在于**循环的终止条件**和**区间的定义**。

---

### 写法一：左闭右闭区间 `[left, right]` (最常用)

在这种写法中，我们的搜索区间始终包含 `left` 和 `right` 两个端点。

#### 算法步骤

1.  初始化 `left = 0`, `right = nums.length - 1`。
2.  循环条件是 `while (left <= right)`。
    - 使用 `<=` 是因为当 `left === right` 时，区间 `[left, left]` 仍然是有效的，里面有一个元素需要被检查。
3.  计算中间索引 `mid = Math.floor(left + (right - left) / 2)`。
    - 使用 `left + (right - left) / 2` 而不是 `(left + right) / 2` 是为了防止 `left` 和 `right` 都很大时相加导致整数溢出（虽然在 JavaScript 中不常见，但这是个好习惯）。
4.  比较 `nums[mid]` 和 `target`：
    - 如果 `nums[mid] === target`，找到了，返回 `mid`。
    - 如果 `nums[mid] < target`，说明 `target` 在 `mid` 的右侧，更新 `left = mid + 1`，排除左半部分和 `mid` 本身。
    - 如果 `nums[mid] > target`，说明 `target` 在 `mid` 的左侧，更新 `right = mid - 1`，排除右半部分和 `mid` 本身。
5.  如果循环结束仍未找到，说明 `target` 不存在，返回 `-1`。

---

### 写法二：左闭右开区间 `[left, right)`

在这种写法中，我们的搜索区间包含 `left` 但**不包含** `right` 端点。

#### 算法步骤

1.  初始化 `left = 0`, `right = nums.length`。
    - `right` 初始化为数组长度，因为 `right` 本身不在搜索范围内。
2.  循环条件是 `while (left < right)`。
    - 使用 `<` 是因为当 `left === right` 时，区间 `[left, left)` 是一个空集，没有意义，循环应该终止。
3.  计算中间索引 `mid = Math.floor(left + (right - left) / 2)`。
4.  比较 `nums[mid]` 和 `target`：
    - 如果 `nums[mid] === target`，找到了，返回 `mid`。
    - 如果 `nums[mid] < target`，说明 `target` 在 `mid` 的右侧，更新 `left = mid + 1`。
    - 如果 `nums[mid] > target`，说明 `target` 在 `mid` 的左侧，但因为是左闭右开区间，新的右边界应该是 `mid` 本身，所以更新 `right = mid`。
5.  如果循环结束仍未找到，返回 `-1`。

**总结**: 两种写法的核心区别在于对区间的定义，这直接影响了 `right` 的初始值、循环条件和边界更新的逻辑。写法一（左闭右闭）通常更符合直觉，也更容易写对。
