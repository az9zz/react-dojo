// src/leetcode/medium/912-sort-an-array/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Radio, Input } from 'antd'
import { quickSort, mergeSort } from './solution'
import CodeBlock from '../../../components/CodeBlock'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography
const { TextArea } = Input

type Method = 'QuickSort' | 'MergeSort'

export const SortArrayComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [method, setMethod] = useState<Method>('QuickSort')
  const [executionTime, setExecutionTime] = useState<string>('')

  const handleRun = (values: { array: string }) => {
    try {
      setError('')
      setResult('')
      setExecutionTime('')

      const nums = JSON.parse(values.array)
      if (!Array.isArray(nums) || !nums.every((item) => typeof item === 'number')) {
        throw new Error('输入必须是有效的数字数组，例如 [5,2,3,1]')
      }

      // 创建一个副本进行排序，以便每次运行都基于相同的原始数据
      const numsToSort = [...nums]

      const startTime = performance.now()
      let sortedNums: number[]

      if (method === 'QuickSort') {
        sortedNums = quickSort(numsToSort)
      } else {
        sortedNums = mergeSort(numsToSort)
      }
      const endTime = performance.now()

      setExecutionTime((endTime - startTime).toFixed(4))
      setResult(`[${sortedNums.join(', ')}]`)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误，请检查。')
      } else {
        setError('发生未知错误。')
      }
    }
  }

  return (
    <Card title="912. 排序数组 (Sort an Array)">
      <Paragraph>使用快速排序或归并排序对一个整数数组进行升序排列。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: '[5,2,3,1,9,4,6,8,7]' }}
      >
        <Form.Item name="array" label="待排序数组">
          <TextArea rows={4} placeholder="请输入数组的 JSON 格式, 例如: [5,2,3,1]" />
        </Form.Item>
        <Form.Item label="选择排序算法">
          <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
            <Radio.Button value="QuickSort">快速排序</Radio.Button>
            <Radio.Button value="MergeSort">归并排序</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            执行排序
          </Button>
        </Form.Item>
      </Form>

      {(result || error) && (
        <Space direction="vertical" className="w-full">
          <Divider>运行结果</Divider>
          {executionTime && <Alert message={`执行耗时: ${executionTime} ms`} type="info" />}
          {result && <Alert message={`排序结果: ${result}`} type="success" showIcon />}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}

      <Divider>解题代码</Divider>
      <CodeBlock language="typescript">{solutionCode}</CodeBlock>
    </Card>
  )
}
