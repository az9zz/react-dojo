// src/leetcode/medium/102-binary-tree-level-order-traversal/index.tsx
import { useState, type FC } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Input } from 'antd'
import { TreeNode, arrayToTree, levelOrder } from './solution'
import SolutionCode from '../../../components/CodeBlock/SolutionCode'
import solutionCode from './solution.ts?raw'

const { Paragraph } = Typography
const { TextArea } = Input

// 一个简单的组件来递归渲染树
const TreeVisualizer: FC<{ node: TreeNode | null }> = ({ node }) => {
  if (!node) {
    return null
  }

  return (
    <div className="flex flex-col items-center m-2.5">
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          border: '1px solid #1890ff',
          width: 30,
          height: 30,
          backgroundColor: '#e6f7ff',
        }}
      >
        {node.val}
      </div>
      {(node.left || node.right) && (
        <div className="flex mt-2.5">
          <TreeVisualizer node={node.left} />
          <TreeVisualizer node={node.right} />
        </div>
      )}
    </div>
  )
}

export const LevelOrderTraversalComponent = () => {
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
      <div className="flex justify-center overflow-x-auto">
        {treeRoot ? <TreeVisualizer node={treeRoot} /> : <p>输入数组以生成树</p>}
      </div>

      <Divider>遍历结果</Divider>
      {(result || error) && (
        <Space direction="vertical" className="w-full">
          {result && (
            <Alert message={`层序遍历结果: ${JSON.stringify(result)}`} type="success" showIcon />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
      <SolutionCode code={solutionCode} />
    </Card>
  )
}
