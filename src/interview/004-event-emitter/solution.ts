// src/interview/003-event-emitter/solution.ts

// 定义监听器函数的类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = (...args: any[]) => void

export class EventEmitter {
  // 使用 Map 来存储事件，key 是事件名，value 是监听器数组
  private events: Map<string, Listener[]>

  constructor() {
    this.events = new Map()
  }

  /**
   * 订阅事件
   * @param eventName 事件名称
   * @param listener 监听器函数
   */
  public on(eventName: string, listener: Listener): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }
    this.events.get(eventName)?.push(listener)
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emit(eventName: string, ...args: any[]): void {
    const listeners = this.events.get(eventName)
    if (listeners) {
      // 遍历并执行所有监听器
      // 使用 slice() 创建一个副本，防止在监听器中修改原始数组导致问题
      listeners.slice().forEach((listener) => {
        listener(...args)
      })
    }
  }

  /**
   * 取消订阅
   * @param eventName 事件名称
   * @param listener 要移除的监听器函数
   */
  public off(eventName: string, listener: Listener): void {
    const listeners = this.events.get(eventName)
    if (listeners) {
      const filteredListeners = listeners.filter((l) => l !== listener)
      // 更新事件的监听器数组
      this.events.set(eventName, filteredListeners)
    }
  }

  /**
   * 订阅一次性事件
   * @param eventName 事件名称
   * @param listener 监听器函数
   */
  public once(eventName: string, listener: Listener): void {
    // 创建一个包装函数
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onceWrapper = (...args: any[]) => {
      // 执行原始监听器
      listener(...args)
      // 立即移除自身
      this.off(eventName, onceWrapper)
    }

    // 订阅这个包装函数
    this.on(eventName, onceWrapper)
  }
}
