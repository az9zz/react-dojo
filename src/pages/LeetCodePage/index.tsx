// src/pages/LeetCodePage/index.tsx
import React from 'react'
import { Typography, Divider } from 'antd'

// 导入 easy 题解
import { TwoSumComponent } from '../../leetcode/easy/001-two-sum'
// 导入 medium 题解
import { LongestSubstringComponent } from '../../leetcode/medium/003-longest-substring-without-repeating-characters'
import { MergeIntervalsComponent } from '../../leetcode/medium/056-merge-intervals' // 1. 新增导入
import { ReverseListComponent } from '../../leetcode/easy/206-reverse-linked-list'

const { Title } = Typography

const LeetCodePage: React.FC = () => {
  return (
    <div>
      <Title level={2}>LeetCode 算法题解</Title>

      <Divider orientation="left">Easy</Divider>
      <TwoSumComponent />
      <div style={{ marginTop: '24px' }} />
      <ReverseListComponent />
      <Divider orientation="left">Medium</Divider>
      <LongestSubstringComponent />
      <div style={{ marginTop: '24px' }} />
      <MergeIntervalsComponent />

      {/* 以后有 hard 的题了，可以这样组织 */}
      {/* <Divider orientation="left">Hard</Divider> */}
    </div>
  )
}

export default LeetCodePage
