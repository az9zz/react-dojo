// src/leetcode/medium/300-longest-increasing-subsequence/index.tsx
import { useState } from 'react'
import { Card, Input, Button, Typography, Form, Alert, Space, Divider, Radio } from 'antd'
import { lengthOfLIS_DP, lengthOfLIS_Greedy } from './solution'

const { Paragraph } = Typography

type Method = 'DP' | 'Greedy'

export const LISComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string>('')
  const [method, setMethod] = useState<Method>('DP')

  const handleRun = (values: { nums: string }) => {
    try {
      setError('')
      setResult(null)

      const nums = JSON.parse(values.nums)
      if (!Array.isArray(nums) || !nums.every((item) => typeof item === 'number')) {
        throw new Error('输入必须是有效的数字数组，例如 [10,9,2,5,3,7,101,18]')
      }

      const startTime = performance.now()
      let solutionResult: number

      if (method === 'DP') {
        solutionResult = lengthOfLIS_DP(nums)
      } else {
        solutionResult = lengthOfLIS_Greedy(nums)
      }
      const endTime = performance.now()

      const executionTime = (endTime - startTime).toFixed(4)
      setResult(solutionResult)
      // Optionally, show execution time to compare performance
      console.log(`Method: ${method}, Execution time: ${executionTime} ms`)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误，请检查。')
      } else {
        setError('发生未知错误，请检查输入是否为有效的 JSON 格式。')
      }
    }
  }

  return (
    <Card title="300. 最长递增子序列 (Longest Increasing Subsequence)">
      <Paragraph>找到给定整数数组中最长严格递增子序列的长度。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ nums: '[10,9,2,5,3,7,101,18]' }}
      >
        <Form.Item
          name="nums"
          label="数组 nums"
          rules={[{ required: true, message: '请输入数组' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="请输入数组的 JSON 格式, 例如: [10,9,2,5,3,7,101,18]"
          />
        </Form.Item>
        <Form.Item label="选择解法">
          <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
            <Radio.Button value="DP">动态规划 (O(n²))</Radio.Button>
            <Radio.Button value="Greedy">贪心 + 二分 (O(n log n))</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            运行代码
          </Button>
        </Form.Item>
      </Form>

      {(result !== null || error) && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Divider>运行结果</Divider>
          {result !== null && (
            <Alert message={`最长递增子序列的长度为: ${result}`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
