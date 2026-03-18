// src/interview/008-array-to-tree/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Radio, Tree, Input } from 'antd'
import { type TreeNode, arrayToTreeByMap, arrayToTreeByRecursion } from './solution'
import type { DataNode } from 'antd/es/tree'

const { Paragraph } = Typography
const { TextArea } = Input

const initialArrayString = `
[
  { "id": 1, "parentId": null, "name": "Root" },
  { "id": 2, "parentId": 1, "name": "Child A" },
  { "id": 3, "parentId": 1, "name": "Child B" },
  { "id": 4, "parentId": 2, "name": "Grandchild A.1" },
  { "id": 5, "parentId": 3, "name": "Grandchild B.1" },
  { "id": 6, "parentId": 3, "name": "Grandchild B.2" }
]
`
// 创建一个递归函数来转换我们的 TreeNode 为 Antd 的 DataNode
function convertToDataNode(nodes: TreeNode[]): DataNode[] {
  return nodes.map((node) => ({
    ...node,
    key: node.id, // 明确添加 key 属性
    title: node.name, // 明确添加 title 属性
    children: node.children ? convertToDataNode(node.children) : [],
  }))
}

export const ArrayToTreeComponent = () => {
  const [form] = Form.useForm()
  const [treeData, setTreeData] = useState<DataNode[] | null>(null)
  const [error, setError] = useState<string>('')
  const [method, setMethod] = useState<'Map' | 'Recursion'>('Map')

  const handleRun = (values: { array: string }) => {
    try {
      setError('')
      setTreeData(null)

      const nodes = JSON.parse(values.array)
      if (!Array.isArray(nodes)) {
        throw new Error('输入必须是有效的JSON数组')
      }

      let result: TreeNode[]
      if (method === 'Map') {
        result = arrayToTreeByMap(nodes)
      } else {
        result = arrayToTreeByRecursion(nodes)
      }

      // 在 setState 之前进行数据转换
      const antdTreeData = convertToDataNode(result)
      setTreeData(antdTreeData)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('发生未知错误或输入格式不正确。')
      }
    }
  }

  return (
    <Card title="008. 数组转树形结构 (Array to Tree)">
      <Paragraph>将一个包含 `id` 和 `parentId` 的扁平数组转换为树形结构。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ array: initialArrayString }}
      >
        <Form.Item name="array" label="扁平数组 (JSON格式)">
          <TextArea rows={12} />
        </Form.Item>
        <Form.Item label="选择解法">
          <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
            <Radio.Button value="Map">Map 法 (O(n))</Radio.Button>
            <Radio.Button value="Recursion">递归法 (O(n²))</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            转换为树
          </Button>
        </Form.Item>
      </Form>

      <Divider>转换结果</Divider>
      {(treeData || error) && (
        <Space direction="vertical" className="w-full">
          {treeData && treeData.length > 0 && (
            // 使用 antd 的 Tree 组件来美观地展示结果
            <Tree
              showLine
              defaultExpandAll
              treeData={treeData}
              fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            />
          )}
          {treeData && treeData.length === 0 && <Alert message="转换结果为空树" type="info" />}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
