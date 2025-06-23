<script setup lang="ts">
import { useAudio } from '@/utils/audio'
import { usePersistedState } from '@/utils/state'

const isMuted = usePersistedState('isMuted', false)

function toggle(): void {
  isMuted.value = !isMuted.value
}

const playAudioDown = useAudio('/assets/audio/btn-click-3-down.mp3')
const playAudioUp = useAudio('/assets/audio/btn-click-3-up.mp3')
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <div class="text-sm uppercase">
      Audio
    </div>

    <button
      type="button"
      class="group border-0.5 border-gray-600/80 rounded-6px flex w-18 aspect-ratio-1.6 transition-shadow from-gray-200 to-gray-300 bg-linear-to-b shadow-btn-base active:shadow-none"
      aria-label="Toggle sound"
      @pointerdown="() => {
        toggle()
        playAudioDown()
      }"
      @pointerup="playAudioUp()"
      @keypress.enter="toggle()"
      @keypress.space="toggle()"
    >
      <div class="p-2px rounded-inherit h-full w-full relative bg-btn-border before:(rounded-inherit op-6 content-empty inset-0 absolute bg-noise)">
        <div class="rounded-4px flex h-full w-full items-center justify-center relative from-gray-200 to-gray-300 bg-linear-to-b before:(rounded-inherit op-12 content-empty inset-0 absolute bg-noise)">
          <div
            class="rounded-full w-4 aspect-ratio-1 transition z-1"
            :class="{
              'bg-gray-700': isMuted,
              'shadow-btn-indicator-glow bg-white': !isMuted,
            }"
          />
        </div>
      </div>
    </button>
  </div>
</template>
