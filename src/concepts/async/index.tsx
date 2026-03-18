// src/concepts/async/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Space, Divider, Alert } from 'antd'

const { Title, Paragraph, Text } = Typography

// --- 示例一：Promise 链式调用 ---
const PromiseChainExample = () => {
  const [logs, setLogs] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  const runDemo = () => {
    setLogs([])
    setRunning(true)

    const addLog = (msg: string) => setLogs((prev) => [...prev, msg])

    const delay = (ms: number, value: number) =>
      new Promise<number>((resolve) => setTimeout(() => resolve(value), ms))

    addLog('🚀 开始 Promise 链...')

    delay(500, 1)
      .then((val) => {
        addLog(`第 1 步完成，得到: ${val}`)
        return delay(500, val + 10)
      })
      .then((val) => {
        addLog(`第 2 步完成，得到: ${val}（上一步的值 + 10）`)
        return delay(500, val * 2)
      })
      .then((val) => {
        addLog(`第 3 步完成，得到: ${val}（上一步的值 × 2）`)
        addLog('✅ 链式调用结束！值在 .then 间传递。')
        setRunning(false)
      })
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        <Text code>.then()</Text> 返回新的 Promise，回调的返回值会传递给下一个{' '}
        <Text code>.then()</Text>。
      </Paragraph>
      <Button type="primary" onClick={runDemo} loading={running}>
        运行：Promise 链式调用
      </Button>
      {logs.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {logs.join('\n')}
        </pre>
      )}
    </Space>
  )
}

// --- 示例二：async/await 语法糖 ---
const AsyncAwaitExample = () => {
  const [logs, setLogs] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  const runDemo = async () => {
    setLogs([])
    setRunning(true)

    const addLog = (msg: string) => setLogs((prev) => [...prev, msg])

    const delay = (ms: number, value: number) =>
      new Promise<number>((resolve) => setTimeout(() => resolve(value), ms))

    addLog('🚀 开始 async/await 版本...')

    const val1 = await delay(500, 1)
    addLog(`第 1 步完成，得到: ${val1}`)

    const val2 = await delay(500, val1 + 10)
    addLog(`第 2 步完成，得到: ${val2}（上一步的值 + 10）`)

    const val3 = await delay(500, val2 * 2)
    addLog(`第 3 步完成，得到: ${val3}（上一步的值 × 2）`)

    addLog('✅ async/await 结束！代码看起来像同步的，但实际是异步执行。')
    setRunning(false)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        <Text code>async/await</Text> 是 Promise 的语法糖，让异步代码看起来像同步代码，
        更易读、更易调试。
      </Paragraph>
      <Button type="primary" onClick={runDemo} loading={running}>
        运行：async/await 版本
      </Button>
      {logs.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {logs.join('\n')}
        </pre>
      )}
    </Space>
  )
}

// --- 示例三：错误处理 ---
const ErrorHandlingExample = () => {
  const [logs, setLogs] = useState<string[]>([])
  const [active, setActive] = useState<'catch' | 'try-catch' | null>(null)

  const runCatchDemo = () => {
    setActive('catch')
    setLogs([])
    const addLog = (msg: string) => setLogs((prev) => [...prev, msg])

    addLog('=== .catch 方式 ===')

    Promise.resolve(1)
      .then((val) => {
        addLog(`步骤 1 成功: ${val}`)
        throw new Error('步骤 2 出错了！')
      })
      .then((val) => {
        addLog(`步骤 3: 这行不会执行 (${val})`)
      })
      .catch((err: Error) => {
        addLog(`❌ .catch 捕获错误: "${err.message}"`)
      })
      .finally(() => {
        addLog('🏁 .finally 总是执行')
      })
  }

  const runTryCatchDemo = async () => {
    setActive('try-catch')
    setLogs([])
    const addLog = (msg: string) => setLogs((prev) => [...prev, msg])

    addLog('=== try/catch 方式 ===')

    try {
      const val = await Promise.resolve(1)
      addLog(`步骤 1 成功: ${val}`)
      await Promise.reject(new Error('步骤 2 出错了！'))
      addLog('步骤 3: 这行不会执行')
    } catch (err) {
      addLog(`❌ try/catch 捕获错误: "${(err as Error).message}"`)
    } finally {
      addLog('🏁 finally 总是执行')
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        Promise 用 <Text code>.catch()</Text> 捕获错误，async/await 用 <Text code>try/catch</Text>
        。未捕获的 rejection 会成为 unhandled rejection。
      </Paragraph>
      <Space>
        <Button type={active === 'catch' ? 'primary' : 'default'} onClick={runCatchDemo}>
          .catch 方式
        </Button>
        <Button type={active === 'try-catch' ? 'primary' : 'default'} onClick={runTryCatchDemo}>
          try/catch 方式
        </Button>
      </Space>
      {logs.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {logs.join('\n')}
        </pre>
      )}
      <Alert
        message="最佳实践：async 函数中始终使用 try/catch 包裹 await，或在调用处 .catch()。"
        type="info"
      />
    </Space>
  )
}

export const AsyncConceptComponent = () => {
  return (
    <Card title="核心概念: 异步 — Promise 与 async/await">
      <Title level={4}>示例一：Promise 链式调用</Title>
      <PromiseChainExample />
      <Divider />
      <Title level={4}>示例二：async/await 语法糖</Title>
      <AsyncAwaitExample />
      <Divider />
      <Title level={4}>示例三：错误处理对比</Title>
      <ErrorHandlingExample />
    </Card>
  )
}
