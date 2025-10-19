// src/pages/InterviewPage/index.tsx
import React from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const InterviewPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>前端面试题实践</Title>
      <Paragraph>
        这里将用来复现和练习经典的前端面试题，例如手写 Promise、实现防抖节流等。
      </Paragraph>
      {/* 之后你可以在这里添加具体的面试题组件 */}
    </div>
  )
}

export default InterviewPage
