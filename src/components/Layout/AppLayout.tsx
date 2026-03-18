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
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Title level={4} style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
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
      <Content style={{ padding: '24px 48px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        React Dojo ©{new Date().getFullYear()} Created by You
      </Footer>
    </Layout>
  )
}

export default AppLayout
