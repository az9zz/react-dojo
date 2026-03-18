// src/leetcode/easy/001-two-sum/index.tsx
import { useState } from 'react'
import { Card, Input, Button, Typography, Form, Alert, Space, Divider } from 'antd'
import { twoSum } from './solution' // 导入核心算法
import CodeBlock from '../../../components/CodeBlock'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography

export const TwoSumComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number[] | null>(null)
  const [error, setError] = useState<string>('')

  const handleRun = (values: { nums: string; target: string }) => {
    try {
      setError('')
      setResult(null)

      // 1. 解析和校验输入
      const nums = values.nums.split(',').map((s) => {
        const num = parseInt(s.trim(), 10)
        if (isNaN(num)) throw new Error('数组输入包含非数字字符')
        return num
      })

      const target = parseInt(values.target.trim(), 10)
      if (isNaN(target)) throw new Error('目标值必须是数字')

      // 2. 调用核心算法
      const solutionResult = twoSum(nums, target)

      // 3. 更新结果状态
      if (solutionResult.length === 2) {
        setResult(solutionResult)
      } else {
        setError('未找到符合条件的两个数。')
      }
    } catch (e: unknown) {
      // 1. 将类型从 any 改为 unknown
      // 2. 使用类型守卫检查 e 是否是一个 Error 对象实例
      if (e instanceof Error) {
        setError(e.message) // 如果是，我们可以安全地访问它的 message 属性
      } else {
        // 3. 如果它不是 Error 对象（比如有人 throw 'a string'），我们给一个通用错误
        setError('发生了一个未知错误，请检查输入格式。')
      }
    }
  }

  return (
    <Card title="1. 两数之和 (Two Sum)">
      <Paragraph>
        给定一个整数数组 `nums` 和一个目标值
        `target`，请找出和为目标值的两个整数，并返回它们的数组下标。
      </Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ nums: '2, 7, 11, 15', target: '9' }}
      >
        <Form.Item
          name="nums"
          label="数组 nums"
          rules={[{ required: true, message: '请输入数组' }]}
        >
          <Input placeholder="例如: 2, 7, 11, 15" />
        </Form.Item>
        <Form.Item
          name="target"
          label="目标值 target"
          rules={[{ required: true, message: '请输入目标值' }]}
        >
          <Input placeholder="例如: 9" />
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
            <Alert message={`成功！找到下标: [${result.join(', ')}]`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}

      <Divider>解题代码</Divider>
      <CodeBlock language="typescript">{solutionCode}</CodeBlock>
    </Card>
  )
}
