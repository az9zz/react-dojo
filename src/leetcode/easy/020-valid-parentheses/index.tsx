// src/leetcode/easy/020-valid-parentheses/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Input } from 'antd'
import { isValid } from './solution'

const { Paragraph } = Typography

export const ValidParenthesesComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<boolean | null>(null)

  const handleRun = (values: { s: string }) => {
    const s = values.s || ''
    const solutionResult = isValid(s)
    setResult(solutionResult)
  }

  return (
    <Card title="20. 有效的括号 (Valid Parentheses)">
      <Paragraph>使用栈来判断一个只包含 `'()[]{}'` 的字符串是否有效。</Paragraph>
      <Form form={form} onFinish={handleRun} layout="vertical" initialValues={{ s: '{[()]}' }}>
        <Form.Item name="s" label="括号字符串">
          <Input placeholder="例如: ([)]" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            校验有效性
          </Button>
        </Form.Item>
      </Form>

      {result !== null && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Divider>校验结果</Divider>
          <Alert
            message={result ? '字符串是有效的' : '字符串是无效的'}
            type={result ? 'success' : 'error'}
            showIcon
          />
        </Space>
      )}
    </Card>
  )
}
