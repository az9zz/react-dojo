// src/leetcode/medium/015-3sum/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Input, List } from 'antd'
import { threeSum } from './solution'

const { Paragraph } = Typography
const { TextArea } = Input

export const ThreeSumComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number[][] | null>(null)
  const [error, setError] = useState<string>('')

  const handleRun = (values: { array: string }) => {
    try {
      setError('')
      setResult(null)

      const nums = JSON.parse(values.array)
      if (!Array.isArray(nums) || !nums.every((item) => typeof item === 'number')) {
        throw new Error('输入必须是有效的数字数组，例如 [-1,0,1,2,-1,-4]')
      }

      const solutionResult = threeSum(nums)
      setResult(solutionResult)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误，请检查。')
      } else {
        setError('发生未知错误。')
      }
    }
  }

  return (
    <Card title="15. 三数之和 (3Sum)">
      <Paragraph>找出一个数组中所有和为 0 且不重复的三元组。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: '[-1,0,1,2,-1,-4]' }}
      >
        <Form.Item name="array" label="数组 nums">
          <TextArea rows={4} placeholder="请输入数组的 JSON 格式, 例如: [-1,0,1,2,-1,-4]" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查找三元组
          </Button>
        </Form.Item>
      </Form>

      {(result || error) && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Divider>运行结果</Divider>
          {result &&
            (result.length > 0 ? (
              <List
                bordered
                dataSource={result}
                renderItem={(item) => <List.Item>{'[' + item.join(', ') + ']'}</List.Item>}
              />
            ) : (
              <Alert message="未找到符合条件的三元组" type="info" showIcon />
            ))}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
