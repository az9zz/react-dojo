// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '../components/Layout/AppLayout' // 我们创建一个布局组件
import HomePage from '../pages/HomePage'
import LeetCodePage from '../pages/LeetCodePage'
import ConceptsPage from '../pages/ConceptsPage'
import InterviewPage from '../pages/InterviewPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // 使用布局组件
    children: [
      {
        index: true, // 默认子路由
        element: <HomePage />,
      },
      {
        path: 'leetcode',
        element: <LeetCodePage />,
      },
      {
        path: 'concepts',
        element: <ConceptsPage />,
      },
      {
        path: 'interview',
        element: <InterviewPage />,
      },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
