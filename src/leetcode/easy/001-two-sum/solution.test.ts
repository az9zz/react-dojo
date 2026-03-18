import { describe, it, expect } from 'vitest'
import { twoSum } from './solution'

describe('twoSum', () => {
  it('should return indices of two numbers that add up to target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
  })

  it('should work with negative numbers', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2])
  })

  it('should return empty array if no solution exists', () => {
    expect(twoSum([1, 2, 3], 100)).toEqual([])
  })

  it('should handle duplicate values', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1])
  })
})
