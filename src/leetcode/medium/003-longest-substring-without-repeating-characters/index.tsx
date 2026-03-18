// src/leetcode/medium/003-longest-substring-without-repeating-characters/index.tsx
import { useState } from 'react'
import { Card, Input, Button, Typography, Form, Alert, Space, Divider } from 'antd'
import { lengthOfLongestSubstring } from './solution'

const { Paragraph } = Typography

export const LongestSubstringComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number | null>(null)

  const handleRun = (values: { s: string }) => {
    const solutionResult = lengthOfLongestSubstring(values.s || '')
    setResult(solutionResult)
  }

  return (
    <Card title="3. 无重复字符的最长子串 (Longest Substring Without Repeating Characters)">
      <Paragraph>给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。</Paragraph>
      <Form form={form} onFinish={handleRun} layout="vertical" initialValues={{ s: 'abcabcbb' }}>
        <Form.Item name="s" label="字符串 s">
          <Input placeholder="例如: pwwkew" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            运行代码
          </Button>
        </Form.Item>
      </Form>

      {result !== null && (
        <Space direction="vertical" className="w-full">
          <Divider>运行结果</Divider>
          <Alert message={`最长子串的长度为: ${result}`} type="success" showIcon />
        </Space>
      )}
    </Card>
  )
}
