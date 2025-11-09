// src/pages/LeetCodePage/index.tsx
import React from 'react'
import { Typography, Divider } from 'antd'

// 导入 easy 题解
import { TwoSumComponent } from '../../leetcode/easy/001-two-sum'
// 导入 medium 题解
import { LongestSubstringComponent } from '../../leetcode/medium/003-longest-substring-without-repeating-characters'
import { MergeIntervalsComponent } from '../../leetcode/medium/056-merge-intervals' // 1. 新增导入
import { ReverseListComponent } from '../../leetcode/easy/206-reverse-linked-list'
import { LinkedListCycleComponent } from '../../leetcode/easy/141-linked-list-cycle'
import { LISComponent } from '../../leetcode/medium/300-longest-increasing-subsequence'
import { SortArrayComponent } from '../../leetcode/medium/912-sort-an-array'
import { BinarySearchComponent } from '../../leetcode/easy/704-binary-search'
import { ThreeSumComponent } from '../../leetcode/medium/015-3sum'
import { NumIslandsComponent } from '../../leetcode/medium/200-number-of-islands'
import { LevelOrderTraversalComponent } from '../../leetcode/medium/102-binary-tree-level-order-traversal'
import { PalindromicSubstringsComponent } from '../../leetcode/medium/647-palindromic-substrings'
import { LRUCacheComponent } from '../../leetcode/medium/146-lru-cache'
import { MergeSortedComponent } from '../../leetcode/easy/021-merge-two-sorted-lists'
import { ValidParenthesesComponent } from '../../leetcode/easy/020-valid-parentheses'

const { Title } = Typography

const LeetCodePage: React.FC = () => {
  return (
    <div>
      <Title level={2}>LeetCode 算法题解</Title>
      <Divider orientation="left">Easy</Divider>
      <TwoSumComponent />
      <div style={{ marginTop: '24px' }} />
      <ReverseListComponent />
      <div style={{ marginTop: '24px' }} />
      <LinkedListCycleComponent />
      <div style={{ marginTop: '24px' }} />
      <BinarySearchComponent />
      <div style={{ marginTop: '24px' }} />
      <ValidParenthesesComponent />
      <div style={{ marginTop: '24px' }} />
      <MergeSortedComponent />

      <Divider orientation="left">Medium</Divider>
      <LongestSubstringComponent />
      <div style={{ marginTop: '24px' }} />
      <ThreeSumComponent />
      <div style={{ marginTop: '24px' }} />
      <MergeIntervalsComponent />
      <div style={{ marginTop: '24px' }} />
      <LISComponent />
      <div style={{ marginTop: '24px' }} />
      <SortArrayComponent />
      <div style={{ marginTop: '24px' }} />
      <NumIslandsComponent />
      <div style={{ marginTop: '24px' }} />
      <LevelOrderTraversalComponent />
      <div style={{ marginTop: '24px' }} />
      <PalindromicSubstringsComponent />
      <div style={{ marginTop: '24px' }} />
      <LRUCacheComponent />
      {/* 以后有 hard 的题了，可以这样组织 */}
      {/* <Divider orientation="left">Hard</Divider> */}
    </div>
  )
}

export default LeetCodePage
