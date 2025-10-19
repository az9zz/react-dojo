// src/components/layout/AppLayout.tsx
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

const items = [
  { key: '/', label: <Link to="/">首页</Link> },
  { key: '/concepts', label: <Link to="/concepts">知识点练习</Link> },
  { key: '/leetcode', label: <Link to="/leetcode">LeetCode</Link> },
  { key: '/interview', label: <Link to="/interview">面试题</Link> },
]

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} items={items} />
      </Header>
      <Content style={{ padding: '24px 48px' }}>
        <Outlet /> {/* 子路由的页面会在这里渲染 */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        React Dojo ©{new Date().getFullYear()} Created by You
      </Footer>
    </Layout>
  )
}

export default AppLayout
