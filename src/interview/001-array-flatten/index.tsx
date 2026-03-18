// src/interview/001-array-flatten/index.tsx
import { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
  Form,
  Alert,
  Space,
  Divider,
  Radio,
  InputNumber,
} from 'antd'
import {
  flattenByFlat,
  flattenByRecursion,
  flattenByReduce,
  flattenByStack,
  flattenByToString,
  flattenByFlatDepth,
  flattenByRecursionDepth,
  flattenByReduceDepth,
  flattenByStackDepth,
} from './solution'
import CodeBlock from '../../components/CodeBlock'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography
const { TextArea } = Input

type Method = 'Flat' | 'Recursion' | 'Reduce' | 'Stack' | 'ToString'

export const ArrayFlattenComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<unknown[] | null>(null)
  const [error, setError] = useState<string>('')
  const [method, setMethod] = useState<Method>('Flat')

  const handleRun = (values: { array: string; depth?: number | null; isDepthEnabled: boolean }) => {
    try {
      setError('')
      setResult(null)

      const arr = new Function(`return ${values.array}`)()
      if (!Array.isArray(arr)) {
        throw new Error('输入必须是有效的数组格式')
      }

      const depth = values.depth ?? 1 // 默认为 1
      const isDepthEnabled = Number.isInteger(values.depth)

      let solutionResult: unknown[]

      if (isDepthEnabled) {
        // 如果启用了深度，调用带深度的版本
        switch (method) {
          case 'Recursion':
            solutionResult = flattenByRecursionDepth(arr, depth)
            break
          case 'Reduce':
            solutionResult = flattenByReduceDepth(arr, depth)
            break
          case 'Stack':
            solutionResult = flattenByStackDepth(arr, depth)
            break
          case 'ToString':
            setError('ToString 解法不支持指定深度。')
            solutionResult = flattenByToString(arr)
            break
          default:
            solutionResult = flattenByFlatDepth(arr, depth)
        }
      } else {
        // 否则调用完全扁平化的版本
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

  const formatResult = (res: unknown[]): string => {
    // 使用JSON.stringify来准确显示可能存在的嵌套数组
    return JSON.stringify(res)
  }

  return (
    <Card title="001. 扁平化嵌套数组 (带深度)">
      <Paragraph>实现一个函数，将一个嵌套多层的数组 "拉平"，可选是否指定扁平化深度。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: '[1, [2, [3, 4], 5], 6]', depth: 1 }}
      >
        <Form.Item
          name="array"
          label="嵌套数组"
          rules={[{ required: true, message: '请输入数组' }]}
        >
          <TextArea rows={4} placeholder="例如: [1, [2, [3, 4], 5], 6]" />
        </Form.Item>

        <Form.Item
          name="depth"
          label="扁平化深度 (depth)"
          extra="不输入或清空则为完全扁平化 (depth = Infinity)"
        >
          <InputNumber min={0} className="w-full" placeholder="例如: 1. " />
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
        <Space direction="vertical" className="w-full">
          <Divider>运行结果</Divider>
          {result && (
            <Alert message={`扁平化结果: ${formatResult(result)}`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}

      <Divider>解题代码</Divider>
      <CodeBlock language="typescript">{solutionCode}</CodeBlock>
    </Card>
  )
}
