// src/leetcode/medium/102-binary-tree-level-order-traversal/index.tsx
import React, { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Input } from 'antd'
import { TreeNode, arrayToTree, levelOrder } from './solution'

const { Paragraph } = Typography
const { TextArea } = Input

// 一个简单的组件来递归渲染树
const TreeVisualizer: React.FC<{ node: TreeNode | null }> = ({ node }) => {
  if (!node) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
      <div
        style={{
          border: '1px solid #1890ff',
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e6f7ff',
        }}
      >
        {node.val}
      </div>
      {(node.left || node.right) && (
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <TreeVisualizer node={node.left} />
          <TreeVisualizer node={node.right} />
        </div>
      )}
    </div>
  )
}

export const LevelOrderTraversalComponent: React.FC = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number[][] | null>(null)
  const [treeRoot, setTreeRoot] = useState<TreeNode | null>(null)
  const [error, setError] = useState<string>('')

  const handleRun = (values: { array: string }) => {
    try {
      setError('')
      setResult(null)

      const arr = JSON.parse(values.array)
      if (!Array.isArray(arr)) {
        throw new Error('输入必须是有效的数组格式')
      }

      const root = arrayToTree(arr)
      setTreeRoot(root)

      const solutionResult = levelOrder(root)
      setResult(solutionResult)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误或无法解析为树。')
      } else {
        setError('发生未知错误。')
      }
    }
  }

  return (
    <Card title="102. 二叉树的层序遍历 (Binary Tree Level Order Traversal)">
      <Paragraph>使用广度优先搜索 (BFS) 对二叉树进行逐层遍历。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: '[3,9,20,null,null,15,7]' }}
      >
        <Form.Item name="array" label="数组表示的二叉树">
          <TextArea rows={4} placeholder="例如: [3,9,20,null,null,15,7]" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            执行层序遍历
          </Button>
        </Form.Item>
      </Form>

      <Divider>可视化树结构 (简化版)</Divider>
      <div style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
        {treeRoot ? <TreeVisualizer node={treeRoot} /> : <p>输入数组以生成树</p>}
      </div>

      <Divider>遍历结果</Divider>
      {(result || error) && (
        <Space direction="vertical" style={{ width: '100%' }}>
          {result && (
            <Alert message={`层序遍历结果: ${JSON.stringify(result)}`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
