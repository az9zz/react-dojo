// src/pages/InterviewPage/index.tsx
import React from 'react'
import { Typography, Divider } from 'antd'
import { ArrayFlattenComponent } from '../../interview/001-array-flatten' // 1. 导入新组件
import { FunctionCurryingComponent } from '../../interview/002-function-curryin'
import { DeepCloneComponent } from '../../interview/003-deep-clone'

const { Title } = Typography

const InterviewPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>前端面试题实践</Title>
      <Divider orientation="left">JavaScript 基础</Divider>
      <ArrayFlattenComponent /> {/* 2. 添加新组件 */}
      <div style={{ marginTop: '24px' }} />
      <FunctionCurryingComponent />
      <div style={{ marginTop: '24px' }} />
      <DeepCloneComponent />
    </div>
  )
}

export default InterviewPage
