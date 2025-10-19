// src/pages/LeetCodePage/index.tsx
import React from 'react'
import { Typography, Divider } from 'antd'
// import { TwoSumComponent } from '../../leetcode/easy/001-two-sum' // 引入我们之前创建的组件

const { Title } = Typography

// 确保你已经创建了 TwoSumComponent
const LeetCodePage: React.FC = () => {
  return (
    <div>
      <Title level={2}>LeetCode 算法题解</Title>
      <Divider />

      {/* 每完成一道题，就在这里引入并展示 */}
      {/* <TwoSumComponent /> */}

      {/* <Divider /> */}
      {/* <AnotherLeetCodeComponent /> */}
    </div>
  )
}

export default LeetCodePage
