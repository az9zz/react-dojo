// src/leetcode/medium/056-merge-intervals/index.tsx
import { useState } from 'react'
import { Card, Input, Button, Typography, Form, Alert, Space, Divider } from 'antd'
import { merge } from './solution'
import CodeBlock from '../../../components/CodeBlock'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography
const { TextArea } = Input

export const MergeIntervalsComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number[][] | null>(null)
  const [error, setError] = useState<string>('')

  const handleRun = (values: { intervals: string }) => {
    try {
      setError('')
      setResult(null)

      // 1. 解析和校验输入 (使用 JSON.parse 来处理二维数组)
      const intervals = JSON.parse(values.intervals)
      if (
        !Array.isArray(intervals) ||
        !intervals.every(
          (item) =>
            Array.isArray(item) &&
            item.length === 2 &&
            typeof item[0] === 'number' &&
            typeof item[1] === 'number',
        )
      ) {
        throw new Error('输入格式必须是有效的二维数组，例如 [[1,3],[2,6]]')
      }

      // 2. 调用核心算法
      const solutionResult = merge(intervals)

      // 3. 更新结果状态
      setResult(solutionResult)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误，请检查。')
      } else {
        setError('发生未知错误，请检查输入是否为有效的 JSON 格式。')
      }
    }
  }

  // 将结果格式化为字符串以便显示
  const formatResult = (res: number[][]) => {
    return `[${res.map((interval) => `[${interval.join(',')}]`).join(', ')}]`
  }

  return (
    <Card title="56. 合并区间 (Merge Intervals)">
      <Paragraph>合并所有重叠的区间，并返回一个不重叠的区间数组。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ intervals: '[[1,3],[2,6],[8,10],[15,18]]' }}
      >
        <Form.Item
          name="intervals"
          label="区间数组 intervals"
          rules={[{ required: true, message: '请输入区间数组' }]}
        >
          <TextArea rows={4} placeholder="请输入二维数组的 JSON 格式, 例如: [[1,3],[2,6],[8,10]]" />
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
            <Alert message={`合并后的区间: ${formatResult(result)}`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}

      <Divider>解题代码</Divider>
      <CodeBlock language="typescript">{solutionCode}</CodeBlock>
    </Card>
  )
}
