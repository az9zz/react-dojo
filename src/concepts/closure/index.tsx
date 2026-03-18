// src/concepts/closure/index.tsx
import { useState, useMemo } from 'react'
import { Card, Button, Typography, Space, Divider, Alert, Statistic } from 'antd'
const { Title, Paragraph, Text } = Typography
// --- 示例一：计数器 (私有变量) ---
const createCounter = () => {
  let count = 0 // 这个 count 就是被闭包捕获的私有变量
  return {
    increment: () => {
      count++
    },
    decrement: () => {
      count--
    },
    getCount: () => count,
  }
}
const CounterExample = () => {
  // 使用 useMemo 来确保 counter 实例在组件生命周期内是唯一的
  const counter = useMemo(() => createCounter(), [])
  const [displayCount, setDisplayCount] = useState(counter.getCount())
  const updateDisplay = () => {
    setDisplayCount(counter.getCount())
  }
  return (
    <Space direction="vertical">
      <Paragraph>
        这个计数器的 <Text code>count</Text> 变量被封装在闭包中，外部无法直接访问。
      </Paragraph>
      <Space>
        <Button
          onClick={() => {
            counter.increment()
            updateDisplay()
          }}
        >
          Increment
        </Button>
        <Button
          onClick={() => {
            counter.decrement()
            updateDisplay()
          }}
        >
          Decrement
        </Button>
      </Space>
      <Statistic title="Current Count" value={displayCount} />
    </Space>
  )
}
// --- 示例二：函数柯里化 (参数记忆) ---
const add = (x: number) => {
  // 返回的这个函数是一个闭包，它记住了 x
  return (y: number) => x + y
}
const CurryingExample = () => {
  const add5 = useMemo(() => add(5), [])
  const add10 = useMemo(() => add(10), [])
  return (
    <Space direction="vertical">
      <Paragraph>
        <Text code>add5</Text> 是一个通过闭包记住了 <Text code>x=5</Text> 的新函数。
      </Paragraph>
      <Text>
        add5(3) = <b>{add5(3)}</b>
      </Text>
      <Text>
        add10(3) = <b>{add10(3)}</b>
      </Text>
    </Space>
  )
}
// --- 示例三：React Hooks 中的闭包陷阱与正确用法 ---
const HooksTrapExample = () => {
  const [count, setCount] = useState(0)
  const logCountWrong = () => {
    // 这个 setTimeout 的回调是一个闭包，它捕获了 logCountWrong 被创建时
    // 的 count 值。当它一秒后执行时，它打印的是旧的 count。
    setTimeout(() => {
      alert(`错误的 Count: ${count}`)
    }, 1000)
  }

  const logCountCorrect = () => {
    // 使用函数式更新，可以拿到最新的 state，避免闭包陷阱
    setTimeout(() => {
      // 这里的 c 是 React 保证的最新 state
      setCount((c) => {
        alert(`正确的 Count: ${c}`)
        return c // 返回原值，不改变 state
      })
    }, 1000)
  }
  return (
    <Space direction="vertical">
      <Paragraph>
        React Hooks 严重依赖闭包。如果不注意，很容易在异步操作中拿到旧的 state。
      </Paragraph>
      <Statistic title="Current Count" value={count} />
      <Space>
        <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
        <Button onClick={logCountWrong} type="dashed" danger>
          延迟打印 (错误方式)
        </Button>
        <Button onClick={logCountCorrect} type="primary">
          延迟打印 (正确方式)
        </Button>
      </Space>
      <Alert
        message="操作提示：快速点击几次 Increment，然后点击两种打印按钮，观察 alert 的值。"
        type="info"
      />
    </Space>
  )
}
export const ClosureConceptComponent = () => {
  return (
    <Card title="核心概念: 闭包 (Closure)">
      <Title level={4}>示例一：创建私有变量</Title>
      <CounterExample />
      <Divider />
      <Title level={4}>示例二：函数柯里化</Title>
      <CurryingExample />
      <Divider />

      <Title level={4}>示例三：React Hooks 中的闭包</Title>
      <HooksTrapExample />
    </Card>
  )
}
