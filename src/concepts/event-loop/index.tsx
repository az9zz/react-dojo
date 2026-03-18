// src/concepts/event-loop/index.tsx
import { useState, useRef, useEffect } from 'react'
import { Card, Button, Typography, Space, Divider, Tag } from 'antd'
import CodeBlock from '../../components/CodeBlock'

const { Title, Paragraph, Text } = Typography

// --- 示例一：宏任务 vs 微任务 ---
const MacroMicroExample = () => {
  const [guess, setGuess] = useState(false)
  const [result, setResult] = useState<string[]>([])

  const code = `console.log('1: 同步')
setTimeout(() => console.log('2: setTimeout'), 0)
Promise.resolve().then(() => console.log('3: Promise.then'))
queueMicrotask(() => console.log('4: queueMicrotask'))
console.log('5: 同步')`

  const answer = ['1: 同步', '5: 同步', '3: Promise.then', '4: queueMicrotask', '2: setTimeout']

  const runDemo = () => {
    setGuess(true)
    setResult([])
  }

  const showAnswer = () => {
    const explanation = [
      '▶ "1: 同步"        — 同步代码，立即执行',
      '  setTimeout 注册宏任务',
      '  Promise.then 注册微任务',
      '  queueMicrotask 注册微任务',
      '▶ "5: 同步"        — 同步代码，立即执行',
      '--- 同步代码执行完毕，开始清空微任务队列 ---',
      '▶ "3: Promise.then" — 微任务',
      '▶ "4: queueMicrotask" — 微任务',
      '--- 微任务队列清空，执行下一个宏任务 ---',
      '▶ "2: setTimeout"   — 宏任务',
    ]
    setResult(explanation)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        执行顺序：同步代码 → 微任务（<Text code>Promise.then</Text>、
        <Text code>queueMicrotask</Text>）→ 宏任务（<Text code>setTimeout</Text>）。
      </Paragraph>
      <CodeBlock language="javascript">{code}</CodeBlock>
      {!guess ? (
        <Button type="primary" onClick={runDemo}>
          先猜猜输出顺序？
        </Button>
      ) : (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Paragraph>
            你猜的顺序是什么？正确答案：
            {answer.map((item, i) => (
              <Tag key={i} color="blue" style={{ margin: 2 }}>
                {item}
              </Tag>
            ))}
          </Paragraph>
          <Button type="primary" onClick={showAnswer}>
            查看详细执行过程
          </Button>
        </Space>
      )}
      {result.length > 0 && <CodeBlock>{result.join('\n')}</CodeBlock>}
    </Space>
  )
}

// --- 示例二：setTimeout(fn, 0) 不是真正的 0ms ---
const SetTimeoutZeroExample = () => {
  const [result, setResult] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  const runDemo = () => {
    setResult([])
    setRunning(true)

    const logs: string[] = []
    const start = performance.now()

    logs.push('开始计时...')
    logs.push(`设置 setTimeout(fn, 0)`)

    setTimeout(() => {
      const elapsed = (performance.now() - start).toFixed(2)
      logs.push(`setTimeout 回调执行！实际延迟: ${elapsed}ms`)
      logs.push('')
      logs.push('原因：')
      logs.push('1. setTimeout(fn, 0) 的最小延迟通常是 4ms（HTML5 规范）')
      logs.push('2. 嵌套超过 5 层后强制最小 4ms')
      logs.push('3. 浏览器还有其他调度开销')
      logs.push('')

      // 嵌套 setTimeout 测试
      const nestedStart = performance.now()
      let depth = 0
      const nestedLogs: string[] = []

      const nest = () => {
        depth++
        const nestedElapsed = (performance.now() - nestedStart).toFixed(2)
        nestedLogs.push(`  第 ${depth} 层嵌套 setTimeout: ${nestedElapsed}ms`)
        if (depth < 8) {
          setTimeout(nest, 0)
        } else {
          setResult([...logs, '嵌套 setTimeout(fn, 0) 的延迟:', ...nestedLogs])
          setRunning(false)
        }
      }
      setTimeout(nest, 0)
    }, 0)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        <Text code>setTimeout(fn, 0)</Text> 并不是"立即执行"，而是"尽快在下一个宏任务执行"。
        实际延迟取决于浏览器实现和嵌套深度。
      </Paragraph>
      <Button type="primary" onClick={runDemo} loading={running}>
        运行：测量真实延迟
      </Button>
      {result.length > 0 && <CodeBlock>{result.join('\n')}</CodeBlock>}
    </Space>
  )
}

// --- 示例三：动画演示 ---
const EventLoopAnimation = () => {
  const [callStack, setCallStack] = useState<string[]>([])
  const [microQueue, setMicroQueue] = useState<string[]>([])
  const [macroQueue, setMacroQueue] = useState<string[]>([])
  const [output, setOutput] = useState<string[]>([])
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const steps = [
    { desc: '初始状态', callStack: [], micro: [], macro: [], output: [] },
    {
      desc: '执行 console.log("同步1")',
      callStack: ['console.log("同步1")'],
      micro: [],
      macro: [],
      output: ['同步1'],
    },
    {
      desc: 'setTimeout 注册宏任务',
      callStack: ['setTimeout(cb, 0)'],
      micro: [],
      macro: ['setTimeout cb'],
      output: ['同步1'],
    },
    {
      desc: 'Promise.then 注册微任务',
      callStack: ['Promise.resolve().then(cb)'],
      micro: ['Promise cb'],
      macro: ['setTimeout cb'],
      output: ['同步1'],
    },
    {
      desc: '执行 console.log("同步2")',
      callStack: ['console.log("同步2")'],
      micro: ['Promise cb'],
      macro: ['setTimeout cb'],
      output: ['同步1', '同步2'],
    },
    {
      desc: '同步代码执行完毕，清空微任务队列',
      callStack: ['Promise cb'],
      micro: [],
      macro: ['setTimeout cb'],
      output: ['同步1', '同步2', 'Promise'],
    },
    {
      desc: '微任务清空，执行宏任务',
      callStack: ['setTimeout cb'],
      micro: [],
      macro: [],
      output: ['同步1', '同步2', 'Promise', 'setTimeout'],
    },
    {
      desc: '全部执行完毕！',
      callStack: [],
      micro: [],
      macro: [],
      output: ['同步1', '同步2', 'Promise', 'setTimeout'],
    },
  ]

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStep(0)
    setRunning(false)
    const s = steps[0]
    setCallStack(s.callStack)
    setMicroQueue(s.micro)
    setMacroQueue(s.macro)
    setOutput(s.output)
  }

  const applyStep = (idx: number) => {
    const s = steps[idx]
    setCallStack(s.callStack)
    setMicroQueue(s.micro)
    setMacroQueue(s.macro)
    setOutput(s.output)
    setStep(idx)
  }

  const autoPlay = () => {
    setRunning(true)
    applyStep(0)
    let current = 0
    const tick = () => {
      current++
      if (current < steps.length) {
        applyStep(current)
        timerRef.current = setTimeout(tick, 1200)
      } else {
        setRunning(false)
      }
    }
    timerRef.current = setTimeout(tick, 1200)
  }

  const nextStep = () => {
    if (step < steps.length - 1) {
      applyStep(step + 1)
    }
  }

  const queueStyle = (color: string): React.CSSProperties => ({
    border: `2px solid ${color}`,
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
    flex: 1,
  })

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>可视化 Call Stack、微任务队列和宏任务队列的执行过程。</Paragraph>
      <CodeBlock language="javascript">{`console.log("同步1")
setTimeout(() => console.log("setTimeout"), 0)
Promise.resolve().then(() => console.log("Promise"))
console.log("同步2")`}</CodeBlock>
      <Space>
        <Button type="primary" onClick={autoPlay} loading={running}>
          自动播放
        </Button>
        <Button onClick={nextStep} disabled={running || step >= steps.length - 1}>
          下一步
        </Button>
        <Button onClick={reset} disabled={running}>
          重置
        </Button>
      </Space>
      <Tag color="processing" style={{ fontSize: 14, padding: '4px 12px' }}>
        第 {step}/{steps.length - 1} 步：{steps[step].desc}
      </Tag>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={queueStyle('#1890ff')}>
          <Text strong style={{ color: '#1890ff' }}>
            📦 Call Stack
          </Text>
          {callStack.map((item, i) => (
            <div key={i}>
              <Tag color="blue" style={{ margin: '4px 0' }}>
                {item}
              </Tag>
            </div>
          ))}
        </div>
        <div style={queueStyle('#52c41a')}>
          <Text strong style={{ color: '#52c41a' }}>
            ⚡ 微任务队列
          </Text>
          {microQueue.map((item, i) => (
            <div key={i}>
              <Tag color="green" style={{ margin: '4px 0' }}>
                {item}
              </Tag>
            </div>
          ))}
        </div>
        <div style={queueStyle('#faad14')}>
          <Text strong style={{ color: '#faad14' }}>
            ⏰ 宏任务队列
          </Text>
          {macroQueue.map((item, i) => (
            <div key={i}>
              <Tag color="orange" style={{ margin: '4px 0' }}>
                {item}
              </Tag>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: '#000',
          color: '#0f0',
          padding: 12,
          borderRadius: 6,
          fontFamily: 'monospace',
          minHeight: 40,
        }}
      >
        <Text strong style={{ color: '#888' }}>
          输出:
        </Text>
        {output.map((item, i) => (
          <div key={i} style={{ color: '#0f0' }}>
            {'> '}
            {item}
          </div>
        ))}
      </div>
    </Space>
  )
}

export const EventLoopConceptComponent = () => {
  return (
    <Card title="核心概念: 事件循环 (Event Loop)">
      <Title level={4}>示例一：宏任务 vs 微任务</Title>
      <MacroMicroExample />
      <Divider />
      <Title level={4}>示例二：setTimeout(fn, 0) 的真相</Title>
      <SetTimeoutZeroExample />
      <Divider />
      <Title level={4}>示例三：事件循环动画演示</Title>
      <EventLoopAnimation />
    </Card>
  )
}
