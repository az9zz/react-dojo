import type { InterviewEntry } from '@/types/registry'
import { ArrayFlattenComponent } from './001-array-flatten'
import { FunctionCurryingComponent } from './002-function-currying'
import { DeepCloneComponent } from './003-deep-clone'
import { EventEmitterComponent } from './004-event-emitter'
import { PromisePoolComponent } from './005-promise-concurrency-control'
import { SortVersionsComponent } from './006-sort-version-numbers'
import { DebounceThrottleComponent } from './008-debounce-throttle'
import { ClosureInLoopComponent } from './009-closure-in-loop'
import { ArrayToTreeComponent } from './010-array-to-tree'
import { ArrayReverseComponent } from './011-array-reverse'

export const interviewRegistry: InterviewEntry[] = [
  { id: '001', title: '数组扁平化', category: 'JavaScript 基础', component: ArrayFlattenComponent },
  {
    id: '002',
    title: '函数柯里化',
    category: 'JavaScript 基础',
    component: FunctionCurryingComponent,
  },
  { id: '003', title: '深拷贝', category: 'JavaScript 基础', component: DeepCloneComponent },
  { id: '004', title: '事件发射器', category: 'JavaScript 基础', component: EventEmitterComponent },
  { id: '006', title: '版本号排序', category: 'JavaScript 基础', component: SortVersionsComponent },
  {
    id: '009',
    title: '循环中的闭包',
    category: 'JavaScript 基础',
    component: ClosureInLoopComponent,
  },
  {
    id: '010',
    title: '数组转树形结构',
    category: 'JavaScript 基础',
    component: ArrayToTreeComponent,
  },
  { id: '011', title: '数组翻转', category: 'JavaScript 基础', component: ArrayReverseComponent },
  {
    id: '005',
    title: 'Promise 并发控制',
    category: 'JavaScript 异步与流程控制',
    component: PromisePoolComponent,
  },
  {
    id: '008',
    title: '防抖与节流',
    category: 'JavaScript 性能优化',
    component: DebounceThrottleComponent,
  },
]
