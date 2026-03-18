// src/pages/HomePage/index.tsx
import { Card, Typography, List } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const features = [
  {
    title: 'React 核心概念练习',
    path: '/concepts',
    description: '练习 Hooks, Context, 性能优化等。',
  },
  { title: 'LeetCode 算法题解', path: '/leetcode', description: '可视化地调试和展示算法题解。' },
  { title: '前端面试题实践', path: '/interview', description: '复现经典前端面试题。' },
]

const HomePage = () => {
  return (
    <div>
      <Title level={2}>React Dojo - 我的前端演武场</Title>
      <Paragraph>欢迎来到我的 React 练习平台。这里是我学习、实践和巩固前端知识的地方。</Paragraph>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={features}
        renderItem={(item) => (
          <List.Item>
            <Link to={item.path}>
              <Card title={item.title} hoverable>
                {item.description}
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default HomePage
