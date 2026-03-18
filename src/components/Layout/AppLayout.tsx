import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Button, Space, Typography } from 'antd'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const navItems = [
  { key: '/', label: '首页' },
  { key: '/concepts', label: '知识点练习' },
  { key: '/leetcode', label: 'LeetCode' },
  { key: '/interview', label: '面试题' },
]

const AppLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Layout className="min-h-screen">
      <Header className="!bg-white flex items-center justify-between !px-12 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <Title level={4} className="!m-0 cursor-pointer" onClick={() => navigate('/')}>
          React Dojo
        </Title>
        <Space>
          {navItems.map((item) => (
            <Button
              key={item.key}
              type={location.pathname === item.key ? 'primary' : 'text'}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </Space>
      </Header>
      <Content className="py-6 px-12">
        <Outlet />
      </Content>
      <Footer className="text-center">
        React Dojo ©{new Date().getFullYear()} Created by You
      </Footer>
    </Layout>
  )
}

export default AppLayout
