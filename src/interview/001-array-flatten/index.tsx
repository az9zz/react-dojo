// src/interview/001-array-flatten/index.tsx
import React, { useState } from 'react'
import { Card, Input, Button, Typography, Form, Alert, Space, Divider, Radio } from 'antd'
import {
  flattenByFlat,
  flattenByRecursion,
  flattenByReduce,
  flattenByStack,
  flattenByToString,
} from './solution'

const { Paragraph } = Typography
const { TextArea } = Input

type Method = 'Flat' | 'Recursion' | 'Reduce' | 'Stack' | 'ToString'

export const ArrayFlattenComponent: React.FC = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<unknown[] | null>(null)
  const [error, setError] = useState<string>('')
  const [method, setMethod] = useState<Method>('Flat')

  const handleRun = (values: { array: string }) => {
    try {
      setError('')
      setResult(null)

      // 使用 Function 构造函数来安全地执行字符串形式的数组
      const arr = new Function(`return ${values.array}`)()
      if (!Array.isArray(arr)) {
        throw new Error('输入必须是有效的数组格式')
      }

      let solutionResult: unknown[]
      switch (method) {
        case 'Recursion':
          solutionResult = flattenByRecursion(arr)
          break
        case 'Reduce':
          solutionResult = flattenByReduce(arr)
          break
        case 'Stack':
          solutionResult = flattenByStack(arr)
          break
        case 'ToString':
          solutionResult = flattenByToString(arr)
          break
        default:
          solutionResult = flattenByFlat(arr)
      }

      setResult(solutionResult)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误或解法不适用。')
      } else {
        setError('发生未知错误。')
      }
    }
  }

  return (
    <Card title="001. 扁平化嵌套数组 (Array Flattening)">
      <Paragraph>实现一个函数，将一个嵌套多层的数组 "拉平"，变成一个一维数组。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: '[1, [2, [3, 4], 5], 6]' }}
      >
        <Form.Item
          name="array"
          label="嵌套数组"
          rules={[{ required: true, message: '请输入数组' }]}
        >
          <TextArea rows={4} placeholder="例如: [1, [2, [3, 4], 5], 6]" />
        </Form.Item>
        <Form.Item label="选择解法">
          <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
            <Radio.Button value="Flat">ES6 flat()</Radio.Button>
            <Radio.Button value="Recursion">递归</Radio.Button>
            <Radio.Button value="Reduce">Reduce</Radio.Button>
            <Radio.Button value="Stack">迭代+栈</Radio.Button>
            <Radio.Button value="ToString">toString (Hack)</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            运行代码
          </Button>
        </Form.Item>
      </Form>

      {(result || error) && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Divider>运行结果</Divider>
          {result && (
            <Alert message={`扁平化结果: [${result.join(', ')}]`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
