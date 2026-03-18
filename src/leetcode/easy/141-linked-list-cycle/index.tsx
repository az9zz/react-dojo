// src/leetcode/easy/141-linked-list-cycle/index.tsx
import { useState } from 'react'
import { Card, Input, InputNumber, Button, Typography, Form, Alert, Space, Divider } from 'antd'
import { hasCycle, createLinkedListWithCycle } from './solution'
import CodeBlock from '../../../components/CodeBlock'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography

export const LinkedListCycleComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<boolean | null>(null)
  const [error, setError] = useState<string>('')

  const handleRun = (values: { list: string; pos: number }) => {
    try {
      setError('')
      setResult(null)

      const arr = JSON.parse(values.list)
      if (!Array.isArray(arr) || !arr.every((item) => typeof item === 'number')) {
        throw new Error('输入必须是有效的数字数组，例如 [3,2,0,-4]')
      }

      const pos = values.pos
      if (pos < -1 || pos >= arr.length) {
        throw new Error(`pos 的值必须在 -1 到 ${arr.length - 1} 之间`)
      }

      // 使用辅助函数创建链表
      const head = createLinkedListWithCycle(arr, pos)

      // 调用核心算法
      const solutionResult = hasCycle(head)
      setResult(solutionResult)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误，请检查。')
      } else {
        setError('发生未知错误，请检查输入是否为有效的 JSON 格式。')
      }
    }
  }

  return (
    <Card title="141. 环形链表 (Linked List Cycle)">
      <Paragraph>判断给定的链表中是否有环。使用数组和 `pos` 来模拟链表。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ list: '[3,2,0,-4]', pos: 1 }}
      >
        <Form.Item
          name="list"
          label="链表节点值 (数组格式)"
          rules={[{ required: true, message: '请输入数组' }]}
        >
          <Input placeholder="例如: [3,2,0,-4]" />
        </Form.Item>
        <Form.Item
          name="pos"
          label="环的起始位置 (pos, -1表示无环)"
          rules={[{ required: true, message: '请输入 pos' }]}
        >
          <InputNumber min={-1} className="w-full" placeholder="例如: 1" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            运行代码
          </Button>
        </Form.Item>
      </Form>

      {(result !== null || error) && (
        <Space direction="vertical" className="w-full">
          <Divider>运行结果</Divider>
          {result !== null && (
            <Alert
              message={`链表中${result ? '存在' : '不存在'}环`}
              type={result ? 'success' : 'info'}
              showIcon
            />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}

      <Divider>解题代码</Divider>
      <CodeBlock language="typescript">{solutionCode}</CodeBlock>
    </Card>
  )
}
