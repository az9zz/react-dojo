import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

const features = [
  {
    emoji: '🧠',
    title: 'React 核心概念练习',
    path: '/concepts',
    description: '练习 Hooks, Context, 性能优化等核心概念，深入理解 React 的工作原理。',
  },
  {
    emoji: '🖥️',
    title: 'LeetCode 算法题解',
    path: '/leetcode',
    description: '可视化地调试和展示算法题解，涵盖数组、链表、树等经典数据结构。',
  },
  {
    emoji: '🎯',
    title: '前端面试题实践',
    path: '/interview',
    description: '复现经典前端面试题，包括手写 Promise、深拷贝、防抖节流等。',
  },
]

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl py-16 px-8 text-center mb-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">React Dojo</h1>
        <p className="text-base text-gray-400 max-w-md mx-auto">
          我的前端演武场 —— 学习、实践和巩固前端知识的互动平台
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item) => (
          <Card
            key={item.path}
            hoverable
            className="transition-transform duration-200 hover:-translate-y-1"
            onClick={() => navigate(item.path)}
          >
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HomePage
