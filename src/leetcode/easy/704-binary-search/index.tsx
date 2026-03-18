// src/leetcode/easy/704-binary-search/index.tsx
import { useState } from 'react'
import { Card, Button, Typography, Form, Alert, Divider, InputNumber, Tag } from 'antd'
// import { binarySearch_closed } from './solution'

const { Paragraph } = Typography

interface Step {
  left: number
  right: number
  mid: number
  message: string
}

const sortedArray = Array.from({ length: 20 }, (_, i) => i * 3 - 20) // [-20, -17, ..., 37]

export const BinarySearchComponent = () => {
  const [form] = Form.useForm()
  const [result, setResult] = useState<number | null>(null)
  const [searchSteps, setSearchSteps] = useState<Step[]>([])
  const [target, setTarget] = useState<number>(9)

  const runSearch = (values: { target: number }) => {
    setResult(null)
    setTarget(values.target)
    const steps: Step[] = []

    let left = 0
    let right = sortedArray.length - 1

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)
      const currentStep: Step = { left, right, mid, message: '' }

      if (sortedArray[mid] === values.target) {
        currentStep.message = `找到 target! nums[${mid}] === ${values.target}`
        steps.push(currentStep)
        setResult(mid)
        setSearchSteps(steps)
        return
      } else if (sortedArray[mid] < values.target) {
        currentStep.message = `nums[${mid}] (${sortedArray[mid]}) < ${values.target}, 搜索右半部分`
        left = mid + 1
      } else {
        currentStep.message = `nums[${mid}] (${sortedArray[mid]}) > ${values.target}, 搜索左半部分`
        right = mid - 1
      }
      steps.push(currentStep)
    }

    setResult(-1)
    setSearchSteps(steps)
  }

  return (
    <Card title="704. 二分查找 (Binary Search)">
      <Paragraph>在一个有序数组中查找一个元素。下面将可视化展示查找过程。</Paragraph>
      <Paragraph>
        <b>示例数组:</b> [{sortedArray.join(', ')}]
      </Paragraph>
      <Form form={form} onFinish={runSearch} layout="inline" initialValues={{ target: 9 }}>
        <Form.Item name="target" label="目标值 Target">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            开始查找
          </Button>
        </Form.Item>
      </Form>

      <Divider>查找过程可视化</Divider>
      <div className="font-mono text-base leading-8">
        {searchSteps.map((step, index) => (
          <div key={index} className="mb-2.5">
            <div>
              <b>Step {index + 1}:</b> {step.message}
            </div>
            <div>
              {sortedArray.map((num, i) => (
                <Tag
                  key={i}
                  color={
                    i === step.mid
                      ? 'red'
                      : i === step.left || i === step.right
                        ? 'blue'
                        : i > step.left && i < step.right
                          ? 'geekblue'
                          : 'default'
                  }
                  className="min-w-8 text-center"
                >
                  {num}
                </Tag>
              ))}
            </div>
            <div className="mt-1.5">
              <Tag color="blue">Left: {step.left}</Tag>
              <Tag color="blue">Right: {step.right}</Tag>
              <Tag color="red">Mid: {step.mid}</Tag>
            </div>
          </div>
        ))}
      </div>

      <Divider>最终结果</Divider>
      {result !== null && (
        <Alert
          message={
            result === -1 ? `未找到目标值 ${target}` : `成功! 目标值 ${target} 的索引是 ${result}`
          }
          type={result === -1 ? 'warning' : 'success'}
          showIcon
        />
      )}
    </Card>
  )
}
