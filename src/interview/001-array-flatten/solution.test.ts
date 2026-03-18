import { describe, it, expect } from 'vitest'
import {
  flattenByFlat,
  flattenByRecursion,
  flattenByReduce,
  flattenByStack,
  flattenByToString,
} from './solution'

describe('array flatten', () => {
  const input = [1, [2, [3, [4]], 5]]
  const expected = [1, 2, 3, 4, 5]

  it('flattenByFlat should flatten deeply nested arrays', () => {
    expect(flattenByFlat(input)).toEqual(expected)
  })

  it('flattenByRecursion should flatten deeply nested arrays', () => {
    expect(flattenByRecursion(input)).toEqual(expected)
  })

  it('flattenByReduce should flatten deeply nested arrays', () => {
    expect(flattenByReduce(input)).toEqual(expected)
  })

  it('flattenByStack should flatten deeply nested arrays', () => {
    expect(flattenByStack(input)).toEqual(expected)
  })

  it('flattenByToString should flatten number arrays', () => {
    expect(flattenByToString([1, [2, [3, [4]], 5]])).toEqual(expected)
  })

  it('should handle empty arrays', () => {
    expect(flattenByRecursion([])).toEqual([])
  })

  it('should handle already flat arrays', () => {
    expect(flattenByRecursion([1, 2, 3])).toEqual([1, 2, 3])
  })
})
