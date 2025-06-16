const DEFAULT_CAPACITY = 256

export class LruCache<T = unknown> {
  private cache: Map<string, T>
  private capacity: number

  constructor(capacity = DEFAULT_CAPACITY) {
    capacity = Math.round(capacity)
    const ZERO = 0
    if (ZERO >= capacity) {
      throw new RangeError('capacity must be more than zero')
    }

    this.cache = new Map()
    this.capacity = capacity
  }

  get(key: string): T | undefined {
    if (!this.cache.has(key)) {
      return
    }

    // Move the accessed item to the end of the Map (most recent)
    const value = this.cache.get(key)
    if ('undefined' === typeof value) {
      throw new TypeError('value is empty')
    }
    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  set(key: string, value: T): void {
    // Remove the key if it already exists
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    // If at capacity, remove the first (oldest) item
    if (this.cache.size === this.capacity) {
      const firstKey = this.cache.keys().next().value ?? ''
      if ('' === firstKey) {
        throw new TypeError('cache firstKey is empty')
      }
      this.cache.delete(firstKey)
    }

    this.cache.set(key, value)
  }
}
