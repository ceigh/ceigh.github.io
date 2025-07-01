export function usePersistedState<T = unknown>(
  key: string,
  defaultValue: T,
): Ref<T> {
  key = `app:${key}`

  const state = useState(key, (): T => defaultValue)

  onMounted((): void => {
    const item = localStorage.getItem(key)
    if (null !== item) {
      try {
        state.value = JSON.parse(item) as T
      }
      catch (error) {
        console.error(error)
        localStorage.removeItem(key)
      }
    }

    watch(state, (value): void => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      }
      catch (error) {
        console.error(error)
      }
    })
  })

  return state
}
