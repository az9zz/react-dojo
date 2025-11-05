// src/interview/002-function-currying/index.tsx
import React, { useState, useMemo, useCallback } from 'react'
import { Card, Input, Button, Typography, Space, Divider, Alert, Tag } from 'antd'
import { curry } from './solution'

const { Paragraph, Text } = Typography

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericFunction = (...args: any[]) => any

// 一个简单的示例函数
const originalAdd = (a: number, b: number, c: number): number => a + b + c

export const FunctionCurryingComponent: React.FC = () => {
  const [curriedFn, setCurriedFn] = useState<GenericFunction | null>(null)
  const [collectedArgs, setCollectedArgs] = useState<number[]>([])
  const [inputValue, setInputValue] = useState<string>('1')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string>('')

  const curriedAdd = useMemo(() => curry(originalAdd), [])

  const handleReset = useCallback(() => {
    setCurriedFn(() => curriedAdd)
    setCollectedArgs([])
    setResult(null)
    setError('')
    setInputValue('1')
  }, [curriedAdd])

  // 初始化
  useState(handleReset)

  const handleCall = () => {
    try {
      setError('')
      const newArgs = inputValue.split(',').map((s) => {
        const num = parseInt(s.trim(), 10)
        if (isNaN(num)) throw new Error(`'${s.trim()}' 不是一个有效的数字`)
        return num
      })

      if (!curriedFn) throw new Error('请先点击重置按钮初始化柯里化函数。')

      const nextStep = curriedFn(...newArgs)
      const newCollectedArgs = [...collectedArgs, ...newArgs]

      if (typeof nextStep === 'function') {
        // 返回了新函数，继续等待参数
        setCurriedFn(() => nextStep)
        setCollectedArgs(newCollectedArgs)
        setResult(null)
      } else {
        // 返回了最终结果
        setResult(nextStep)
        setCollectedArgs(newCollectedArgs)
        setCurriedFn(null) // 调用结束
      }
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
      else setError('发生未知错误')
    }
  }

  return (
    <Card title="002. 函数柯里化 (Function Currying)">
      <Paragraph>
        柯里化是将多参数函数转变为一系列单参数函数的过程。下面我们来交互式地体验一下。
      </Paragraph>
      <Paragraph>
        <Text strong>原始函数:</Text>
        <pre>
          <code>{'const add = (a, b, c) => a + b + c;'}</code>
        </pre>
      </Paragraph>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入参数, 如 1 或 1,2"
            disabled={curriedFn === null}
          />
          <Button type="primary" onClick={handleCall} disabled={curriedFn === null}>
            调用
          </Button>
        </Space.Compact>
        <Button onClick={handleReset} style={{ width: '100%' }}>
          开始 / 重置
        </Button>
      </Space>

      <Divider>当前状态</Divider>
      <Paragraph>
        <Text strong>已收集参数: </Text>
        <Tag color="blue">{`[${collectedArgs.join(', ')}]`}</Tag>
      </Paragraph>
      {result !== null && (
        <Alert message={`执行完成！最终结果: ${result}`} type="success" showIcon />
      )}
      {error && <Alert message={error} type="error" showIcon />}
      {curriedFn && result === null && (
        <Alert
          message={`函数已部分应用，当前需要 ${originalAdd.length - collectedArgs.length} 个参数。`}
          type="info"
          showIcon
        />
      )}
    </Card>
  )
}
