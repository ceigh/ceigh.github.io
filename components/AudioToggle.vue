<script setup lang="ts">
import { useDownUpAudio } from '@/utils/audio'
import { usePersistedState } from '@/utils/state'

const { playDown, playUp } = useDownUpAudio(
  '/assets/audio/btn-2-down.mp3',
  '/assets/audio/btn-2-up.mp3',
)

const isMuted = usePersistedState('isMuted', false)

function toggle(): void {
  isMuted.value = !isMuted.value
}

const isOff = useState('isOff', () => false)
</script>

<template>
  <div class="flex flex-col gap-1 items-center">
    <button
      type="button"
      class="group border-0.5 border-base-600/80 rounded-6px flex h-8 w-14 transition-shadow from-base-200 to-base-300 bg-linear-to-b shadow-btn-base active:shadow-none"
      aria-label="Toggle audio"
      @pointerdown="() => {
        toggle()
        playDown()
      }"
      @pointerup="playUp()"
      @keydown.enter="toggle()"
      @keydown.space="toggle()"
    >
      <div class="p-2px rounded-inherit h-full w-full relative bg-btn-border before:(rounded-inherit op-4 content-empty inset-0 absolute bg-noise)">
        <div class="rounded-4px flex h-full w-full items-center justify-center relative from-base-200 to-base-300 bg-linear-to-b before:(rounded-inherit op-12 content-empty inset-0 absolute bg-noise)">
          <div
            class="rounded-full w-3 aspect-ratio-1 transition z-1"
            :class="{
              'bg-base-700': isMuted || isOff,
              'shadow-btn-indicator-glow bg-base-50': !isMuted && !isOff,
            }"
          />
        </div>
      </div>
    </button>

    <i class="i-app:audio text-4.5" />
  </div>
</template>
