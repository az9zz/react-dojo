import type { LeetCodeEntry } from '@/types/registry'
import { TwoSumComponent } from './easy/001-two-sum'
import { ValidParenthesesComponent } from './easy/020-valid-parentheses'
import { MergeSortedComponent } from './easy/021-merge-two-sorted-lists'
import { TreeTraversalComponent } from './easy/094-binary-tree-traversal'
import { LinkedListCycleComponent } from './easy/141-linked-list-cycle'
import { ReverseListComponent } from './easy/206-reverse-linked-list'
import { BinarySearchComponent } from './easy/704-binary-search'
import { LongestSubstringComponent } from './medium/003-longest-substring-without-repeating-characters'
import { ThreeSumComponent } from './medium/015-3sum'
import { MergeIntervalsComponent } from './medium/056-merge-intervals'
import { LevelOrderTraversalComponent } from './medium/102-binary-tree-level-order-traversal'
import { LRUCacheComponent } from './medium/146-lru-cache'
import { NumIslandsComponent } from './medium/200-number-of-islands'
import { LISComponent } from './medium/300-longest-increasing-subsequence'
import { PalindromicSubstringsComponent } from './medium/647-palindromic-substrings'
import { SortArrayComponent } from './medium/912-sort-an-array'

export const leetcodeRegistry: LeetCodeEntry[] = [
  { id: '001', title: '两数之和', difficulty: 'easy', component: TwoSumComponent },
  { id: '020', title: '有效的括号', difficulty: 'easy', component: ValidParenthesesComponent },
  { id: '021', title: '合并两个有序链表', difficulty: 'easy', component: MergeSortedComponent },
  { id: '094', title: '二叉树的中序遍历', difficulty: 'easy', component: TreeTraversalComponent },
  { id: '141', title: '环形链表', difficulty: 'easy', component: LinkedListCycleComponent },
  { id: '206', title: '反转链表', difficulty: 'easy', component: ReverseListComponent },
  { id: '704', title: '二分查找', difficulty: 'easy', component: BinarySearchComponent },
  {
    id: '003',
    title: '无重复字符的最长子串',
    difficulty: 'medium',
    component: LongestSubstringComponent,
  },
  { id: '015', title: '三数之和', difficulty: 'medium', component: ThreeSumComponent },
  { id: '056', title: '合并区间', difficulty: 'medium', component: MergeIntervalsComponent },
  {
    id: '102',
    title: '二叉树的层序遍历',
    difficulty: 'medium',
    component: LevelOrderTraversalComponent,
  },
  { id: '146', title: 'LRU 缓存', difficulty: 'medium', component: LRUCacheComponent },
  { id: '200', title: '岛屿数量', difficulty: 'medium', component: NumIslandsComponent },
  { id: '300', title: '最长递增子序列', difficulty: 'medium', component: LISComponent },
  { id: '647', title: '回文子串', difficulty: 'medium', component: PalindromicSubstringsComponent },
  { id: '912', title: '排序数组', difficulty: 'medium', component: SortArrayComponent },
]
