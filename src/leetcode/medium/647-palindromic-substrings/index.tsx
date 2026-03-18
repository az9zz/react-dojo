// src/leetcode/medium/647-palindromic-substrings/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Radio, Input } from 'antd'
import { countSubstrings_DP, countSubstrings_CenterExpand } from './solution'

const { Paragraph } = Typography

type Method = 'DP' | 'CenterExpand'

export const PalindromicSubstringsComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number | null>(null)
  const [method, setMethod] = useState<Method>('CenterExpand')
  const [executionTime, setExecutionTime] = useState<string>('')

  const handleRun = (values: { s: string }) => {
    setResult(null)
    setExecutionTime('')

    const s = values.s || ''
    if (s.length === 0) {
      setResult(0)
      return
    }

    const startTime = performance.now()
    let solutionResult: number

    if (method === 'DP') {
      solutionResult = countSubstrings_DP(s)
    } else {
      solutionResult = countSubstrings_CenterExpand(s)
    }
    const endTime = performance.now()

    setExecutionTime((endTime - startTime).toFixed(4))
    setResult(solutionResult)
  }

  return (
    <Card title="647. 回文子串 (Palindromic Substrings)">
      <Paragraph>统计一个字符串中所有回文子串的数量。</Paragraph>
      <Form form={form} onFinish={handleRun} layout="vertical" initialValues={{ s: 'abaaba' }}>
        <Form.Item
          name="s"
          label="输入字符串 s"
          rules={[{ required: true, message: '请输入字符串' }]}
        >
          <Input placeholder="例如: aaa" />
        </Form.Item>
        <Form.Item label="选择解法">
          <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
            <Radio.Button value="DP">动态规划 (O(n²))</Radio.Button>
            <Radio.Button value="CenterExpand">中心扩展 (O(n²))</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            计算数量
          </Button>
        </Form.Item>
      </Form>

      {result !== null && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Divider>运行结果</Divider>
          <Alert message={`执行耗时: ${executionTime} ms`} type="info" />
          <Alert message={`找到 ${result} 个回文子串`} type="success" showIcon />
        </Space>
      )}
    </Card>
  )
}
