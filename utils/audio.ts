import { usePersistedState } from '@/utils/state'

export function useAudio(src: string, throttleMs = 50): {
  audio: Ref<HTMLAudioElement | undefined>
  isPlaying: Ref<boolean>
  play: () => void
} {
  const isMuted = usePersistedState('isMuted', false)
  const audio = ref<HTMLAudioElement>()
  const isPlaying = ref(false)

  onMounted((): void => {
    audio.value = new Audio(src)
    audio.value.preload = 'auto'
    audio.value.volume = 0.5
  })

  function play(): void {
    if (!audio.value || isMuted.value || isPlaying.value) {
      return
    }

    isPlaying.value = true
    setTimeout(() => {
      isPlaying.value = false
    }, throttleMs)

    audio.value.pause()
    audio.value.currentTime = 0
    void audio.value?.play()
  }

  return {
    audio,
    isPlaying,
    play,
  }
}

// Play up audio only after down ends
export function useDownUpAudio(srcDown: string, srcUp: string): {
  playDown: () => void
  playUp: () => void
} {
  const {
    isPlaying: isPlayingDown,
    play: playAudioDown,
    audio: audioDown,
  } = useAudio(srcDown)
  const { play: playAudioUp } = useAudio(srcUp)

  onUnmounted((): void => {
    audioDown.value?.removeEventListener('ended', playAudioUp)
  })

  function playUp(): void {
    if (isPlayingDown.value) {
      if (audioDown.value) {
        audioDown.value.addEventListener('ended', playAudioUp, { once: true })
      }
    }
    else {
      playAudioUp()
    }
  }

  return {
    playDown: playAudioDown,
    playUp,
  }
}
