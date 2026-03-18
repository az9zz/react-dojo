import type { FC } from 'react'

export interface LeetCodeEntry {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  component: FC
}

export interface InterviewEntry {
  id: string
  title: string
  category: string
  component: FC
}

export interface ConceptEntry {
  id: string
  title: string
  category: string
  component: FC
}
