import type { ConceptEntry } from '@/types/registry'
import { ClosureConceptComponent } from './closure'
import { PrototypeConceptComponent } from './prototype'
import { AsyncConceptComponent } from './async'
import { ThisBindingConceptComponent } from './this-binding'
import { EventLoopConceptComponent } from './event-loop'

export const conceptsRegistry: ConceptEntry[] = [
  {
    id: 'closure',
    title: '闭包',
    category: 'JavaScript 核心概念',
    component: ClosureConceptComponent,
  },
  {
    id: 'prototype',
    title: '原型与原型链',
    category: 'JavaScript 核心概念',
    component: PrototypeConceptComponent,
  },
  {
    id: 'async',
    title: '异步：Promise 与 async/await',
    category: 'JavaScript 核心概念',
    component: AsyncConceptComponent,
  },
  {
    id: 'this-binding',
    title: 'this 指向',
    category: 'JavaScript 核心概念',
    component: ThisBindingConceptComponent,
  },
  {
    id: 'event-loop',
    title: '事件循环',
    category: 'JavaScript 核心概念',
    component: EventLoopConceptComponent,
  },
]
