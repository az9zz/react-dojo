// src/interview/003-event-emitter/index.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Typography, Space, Divider, message } from 'antd'
import { EventEmitter } from './solution'

const { Paragraph, Text } = Typography

// 创建一个全局的 EventEmitter 实例，以便组件间通信
const eventBus = new EventEmitter()

// 模拟一个独立的组件
const SubscriberComponent: React.FC<{ id: number }> = ({ id }) => {
  const [lastMessage, setLastMessage] = useState<string>('还未收到消息')

  useEffect(() => {
    const handleMessage = (senderId: number, msg: string) => {
      if (id !== senderId) {
        // 不接收自己发的消息
        const receivedMsg = `收到来自组件 #${senderId} 的消息: "${msg}"`
        setLastMessage(receivedMsg)
        message.success(`组件 #${id} 收到消息!`)
      }
    }

    const handleOneTimeEvent = () => {
      const receivedMsg = '收到【一次性】广播！此消息只会出现一次。'
      setLastMessage(receivedMsg)
      message.info(`组件 #${id} 收到一次性消息!`)
    }

    // 订阅 'message' 事件
    eventBus.on('message', handleMessage)
    // 订阅 'one-time' 事件
    eventBus.once('one-time', handleOneTimeEvent)

    // 组件卸载时取消订阅，防止内存泄漏
    return () => {
      eventBus.off('message', handleMessage)
    }
  }, [id])

  const sendMessage = () => {
    const msg = `你好，我是组件 #${id}`
    eventBus.emit('message', id, msg)
  }

  return (
    <Card size="small" title={`订阅者组件 #${id}`}>
      <Paragraph>
        状态: <Text type="secondary">{lastMessage}</Text>
      </Paragraph>
      <Button onClick={sendMessage}>向其他组件发送消息</Button>
    </Card>
  )
}

export const EventEmitterComponent: React.FC = () => {
  const broadcastCount = useRef(0)

  const handleBroadcast = () => {
    broadcastCount.current += 1
    const msg = `这是第 ${broadcastCount.current} 次广播`
    eventBus.emit('message', 0, msg) // 假设广播来自 ID 0
  }

  const handleOneTimeBroadcast = () => {
    eventBus.emit('one-time')
  }

  return (
    <Card title="003. 事件中心 (Event Emitter)">
      <Paragraph>
        实现一个 `EventEmitter`
        类，用于实现发布-订阅模式。下面是两个独立的组件，它们通过一个共享的事件中心实例进行通信。
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <SubscriberComponent id={1} />
        <SubscriberComponent id={2} />
      </Space>
      <Divider />
      <Space>
        <Button type="primary" onClick={handleBroadcast}>
          全局广播消息
        </Button>
        <Button onClick={handleOneTimeBroadcast}>触发一次性事件</Button>
      </Space>
    </Card>
  )
}
