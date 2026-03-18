// src/leetcode/easy/021-merge-two-sorted-lists/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Space, Divider, Input } from 'antd'
import { arrayToList, listToArray, mergeTwoLists, mergeSortedArray } from './solution'

const { Title } = Typography

export const MergeSortedComponent = () => {
  const [form] = Form.useForm()
  const [listResult, setListResult] = useState<number[] | null>(null)
  const [arrayResult, setArrayResult] = useState<number[] | null>(null)
  const [error, setError] = useState<string>('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRun = (values: any) => {
    try {
      setError('')
      // --- 处理链表 ---
      const arr1 = JSON.parse(values.list1)
      const arr2 = JSON.parse(values.list2)
      const list1 = arrayToList(arr1)
      const list2 = arrayToList(arr2)
      const mergedList = mergeTwoLists(list1, list2)
      setListResult(listToArray(mergedList))

      // --- 处理数组 ---
      const nums1_str = values.nums1.match(/\[(.*?)\]/)[1]
      const nums1 = JSON.parse(`[${nums1_str}]`)
      const m = parseInt(values.m, 10)
      const nums2 = JSON.parse(values.nums2)
      const n = nums2.length
      // 确保 nums1 有足够空间
      const nums1_with_space = [...nums1.slice(0, m), ...Array(n).fill(0)]
      mergeSortedArray(nums1_with_space, m, nums2, n)
      setArrayResult(nums1_with_space)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '输入格式错误，请检查。')
      } else {
        setError('发生未知错误。')
      }
    }
  }

  return (
    <Card title="21 & 88. 合并有序链表和有序数组">
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{
          list1: '[1,2,4]',
          list2: '[1,3,4]',
          nums1: '[1,2,3,0,0,0]',
          m: '3',
          nums2: '[2,5,6]',
        }}
      >
        <Title level={4}>#21. 合并两个有序链表</Title>
        <Form.Item name="list1" label="链表1 (数组格式)">
          <Input />
        </Form.Item>
        <Form.Item name="list2" label="链表2 (数组格式)">
          <Input />
        </Form.Item>

        <Divider />

        <Title level={4}>#88. 合并两个有序数组</Title>
        <Form.Item name="nums1" label="数组1 (包含预留空间)">
          <Input />
        </Form.Item>
        <Space>
          <Form.Item name="m" label="数组1有效元素个数">
            <Input style={{ width: '80px' }} />
          </Form.Item>
          <Form.Item name="nums2" label="数组2">
            <Input />
          </Form.Item>
        </Space>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            执行合并
          </Button>
        </Form.Item>
      </Form>

      <Divider>运行结果</Divider>
      {(listResult || arrayResult || error) && (
        <Space direction="vertical" style={{ width: '100%' }}>
          {listResult && (
            <Alert message={`链表合并结果: [${listResult.join(', ')}]`} type="success" />
          )}
          {arrayResult && (
            <Alert message={`数组合并结果: [${arrayResult.join(', ')}]`} type="success" />
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
