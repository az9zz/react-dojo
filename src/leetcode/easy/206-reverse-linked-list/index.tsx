// src/leetcode/easy/206-reverse-linked-list/index.tsx
import { useState } from 'react'
import { Card, Input, Button, Typography, Form, Alert, Space, Divider } from 'antd'
import { ListNode, reverseList } from './solution'

const { Paragraph } = Typography

// --- 辅助函数 ---
// 将数组转换为链表
const arrayToList = (arr: number[]): ListNode | null => {
  if (arr.length === 0) return null
  const head = new ListNode(arr[0])
  let current = head
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i])
    current = current.next
  }
  return head
}

// 将链表转换为数组
const listToArray = (head: ListNode | null): number[] => {
  const arr: number[] = []
  let current = head
  while (current !== null) {
    arr.push(current.val)
    current = current.next
  }
  return arr
}

export const ReverseListComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number[] | null>(null)
  const [error, setError] = useState<string>('')

  const handleRun = (values: { list: string }) => {
    try {
      setError('')
      setResult(null)

      // 1. 解析输入字符串为数字数组
      const arr = values.list
        .split(',')
        .filter((s) => s.trim() !== '')
        .map((s) => {
          const num = parseInt(s.trim(), 10)
          if (isNaN(num)) throw new Error('输入包含非数字字符')
          return num
        })

      // 2. 将数组转换为链表
      const head = arrayToList(arr)

      // 3. 调用核心算法
      const reversedHead = reverseList(head)

      // 4. 将结果链表转回数组以便展示
      const solutionResult = listToArray(reversedHead)
      setResult(solutionResult)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('发生未知错误，请检查输入格式。')
      }
    }
  }

  return (
    <Card title="206. 反转链表 (Reverse Linked List)">
      <Paragraph>给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ list: '1,2,3,4,5' }}
      >
        <Form.Item
          name="list"
          label="链表 (逗号分隔的数字)"
          rules={[{ required: true, message: '请输入链表节点值' }]}
        >
          <Input placeholder="例如: 1,2,3,4,5" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            运行代码
          </Button>
        </Form.Item>
      </Form>

      {(result || error) && (
        <Space direction="vertical" className="w-full">
          <Divider>运行结果</Divider>
          {result && (
            <Alert message={`反转后的链表: [${result.join(',')}]`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
