// src/interview/002-deep-clone/index.tsx
import { useState } from 'react'
import { Card, Input, Button, Typography, Form, Alert, Space, Divider, Radio } from 'antd'
import { deepCloneJSON, deepCloneRecursive, deepCloneFull } from './solution'

const { Paragraph } = Typography
const { TextArea } = Input

type Method = 'JSON' | 'Recursive' | 'Full'

const initialObjectString = `
(function() {
  const obj = {
    num: 1,
    str: 'hello',
    bool: true,
    arr: [1, { a: 2 }, 3],
    date: new Date(),
    regexp: /test/gi,
    func: function() { console.log('func'); },
    undef: undefined,
    nul: null,
    map: new Map([['key1', 'value1']]),
    set: new Set([1, 2, 3])
  };
  // 添加循环引用
  obj.self = obj;
  return obj;
})()
`

export const DeepCloneComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [method, setMethod] = useState<Method>('Full')

  const handleRun = (values: { object: string }) => {
    try {
      setError('')
      setResult('')

      //   const originalObj = new Function(`return ${values.object}`)()
      const originalObj = eval(values.object)

      let clonedObj
      switch (method) {
        case 'JSON':
          clonedObj = deepCloneJSON(originalObj)
          break
        case 'Recursive':
          clonedObj = deepCloneRecursive(originalObj)
          break
        case 'Full':
          clonedObj = deepCloneFull(originalObj)
          break
        default:
          throw new Error('未知的拷贝方法')
      }

      // 为了在UI上展示，我们需要将结果对象字符串化
      // 使用自定义的 replacer 来处理循环引用和特殊类型
      const replacer = () => {
        const cache = new Set()
        return (_key: string, value: unknown) => {
          if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
              return '[Circular]'
            }
            cache.add(value)
          }
          if (typeof value === 'function') {
            return `[Function: ${value.name || 'anonymous'}]`
          }
          return value
        }
      }
      setResult(JSON.stringify(clonedObj, replacer(), 2))
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('发生未知错误或输入格式不正确。')
      }
    }
  }

  return (
    <Card title="002. 深拷贝 (Deep Clone)">
      <Paragraph>实现一个可以处理多种数据类型和循环引用的深拷贝函数。</Paragraph>
      <Form
        form={form}
        onFinish={handleRun}
        layout="vertical"
        initialValues={{ object: initialObjectString }}
      >
        <Form.Item name="object" label="源对象 (以 IIFE 形式输入)">
          <TextArea rows={12} placeholder="输入一个返回对象的立即执行函数表达式" />
        </Form.Item>
        <Form.Item label="选择解法">
          <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
            <Radio.Button value="JSON">JSON (简陋版)</Radio.Button>
            <Radio.Button value="Recursive">递归 (处理循环引用)</Radio.Button>
            <Radio.Button value="Full">递归 (完整版)</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            运行拷贝
          </Button>
        </Form.Item>
      </Form>

      {(result || error) && (
        <Space direction="vertical" className="w-full">
          <Divider>拷贝结果 (字符串化展示)</Divider>
          {result && (
            <pre className="bg-[#f6f8fa] p-4 rounded-md whitespace-pre-wrap">
              <code>{result}</code>
            </pre>
          )}
          {error && <Alert message={error} type="error" showIcon />}
        </Space>
      )}
    </Card>
  )
}
