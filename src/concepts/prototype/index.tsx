// src/concepts/prototype/index.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Card, Button, Typography, Space, Divider, Alert } from 'antd'

const { Title, Paragraph, Text } = Typography

// --- 示例一：原型链查找 ---
const PrototypeChainExample = () => {
  const [result, setResult] = useState<string[]>([])

  const runDemo = () => {
    function Person(this: any, name: string) {
      this.name = name
    }
    ;(Person as any).prototype.sayHello = function () {
      return `Hello, I'm ${this.name}`
    }

    const alice = new (Person as any)('Alice')
    const lines: string[] = []

    // hasOwnProperty vs in
    lines.push(`Object.hasOwn(alice, 'name') → ${Object.hasOwn(alice, 'name')}  // 自身属性`)
    lines.push(
      `Object.hasOwn(alice, 'sayHello') → ${Object.hasOwn(alice, 'sayHello')}  // 不是自身属性`,
    )
    lines.push(`'sayHello' in alice → ${'sayHello' in alice}  // 原型链上能找到`)
    lines.push(`'toString' in alice → ${'toString' in alice}  // Object.prototype 上的方法`)

    lines.push('')
    lines.push('--- 原型链 ---')
    lines.push(
      `alice.__proto__ === Person.prototype → ${Object.getPrototypeOf(alice) === (Person as any).prototype}`,
    )
    lines.push(
      `Person.prototype.__proto__ === Object.prototype → ${Object.getPrototypeOf((Person as any).prototype) === Object.prototype}`,
    )
    lines.push(
      `Object.prototype.__proto__ === null → ${Object.getPrototypeOf(Object.prototype) === null}`,
    )

    setResult(lines)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        JavaScript 对象通过 <Text code>__proto__</Text>（即 <Text code>[[Prototype]]</Text>
        ）链条查找属性：<Text code>obj → Constructor.prototype → Object.prototype → null</Text>。
      </Paragraph>
      <Button type="primary" onClick={runDemo}>
        运行：原型链查找对比
      </Button>
      {result.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {result.join('\n')}
        </pre>
      )}
    </Space>
  )
}

// --- 示例二：继承对比 ---
const InheritanceExample = () => {
  const [result, setResult] = useState<string[]>([])

  const runDemo = () => {
    // ES6 class 方式
    class Animal {
      name: string
      constructor(name: string) {
        this.name = name
      }
      speak() {
        return `${this.name} makes a sound`
      }
    }
    class Dog extends Animal {
      bark() {
        return `${this.name} barks`
      }
    }

    // 手动原型链方式
    function AnimalOld(this: any, name: string) {
      this.name = name
    }
    AnimalOld.prototype.speak = function () {
      return `${this.name} makes a sound`
    }
    function DogOld(this: any, name: string) {
      AnimalOld.call(this, name)
    }
    DogOld.prototype = Object.create(AnimalOld.prototype)
    DogOld.prototype.constructor = DogOld
    DogOld.prototype.bark = function () {
      return `${this.name} barks`
    }

    const dog1 = new Dog('Buddy')
    const dog2 = new (DogOld as any)('Max')

    const lines: string[] = []
    lines.push('=== class extends 方式 ===')
    lines.push(`dog1.speak() → "${dog1.speak()}"`)
    lines.push(`dog1.bark() → "${dog1.bark()}"`)
    lines.push(`dog1 instanceof Dog → ${dog1 instanceof Dog}`)
    lines.push(`dog1 instanceof Animal → ${dog1 instanceof Animal}`)

    lines.push('')
    lines.push('=== Object.create 手动方式 ===')
    lines.push(`dog2.speak() → "${dog2.speak()}"`)
    lines.push(`dog2.bark() → "${dog2.bark()}"`)
    lines.push(`dog2 instanceof DogOld → ${dog2 instanceof DogOld}`)
    lines.push(`dog2 instanceof AnimalOld → ${dog2 instanceof AnimalOld}`)

    lines.push('')
    lines.push('两种方式本质相同，class 只是语法糖！')

    setResult(lines)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        <Text code>class extends</Text> 本质上是通过原型链实现继承的语法糖，与手动{' '}
        <Text code>Object.create</Text> 效果相同。
      </Paragraph>
      <Button type="primary" onClick={runDemo}>
        运行：继承对比
      </Button>
      {result.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {result.join('\n')}
        </pre>
      )}
    </Space>
  )
}

// --- 示例三：修改原型的危险 ---
const DangerousPrototypeExample = () => {
  const [result, setResult] = useState<string[]>([])

  const runDemo = () => {
    function Robot(this: any, name: string) {
      this.name = name
    }

    const robot1 = new (Robot as any)('R2D2')
    const robot2 = new (Robot as any)('C3PO')

    const lines: string[] = []

    lines.push('创建 robot1 和 robot2 后，给 Robot.prototype 添加 fly 方法：')
    lines.push(`robot1.fly → ${typeof (robot1 as any).fly}  // 还不存在`)

    // 动态添加方法
    ;(Robot as any).prototype.fly = function () {
      return `${this.name} is flying!`
    }

    lines.push('')
    lines.push('添加 Robot.prototype.fly 之后：')
    lines.push(`robot1.fly() → "${(robot1 as any).fly()}"`)
    lines.push(`robot2.fly() → "${(robot2 as any).fly()}"`)
    lines.push('')
    lines.push('⚠️ 已有实例也能访问新方法，因为查找是动态沿原型链进行的！')

    setResult(lines)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Paragraph>
        动态修改 <Text code>prototype</Text>{' '}
        会影响所有已创建的实例，因为属性查找是实时沿原型链进行的。
      </Paragraph>
      <Button type="primary" onClick={runDemo}>
        运行：动态修改原型
      </Button>
      {result.length > 0 && (
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, fontSize: 13 }}>
          {result.join('\n')}
        </pre>
      )}
      <Alert
        message="生产环境中应避免修改内置对象（如 Array.prototype）的原型，这可能导致不可预料的副作用。"
        type="warning"
      />
    </Space>
  )
}

export const PrototypeConceptComponent = () => {
  return (
    <Card title="核心概念: 原型与原型链 (Prototype Chain)">
      <Title level={4}>示例一：原型链查找</Title>
      <PrototypeChainExample />
      <Divider />
      <Title level={4}>示例二：继承对比</Title>
      <InheritanceExample />
      <Divider />
      <Title level={4}>示例三：修改原型的危险</Title>
      <DangerousPrototypeExample />
    </Card>
  )
}
