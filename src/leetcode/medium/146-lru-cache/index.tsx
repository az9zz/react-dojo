// src/leetcode/medium/146-lru-cache/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Space, Divider, InputNumber, List, Radio } from 'antd'
import { LRUCache } from './solution'
import CodeBlock from '../../../components/CodeBlock'
import solutionCode from './solution.ts?raw'

const { Paragraph, Text } = Typography

interface Action {
  type: 'put' | 'get'
  key: number
  value?: number
}
interface Log {
  action: string
  result: string | number
  cacheState: string
}

export const LRUCacheComponent = () => {
  const [capacity, setCapacity] = useState(2)
  const [actions, setActions] = useState<Action[]>([
    { type: 'put', key: 1, value: 1 },
    { type: 'put', key: 2, value: 2 },
    { type: 'get', key: 1 },
    { type: 'put', key: 3, value: 3 },
    { type: 'get', key: 2 },
  ])
  const [logs, setLogs] = useState<Log[]>([])

  const [currentActionType, setCurrentActionType] = useState<'put' | 'get'>('put')
  const [currentKey, setCurrentKey] = useState<number | null>(null)
  const [currentValue, setCurrentValue] = useState<number | null>(null)

  const runSimulation = () => {
    const lruCache = new LRUCache(capacity)
    const newLogs: Log[] = []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getCacheState = (cacheInstance: any) => {
      const arr = []
      let node = cacheInstance.head.next
      while (node && node !== cacheInstance.tail) {
        arr.push(`${node.key}=${node.value}`)
        node = node.next
      }
      return `{${arr.join(', ')}}`
    }

    actions.forEach((action) => {
      let result: string | number = ''
      if (action.type === 'put') {
        lruCache.put(action.key, action.value!)
        result = 'null'
      } else {
        result = lruCache.get(action.key)
      }
      newLogs.push({
        action: `${action.type}(${action.key}${action.value !== undefined ? `,${action.value}` : ''})`,
        result,
        cacheState: getCacheState(lruCache),
      })
    })
    setLogs(newLogs)
  }

  const addAction = () => {
    if (currentKey !== null) {
      const newAction: Action = { type: currentActionType, key: currentKey }
      if (currentActionType === 'put' && currentValue !== null) {
        newAction.value = currentValue
      }
      setActions([...actions, newAction])
      setCurrentKey(null)
      setCurrentValue(null)
    }
  }

  return (
    <Card title="146. LRU 缓存 (LRU Cache)">
      <Paragraph>设计并实现一个 LRU (最近最少使用) 缓存机制。</Paragraph>
      <Space direction="vertical" className="w-full">
        <Space>
          <Text>设置容量:</Text>
          <InputNumber min={1} value={capacity} onChange={(val) => setCapacity(val || 1)} />
        </Space>
        <Divider>操作序列</Divider>
        <List
          size="small"
          bordered
          dataSource={actions}
          renderItem={(item, index) => (
            <List.Item>
              {`${index + 1}. ${item.type}(${item.key}${item.value !== undefined ? `,${item.value}` : ''})`}
            </List.Item>
          )}
        />
        <Card size="small">
          <Radio.Group
            value={currentActionType}
            onChange={(e) => setCurrentActionType(e.target.value)}
          >
            <Radio value="put">put</Radio>
            <Radio value="get">get</Radio>
          </Radio.Group>
          <InputNumber
            placeholder="key"
            value={currentKey}
            onChange={(val) => setCurrentKey(val)}
            className="mx-2"
          />
          {currentActionType === 'put' && (
            <InputNumber
              placeholder="value"
              value={currentValue}
              onChange={(val) => setCurrentValue(val)}
            />
          )}
          <Button onClick={addAction} className="ml-2">
            添加操作
          </Button>
        </Card>
        <Button type="primary" onClick={runSimulation}>
          执行模拟
        </Button>
      </Space>

      <Divider>执行日志</Divider>
      <List
        header={
          <div>
            <b>
              Action &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Result
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cache State (Old → New)
            </b>
          </div>
        }
        bordered
        dataSource={logs}
        renderItem={(log) => (
          <List.Item>
            <pre className="m-0 flex justify-between w-full">
              <span className="w-[30%]">{log.action}</span>
              <span className="w-[20%]">{log.result}</span>
              <span className="w-[50%]">{log.cacheState}</span>
            </pre>
          </List.Item>
        )}
      />

      <Divider>解题代码</Divider>
      <CodeBlock language="typescript">{solutionCode}</CodeBlock>
    </Card>
  )
}
