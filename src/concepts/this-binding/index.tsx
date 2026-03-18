// src/concepts/this-binding/index.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Card, Button, Typography, Space, Divider, Alert, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

// --- 示例一：四种绑定规则 ---
const BindingRulesExample = () => {
  const [result, setResult] = useState<string[]>([])
  const [active, setActive] = useState<string | null>(null)

  const runDefault = () => {
    setActive('default')
    const lines: string[] = []
    lines.push('=== 默认绑定 ===')
    lines.push('function foo() { return this }')
    lines.push('非严格模式: this → window/globalThis')
    lines.push('严格模式: this → undefined')
    setResult(lines)
  }

  const runImplicit = () => {
    setActive('implicit')
    const obj = {
      name: 'myObj',
      getName() {
        return this.name
      },
    }
    const lines: string[] = []
    lines.push('=== 隐式绑定 ===')
    lines.push('const obj = { name: "myObj", getName() { return this.name } }')
    lines.push(`obj.getName() → "${obj.getName()}"  // this → obj`)

    // fn() 在严格模式下 this 为 undefined，会抛错 —— 正好演示 this 丢失
    const fn = obj.getName
    let fnResult: string
    try {
      fnResult = fn()
    } catch {
      fnResult = 'TypeError! this 是 undefined'
    }
    lines.push(`const fn = obj.getName; fn() → "${fnResult}"  // ⚠️ this 丢失！`)
    lines.push('')
    lines.push('💡 将方法赋给变量后调用，隐式绑定丢失，this 变为 undefined（严格模式）。')
    setResult(lines)
  }

  const runExplicit = () => {
    setActive('explicit')
    function greet(this: any, greeting: string) {
      return `${greeting}, ${this.name}`
    }
    const person = { name: 'Alice' }
    const lines: string[] = []
    lines.push('=== 显式绑定 (call / apply / bind) ===')
    lines.push(`greet.call(person, "Hi") → "${greet.call(person, 'Hi')}"`)
    lines.push(`greet.apply(person, ["Hello"]) → "${greet.apply(person, ['Hello'])}"`)
    const bound = greet.bind(person, 'Hey')
    lines.push(`greet.bind(person, "Hey")() → "${bound()}"`)
    lines.push('bind 返回新函数，this 永久绑定，无法再被 call/apply 覆盖。')
    setResult(lines)
  }

  const runNew = () => {
    setActive('new')
    function Person(this: any, name: string) {
      this.name = name
    }
    const p = new (Person as any)('Bob')
    const lines: string[] = []
    lines.push('=== new 绑定 ===')
    lines.push('function Person(name) { this.name = name }')
    lines.push(`new Person("Bob").name → "${p.name}"`)
    lines.push('new 创建新对象 → this 指向该新对象')
    setResult(lines)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        JavaScript 中 <Text code>this</Text> 的值在函数调用时确定，有四种绑定规则，优先级：
        <Tag color="red">new</Tag> {'>'} <Tag color="orange">显式</Tag> {'>'}{' '}
        <Tag color="blue">隐式</Tag> {'>'} <Tag>默认</Tag>
      </Paragraph>
      <Space wrap>
        <Button type={active === 'default' ? 'primary' : 'default'} onClick={runDefault}>
          默认绑定
        </Button>
        <Button type={active === 'implicit' ? 'primary' : 'default'} onClick={runImplicit}>
          隐式绑定
        </Button>
        <Button type={active === 'explicit' ? 'primary' : 'default'} onClick={runExplicit}>
          显式绑定
        </Button>
        <Button type={active === 'new' ? 'primary' : 'default'} onClick={runNew}>
          new 绑定
        </Button>
      </Space>
      {result.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {result.join('\n')}
        </pre>
      )}
    </Space>
  )
}

// --- 示例二：箭头函数 vs 普通函数 ---
const ArrowVsNormalExample = () => {
  const [result, setResult] = useState<string[]>([])

  const runDemo = () => {
    const obj = {
      name: 'myObj',
      normal() {
        return this.name
      },
      arrow: () => {
        return (undefined as any)?.name ?? 'undefined (外层作用域)'
      },
    }

    const timer = {
      name: 'timer',
      startNormal() {
        return 'this → undefined (丢失了 timer 对象)'
      },
      startArrow() {
        // 箭头函数保留外层 this
        const getName = () => this.name
        return `this.name → "${getName()}" (箭头函数保留外层 this)`
      },
    }

    const lines: string[] = []
    lines.push('=== 对象方法中的 this ===')
    lines.push(`obj.normal() → "${obj.normal()}"  // this → obj ✅`)
    lines.push(`obj.arrow() → "${obj.arrow()}"  // this → 外层 ⚠️`)
    lines.push('')
    lines.push('=== 定时器回调中的 this ===')
    lines.push('普通函数做回调: ' + timer.startNormal())
    lines.push('箭头函数做回调: ' + timer.startArrow())
    lines.push('')
    lines.push('💡 箭头函数没有自己的 this，它继承定义时外层作用域的 this')

    setResult(lines)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        箭头函数没有自己的 <Text code>this</Text>，它从定义时的词法作用域继承 <Text code>this</Text>
        。这在回调中很有用，但不适合作为对象方法。
      </Paragraph>
      <Button type="primary" onClick={runDemo}>
        运行：箭头函数 vs 普通函数
      </Button>
      {result.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {result.join('\n')}
        </pre>
      )}
    </Space>
  )
}

// --- 示例三：React 中的 this ---
const ReactThisExample = () => {
  const [result, setResult] = useState<string[]>([])

  const runDemo = () => {
    const lines: string[] = []
    lines.push('=== React Class 组件中 this 丢失问题 ===')
    lines.push('')
    lines.push('class MyComponent extends React.Component {')
    lines.push('  handleClick() { console.log(this) }  // ⚠️ this 可能是 undefined')
    lines.push('  render() { return <button onClick={this.handleClick}>Click</button> }')
    lines.push('}')
    lines.push('')
    lines.push('原因：onClick={this.handleClick} 只是传递函数引用，this 隐式绑定丢失。')
    lines.push('')
    lines.push('--- 三种解决方案 ---')
    lines.push('')
    lines.push('方案 1：构造函数中 bind')
    lines.push('  constructor() { this.handleClick = this.handleClick.bind(this) }')
    lines.push('')
    lines.push('方案 2：class fields + 箭头函数（推荐）')
    lines.push('  handleClick = () => { console.log(this) }  // this 永远指向实例')
    lines.push('')
    lines.push('方案 3：JSX 中用箭头函数包裹')
    lines.push('  onClick={() => this.handleClick()}  // 每次渲染创建新函数，性能略差')
    lines.push('')
    lines.push('💡 函数组件使用 Hooks，不存在 this 问题，这也是推荐函数组件的原因之一。')

    setResult(lines)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        React class 组件中，事件处理器的 <Text code>this</Text> 容易丢失。函数组件 + Hooks
        从根本上避免了这个问题。
      </Paragraph>
      <Button type="primary" onClick={runDemo}>
        展示：React 中的 this 问题
      </Button>
      {result.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {result.join('\n')}
        </pre>
      )}
      <Alert message="推荐使用函数组件 + Hooks，彻底避免 this 相关问题。" type="success" />
    </Space>
  )
}

export const ThisBindingConceptComponent = () => {
  return (
    <Card title="核心概念: this 指向 (this Binding)">
      <Title level={4}>示例一：四种绑定规则</Title>
      <BindingRulesExample />
      <Divider />
      <Title level={4}>示例二：箭头函数 vs 普通函数</Title>
      <ArrowVsNormalExample />
      <Divider />
      <Title level={4}>示例三：React 中的 this</Title>
      <ReactThisExample />
    </Card>
  )
}
