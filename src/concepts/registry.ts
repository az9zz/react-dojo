import type { ConceptEntry } from '@/types/registry'
import { ClosureConceptComponent } from './closure'

export const conceptsRegistry: ConceptEntry[] = [
  {
    id: 'closure',
    title: '闭包',
    category: 'JavaScript 核心概念',
    component: ClosureConceptComponent,
  },
]
