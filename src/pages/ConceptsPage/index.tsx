// src/pages/ConceptsPage/index.tsx
import React from 'react'
import { Typography, Divider } from 'antd'
import { ClosureConceptComponent } from '../../concepts/closure'
// 之后你会在这里引入具体的知识点练习组件
// import UseStateExample from '../../concepts/hooks/UseStateExample';

const { Title } = Typography

const ConceptsPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>React 核心知识点</Title>
      <Divider orientation="left">JavaScript 核心概念</Divider>
      <ClosureConceptComponent />

      {/* 之后每学习一个知识点，就在这里添加一个练习组件 */}
      {/* <Divider orientation="left">useState</Divider> */}
      {/* <UseStateExample /> */}
    </div>
  )
}

export default ConceptsPage
