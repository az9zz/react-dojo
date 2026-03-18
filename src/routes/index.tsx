import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Spin } from 'antd'
import AppLayout from '@/components/Layout/AppLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const LeetCodePage = lazy(() => import('@/pages/LeetCodePage'))
const ConceptsPage = lazy(() => import('@/pages/ConceptsPage'))
const InterviewPage = lazy(() => import('@/pages/InterviewPage'))

const LazyPage = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Spin size="large" className="!block mx-auto !my-30" />}>{children}</Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <HomePage />
          </LazyPage>
        ),
      },
      {
        path: 'leetcode',
        element: (
          <LazyPage>
            <LeetCodePage />
          </LazyPage>
        ),
      },
      {
        path: 'concepts',
        element: (
          <LazyPage>
            <ConceptsPage />
          </LazyPage>
        ),
      },
      {
        path: 'interview',
        element: (
          <LazyPage>
            <InterviewPage />
          </LazyPage>
        ),
      },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
