import { usePersistedState } from '@/utils/state'

export function useAudio(src: string): () => Promise<void> {
  const isMuted = usePersistedState('isMuted', false)

  const audio = ref<HTMLAudioElement>()

  onMounted((): void => {
    audio.value = new Audio(src)
    audio.value.preload = 'auto'
  })

  async function play(): Promise<void> {
    if (!isMuted.value) {
      await audio.value?.play()
    }
  }

  return play
}
