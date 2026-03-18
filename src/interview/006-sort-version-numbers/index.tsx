// src/interview/005-sort-version-numbers/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, List, Input } from 'antd'
import { sortVersionNumbers } from './solution'
import SolutionCode from '../../components/CodeBlock/SolutionCode'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography
const { TextArea } = Input

const initialVersions = [
  '1.10.2',
  '0.1.0',
  '1.2.0',
  '1.2',
  '1.1.3',
  '1.2.1',
  '2.0.0',
  '1.0.0-alpha', // sort 会把这个放在前面
].join('\n')

export const SortVersionsComponent = () => {
  const [form] = Form.useForm()
  const [sorted, setSorted] = useState<string[] | null>(null)
  const [error, setError] = useState<string>('')

  const handleRun = (values: { versions: string }) => {
    try {
      setError('')
      setSorted(null)

      // 将文本域中的每行转换为一个数组元素，并过滤掉空行
      const versionsArray = values.versions.split('\n').filter((v) => v.trim() !== '')
      if (versionsArray.length === 0) {
        throw new Error('请输入至少一个版本号')
      }

      const sortedVersions = sortVersionNumbers(versionsArray)

      setSorted(sortedVersions)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('发生未知错误。')
      }
    }
  }

  return (
    <Card title="005. 版本号排序 (Sort Version Numbers)">
      <Paragraph>实现一个函数，可以正确地对版本号字符串数组进行排序。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ versions: initialVersions }}
      >
        <Form.Item name="versions" label="版本号列表 (每行一个)">
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            执行排序
          </Button>
        </Form.Item>
      </Form>

      {(sorted || error) && (
        <Space direction="vertical" className="w-full">
          <Divider>排序结果</Divider>
          {sorted && (
            <List
              bordered
              dataSource={sorted}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
      <SolutionCode code={solutionCode} />
    </Card>
  )
}
