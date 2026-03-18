# React Dojo — 前端演武场

一个交互式前端学习与练习平台，用于学习、实践和巩固前端核心知识。

## 技术栈

| 层面   | 技术                                   |
| ------ | -------------------------------------- |
| 框架   | React 19 + TypeScript                  |
| 构建   | Vite (rolldown-vite)                   |
| UI     | Ant Design 5 + Tailwind CSS 4          |
| 路由   | React Router 7                         |
| 测试   | Vitest                                 |
| 规范   | ESLint + Prettier + Husky + Commitlint |
| 包管理 | pnpm                                   |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 运行测试
pnpm test
```

## 内容模块

### 核心概念 (`/concepts`)

JavaScript 核心概念的交互式演示：

| 知识点       | 内容                                           |
| ------------ | ---------------------------------------------- |
| 闭包         | 私有变量、函数柯里化、React Hooks 闭包陷阱     |
| 原型与原型链 | 原型链查找、继承对比、动态修改原型             |
| 异步         | Promise 链式调用、async/await 语法糖、错误处理 |
| this 指向    | 四种绑定规则、箭头函数对比、React 中的 this    |
| 事件循环     | 宏/微任务、setTimeout(0) 真相、可视化动画      |

### LeetCode 题解 (`/leetcode`)

算法题的可视化解题过程：

**简单 (Easy)**：两数之和、有效的括号、合并两个有序链表、二叉树中序遍历、环形链表、反转链表、二分查找

**中等 (Medium)**：无重复字符最长子串、三数之和、合并区间、二叉树层序遍历、LRU 缓存、岛屿数量、最长递增子序列、回文子串、排序数组

### 面试题 (`/interview`)

经典前端面试题的实现与演示：

| 分类            | 题目                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| JavaScript 基础 | 数组扁平化、函数柯里化、深拷贝、事件发射器、版本号排序、循环中的闭包、数组转树、数组翻转 |
| 异步与流程控制  | Promise 并发控制                                                                         |
| 性能优化        | 防抖与节流                                                                               |

## 项目结构

```
src/
├── components/          # 共享组件（布局、分类导航、分区标题）
├── pages/               # 页面组件（懒加载）
├── concepts/            # 核心概念模块
│   ├── registry.ts      # 概念注册表
│   └── <topic>/         # 每个知识点一个文件夹
├── leetcode/            # LeetCode 题解模块
│   ├── registry.ts
│   ├── easy/
│   └── medium/
├── interview/           # 面试题模块
│   ├── registry.ts
│   └── <nnn>-<name>/    # 每道题一个文件夹
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
└── routes/              # 路由配置
```

**架构模式**：每个模块使用 Registry 模式，通过注册表数组驱动页面渲染，所有页面支持懒加载和分类导航。
