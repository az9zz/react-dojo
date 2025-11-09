// src/leetcode/easy/094-binary-tree-traversal/index.tsx
import React, { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Input, List } from 'antd'
import {
  // TreeNode,
  arrayToTree,
  preorderTraversalRecursive,
  preorderTraversalIterative,
  inorderTraversalRecursive,
  inorderTraversalIterative,
  postorderTraversalRecursive,
  postorderTraversalIterative,
} from './solution'

const { Paragraph } = Typography
const { TextArea } = Input

type TraversalType = 'preorder' | 'inorder' | 'postorder'
type Method = 'recursive' | 'iterative'

const traversalFunctions = {
  preorder: {
    recursive: preorderTraversalRecursive,
    iterative: preorderTraversalIterative,
  },
  inorder: {
    recursive: inorderTraversalRecursive,
    iterative: inorderTraversalIterative,
  },
  postorder: {
    recursive: postorderTraversalRecursive,
    iterative: postorderTraversalIterative,
  },
}

export const TreeTraversalComponent: React.FC = () => {
  const [form] = Form.useForm()
  const [results, setResults] = useState<{ [key: string]: number[] }>({})
  const [error, setError] = useState<string>('')

  const handleRun = (values: { array: string }) => {
    try {
      setError('')
      setResults({})

      const arr = JSON.parse(values.array)
      if (!Array.isArray(arr)) {
        throw new Error('输入必须是有效的数组格式')
      }
      const root = arrayToTree(arr)

      const newResults: { [key: string]: number[] } = {}
      for (const type in traversalFunctions) {
        for (const method in traversalFunctions[type as TraversalType]) {
          const func = traversalFunctions[type as TraversalType][method as Method]
          newResults[`${type}_${method}`] = func(root)
        }
      }
      setResults(newResults)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误或无法解析为树。')
      } else {
        setError('发生未知错误。')
      }
    }
  }

  return (
    <Card title="二叉树遍历 (前序、中序、后序)">
      <Paragraph>输入数组形式的二叉树，查看其三种深度优先遍历（递归与迭代）的结果。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: '[1,2,3,4,5,null,6]' }}
      >
        <Form.Item name="array" label="数组表示的二叉树">
          <TextArea rows={4} placeholder="例如: [1,null,2,3]" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            执行所有遍历
          </Button>
        </Form.Item>
      </Form>

      <Divider>遍历结果</Divider>
      {(Object.keys(results).length > 0 || error) && (
        <Space direction="vertical" style={{ width: '100%' }}>
          <List
            bordered
            dataSource={[
              { title: '前序 (递归)', data: results.preorder_recursive },
              { title: '前序 (迭代)', data: results.preorder_iterative },
              { title: '中序 (递归)', data: results.inorder_recursive },
              { title: '中序 (迭代)', data: results.inorder_iterative },
              { title: '后序 (递归)', data: results.postorder_recursive },
              { title: '后序 (迭代)', data: results.postorder_iterative },
            ]}
            renderItem={(item) => (
              <List.Item>
                <b>{item.title}:</b>&nbsp; [{item.data?.join(', ')}]
              </List.Item>
            )}
          />
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
