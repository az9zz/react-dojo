// src/interview/004-promise-concurrency-control/index.tsx
import { useState } from 'react'
import {
  Card,
  Button,
  Typography,
  Space,
  Divider,
  Slider,
  InputNumber,
  List,
  Tag,
  Alert,
} from 'antd'
import { promisePool } from './solution'

const { Paragraph, Text } = Typography

interface TaskLog {
  id: number
  status: 'pending' | 'running' | 'completed' | 'error'
  result?: string
  startTime?: number
  endTime?: number
}

export const PromisePoolComponent = () => {
  const [poolLimit, setPoolLimit] = useState(3)
  const [taskCount, setTaskCount] = useState(10)
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<TaskLog[]>([])
  const [finalResult, setFinalResult] = useState<string>('')

  const runTasks = async () => {
    setIsRunning(true)
    setFinalResult('')

    // 1. 初始化任务日志
    const initialLogs = Array.from({ length: taskCount }, (_, i) => ({
      id: i + 1,
      status: 'pending' as const,
    }))
    setLogs(initialLogs)

    // 2. 创建模拟异步任务数组
    const tasks = initialLogs.map((log) => {
      return () =>
        new Promise((resolve, reject) => {
          const duration = Math.floor(Math.random() * 2000) + 1000 // 1-3秒延时

          // 更新日志为 'running'
          const startTime = Date.now()
          setLogs((prev) =>
            prev.map((l) => (l.id === log.id ? { ...l, status: 'running', startTime } : l)),
          )

          setTimeout(() => {
            const isSuccess = Math.random() > 0.1 // 10% 概率失败
            if (isSuccess) {
              const result = `Task ${log.id} OK`
              resolve(result)
            } else {
              reject(new Error(`Task ${log.id} failed`))
            }
          }, duration)
        })
    })

    // 3. 执行并发控制器
    try {
      const results = await promisePool(poolLimit, tasks)
      setFinalResult(`全部成功! 结果: [${results.join(', ')}]`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFinalResult(`出现错误: ${error.message}`)
      }
    } finally {
      setIsRunning(false)
      // 确保所有任务状态都更新
      const endTime = Date.now()
      setLogs((prev) => {
        const finalLogs = [...prev]
        finalLogs.forEach((log, index) => {
          if (log.status === 'running') {
            finalLogs[index] = { ...log, status: 'completed', endTime }
          }
        })
        return finalLogs
      })
    }
  }

  return (
    <Card title="004. Promise 并发控制 (Promise Concurrency Control)">
      <Paragraph>实现一个函数来控制 Promise 的并发执行数量。</Paragraph>
      <Space align="center" className="mb-6">
        <Text>并发数:</Text>
        <Slider min={1} max={10} value={poolLimit} onChange={setPoolLimit} className="w-[120px]" />
        <InputNumber
          min={1}
          max={10}
          value={poolLimit}
          onChange={(val) => setPoolLimit(val || 1)}
        />

        <Text className="ml-6">任务数:</Text>
        <InputNumber
          min={1}
          max={50}
          value={taskCount}
          onChange={(val) => setTaskCount(val || 1)}
        />
      </Space>
      <div>
        <Button type="primary" onClick={runTasks} loading={isRunning}>
          开始执行
        </Button>
      </div>

      <Divider>执行日志</Divider>
      <List
        bordered
        dataSource={logs}
        renderItem={(item) => (
          <List.Item>
            <Text>任务 #{item.id}</Text>
            <Tag
              color={
                item.status === 'pending'
                  ? 'default'
                  : item.status === 'running'
                    ? 'processing'
                    : item.status === 'completed'
                      ? 'success'
                      : 'error'
              }
            >
              {item.status.toUpperCase()}
            </Tag>
          </List.Item>
        )}
        className="max-h-[300px] overflow-y-auto mb-4"
      />
      {finalResult && (
        <Alert
          message={finalResult}
          type={finalResult.startsWith('出现错误') ? 'error' : 'success'}
          showIcon
        />
      )}
    </Card>
  )
}
