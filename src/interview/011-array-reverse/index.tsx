// src/interview/009-array-reverse/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Radio, Input } from 'antd'
import {
  reverseWithNative,
  reverseWithNewArray,
  reverseWithUnshift,
  reverseInPlace,
} from './solution'
import SolutionCode from '../../components/CodeBlock/SolutionCode'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography

type Method = 'Native' | 'NewArray' | 'Unshift' | 'InPlace'

export const ArrayReverseComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<unknown[] | null>(null)
  const [original, setOriginal] = useState<unknown[]>([])
  const [error, setError] = useState<string>('')
  const [method, setMethod] = useState<Method>('InPlace')

  const handleRun = (values: { array: string }) => {
    try {
      setError('')
      setResult(null)

      const arr = JSON.parse(values.array)
      if (!Array.isArray(arr)) {
        throw new Error('输入必须是有效的JSON数组')
      }

      // 保存原始数组的副本用于展示
      const originalCopy = [...arr]
      setOriginal(originalCopy)

      let solutionResult: unknown[]
      switch (method) {
        case 'NewArray':
          solutionResult = reverseWithNewArray(arr)
          break
        case 'Unshift':
          solutionResult = reverseWithUnshift(arr)
          break
        case 'InPlace':
          // 对于原地操作，我们传入 arr 本身，它会被修改
          solutionResult = reverseInPlace(arr)
          break
        default: // Native
          solutionResult = reverseWithNative(arr)
      }

      setResult(solutionResult)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('发生未知错误或输入格式不正确。')
      }
    }
  }

  return (
    <Card title="011. 数组翻转 (Array Reverse)">
      <Paragraph>实现多种方法来翻转一个数组，并理解“原地”操作的区别。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: '[1, 2, 3, "a", "b", "c"]' }}
      >
        <Form.Item name="array" label="输入数组 (JSON格式)">
          <Input />
        </Form.Item>
        <Form.Item label="选择解法">
          <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
            <Radio.Button value="InPlace">双指针 (原地)</Radio.Button>
            <Radio.Button value="NewArray">新数组 (非原地)</Radio.Button>
            <Radio.Button value="Native">原生 reverse()</Radio.Button>
            <Radio.Button value="Unshift">Unshift (低效)</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            执行翻转
          </Button>
        </Form.Item>
      </Form>

      <Divider>运行结果</Divider>
      {(result || error) && (
        <Space direction="vertical" className="w-full">
          {result && (
            <>
              <Alert message={`原始数组: [${original.join(', ')}]`} type="info" />
              <Alert message={`翻转结果: [${result.join(', ')}]`} type="success" showIcon />
            </>
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
      <SolutionCode code={solutionCode} />
    </Card>
  )
}
