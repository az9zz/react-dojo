import { describe, it, expect } from 'vitest'
import { LRUCache } from './solution'

describe('LRUCache', () => {
  it('should get and put values correctly', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    expect(cache.get(1)).toBe(1)
  })

  it('should evict least recently used item when capacity is exceeded', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    cache.put(3, 3) // evicts key 1
    expect(cache.get(1)).toBe(-1)
    expect(cache.get(3)).toBe(3)
  })

  it('should update value for existing key', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(1, 10)
    expect(cache.get(1)).toBe(10)
  })

  it('should return -1 for missing keys', () => {
    const cache = new LRUCache(1)
    expect(cache.get(999)).toBe(-1)
  })

  it('should mark accessed items as recently used', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    cache.get(1) // access key 1, making key 2 the LRU
    cache.put(3, 3) // evicts key 2
    expect(cache.get(2)).toBe(-1)
    expect(cache.get(1)).toBe(1)
  })
})
