// src/interview/006-debounce-throttle/index.tsx
import { useState, useMemo, type FC } from 'react'
import { Card, Typography, Space, Divider, Alert, Statistic } from 'antd'
import { debounce, throttle } from './solution'

const { Paragraph, Title } = Typography

const DemoBox: FC<{ title: string; onMouseMove: () => void; count: number }> = ({
  title,
  onMouseMove,
  count,
}) => (
  <div style={{ padding: '16px', border: '1px solid #eee', borderRadius: '4px' }}>
    <Title level={5}>{title}</Title>
    <div
      onMouseMove={onMouseMove}
      style={{
        height: 100,
        backgroundColor: '#f0f2f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paragraph>在此区域移动鼠标</Paragraph>
    </div>
    <Statistic title="函数执行次数" value={count} style={{ marginTop: 8 }} />
  </div>
)

export const DebounceThrottleComponent = () => {
  const [rawCount, setRawCount] = useState(0)
  const [debounceCount, setDebounceCount] = useState(0)
  const [throttleCount, setThrottleCount] = useState(0)

  const handleRawMove = () => setRawCount((c) => c + 1)

  // 使用 useMemo 来确保防抖/节流函数只创建一次，这是在 React 中使用它们的关键
  const handleDebouncedMove = useMemo(() => debounce(() => setDebounceCount((c) => c + 1), 500), [])

  const handleThrottledMove = useMemo(() => throttle(() => setThrottleCount((c) => c + 1), 500), [])

  return (
    <Card title="006. 防抖与节流 (Debounce & Throttle)">
      <Alert
        type="info"
        message="在下方的灰色区域快速移动鼠标，观察三种情况下函数执行次数的差异。"
      />
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <DemoBox title="原始函数 (无处理)" onMouseMove={handleRawMove} count={rawCount} />
        <DemoBox
          title="防抖 (Debounce - 延迟 500ms)"
          onMouseMove={handleDebouncedMove}
          count={debounceCount}
        />
        <DemoBox
          title="节流 (Throttle - 间隔 500ms)"
          onMouseMove={handleThrottledMove}
          count={throttleCount}
        />
      </Space>
    </Card>
  )
}
