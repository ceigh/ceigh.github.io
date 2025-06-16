import { MAX_PRECISION } from './const'
import { LruCache } from './lru-cache'

const CACHE_CAPACITY = 1024
const cache = new LruCache<string>(CACHE_CAPACITY)

export function fluidCssValue(maxPx = '', minPx = ''): string {
  const cacheKey = `${maxPx},${minPx}`
  const cachedValue = cache.get(cacheKey) ?? ''
  if ('' !== cachedValue) {
    return cachedValue
  }

  if ('' === maxPx) {
    throw new TypeError('max should be provided')
  }
  const maxPxNum = Number(maxPx)
  if (Number.isNaN(maxPxNum)) {
    throw new TypeError('max should be a number')
  }

  if ('' === minPx) {
    return `${maxPxNum}px`
  }
  const minPxNum = Number(minPx)
  if (Number.isNaN(minPxNum)) {
    throw new TypeError('min should be a number')
  }

  const VW = 100
  const SCREEN = 1920
  const vwNum = (VW * maxPxNum / SCREEN).toFixed(MAX_PRECISION)

  const value = `clamp(${minPxNum}px, ${vwNum}vw, ${maxPxNum}px)`

  cache.set(cacheKey, value)

  return value
}
