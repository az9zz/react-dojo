// src/interview/007-closure-in-loop/index.tsx
import React, { useState } from 'react'
import { Card, Button, Typography, Space, Divider, List } from 'antd'
import { runProblematic, runWithLet, runWithIIFE, runWithSetTimeoutArg } from './solution'

const { Paragraph } = Typography

export const ClosureInLoopComponent: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([])

  const startTest = (runner: (log: (msg: string | number) => void) => void) => {
    setLogs([]) // 清空日志
    // const newLogs: string[] = []
    const logger = (msg: string | number) => {
      // 使用函数式更新，确保拿到最新的 state
      setLogs((prevLogs) => [...prevLogs, msg.toString()])
    }
    runner(logger)
  }

  return (
    <Card title="007. 循环中的闭包问题">
      <Paragraph>
        这是一个经典的 JavaScript
        面试题，用于考察对作用域、闭包和异步的理解。点击下方按钮，观察不同实现方式的输出结果。
      </Paragraph>
      <Space wrap>
        <Button type="dashed" danger onClick={() => startTest(runProblematic)}>
          运行错误示例 (var)
        </Button>
        <Button type="primary" onClick={() => startTest(runWithLet)}>
          解法一 (let)
        </Button>
        <Button onClick={() => startTest(runWithIIFE)}>解法二 (IIFE)</Button>
        <Button onClick={() => startTest(runWithSetTimeoutArg)}>解法三 (setTimeout arg)</Button>
      </Space>

      <Divider>输出日志</Divider>
      <List
        bordered
        dataSource={logs}
        renderItem={(item, index) => (
          <List.Item>
            <pre
              style={{ margin: 0 }}
            >{`[${(index + 1).toString().padStart(2, '0')}] ${item}`}</pre>
          </List.Item>
        )}
        style={{ minHeight: 220 }}
      />
    </Card>
  )
}
