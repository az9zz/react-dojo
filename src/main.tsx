import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'antd/dist/reset.css'; // 引入 Antd 的重置样式
import './styles/global.css';  // 全局样式

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
