import { useEffect, type DependencyList } from 'react'

export function useDebounceEffect(fn: (...args: unknown[]) => void, waitTime = 0, deps: DependencyList = []) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn(...deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, fn, waitTime]) // Spread deps here to track individual values
}
