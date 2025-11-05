# 003. Event Emitter (事件中心)

## 题目描述

实现一个 `EventEmitter` 类，它需要包含以下几个核心方法：

1.  `on(eventName, listener)`: 订阅一个事件。当该事件被触发时，执行对应的 `listener` (回调函数)。同一个事件可以有多个监听器。
2.  `emit(eventName, ...args)`: 触发一个事件。所有订阅了该事件的监听器都应该被调用，并且可以接收到 `emit` 时传入的参数。
3.  `off(eventName, listener)`: 取消订阅。移除指定事件的某个特定监听器。
4.  `once(eventName, listener)`: 订阅一个一次性的事件。监听器在被调用一次后，应该被自动移除。

## 设计思路

事件中心的核心是一个存储事件和监听器的数据结构。一个 `Map` 或者一个普通对象是理想的选择，用来存储事件名称 (key) 和一个由该事件的所有监听器函数组成的数组 (value)。

- **数据结构**: `events = { eventName1: [listener1, listener2], eventName2: [listener3] }`

### `on(eventName, listener)`

1. 检查 `events` 中是否存在 `eventName` 这个 key。
2. 如果不存在，创建一个新的数组 `[listener]` 作为 value。
3. 如果存在，直接将 `listener` push 到对应的数组中。

### `emit(eventName, ...args)`

1. 检查 `events` 中是否存在 `eventName` 这个 key。
2. 如果存在，遍历对应的监听器数组。
3. 对数组中的每一个 `listener`，使用 `...args` 作为参数来调用它 (`listener(...args)`)。

### `off(eventName, listener)`

1. 检查 `events` 中是否存在 `eventName` 这个 key。
2. 如果存在，找到对应的监听器数组。
3. 在数组中找到指定的 `listener` 并将其移除。可以使用 `Array.prototype.filter` 创建一个不包含该监听器的新数组，或者使用 `findIndex` 和 `splice` 来原地修改数组。

### `once(eventName, listener)`

这是一个巧妙的方法，它通常是基于 `on` 和 `off` 来实现的。

1. 创建一个新的**包装函数** `onceWrapper`。
2. 在 `onceWrapper` 内部，首先调用原始的 `listener`，然后立即调用 `off` 方法来移除 `onceWrapper` 自身。
3. 使用 `on` 方法来订阅 `eventName`，但监听器是 `onceWrapper` 而不是原始的 `listener`。

为了让 `off` 能够正确移除 `onceWrapper`，我们需要将原始的 `listener` 和包装后的 `onceWrapper` 关联起来，以便在调用 `off(eventName, originalListener)` 时也能找到并移除对应的 `onceWrapper`。

## 复杂度分析

- **`on`**: O(1)。
- **`emit`**: O(k)，其中 k 是订阅该事件的监听器数量。
- **`off`**: O(k)，需要遍历监听器数组来找到要移除的函数。
