<script setup lang="ts">
import { useDownUpAudio } from '@/utils/audio'

const { playDown, playUp } = useDownUpAudio(
  '/assets/audio/btn-2-down.mp3',
  '/assets/audio/btn-2-up.mp3',
)

const isOff = useState('isOff', () => false)

function toggle(): void {
  isOff.value = !isOff.value
}
</script>

<template>
  <button
    type="button"
    :aria-label="isOff ? 'Turn on' : 'Turn off'"
    class="group m-b--6 rounded-t-sm flex flex-col gap-2 items-center after:(rounded-inherit h-4 w-full content-empty bottom-6 left-0 absolute)"
    @pointerdown="() => {
      toggle()
      playDown()
    }"
    @pointerup="playUp()"
    @keydown.enter="toggle()"
    @keydown.space="toggle()"
  >
    <div
      class="rounded-inherit bg-red w-10 transition-height bg-power-btn shadow-power-btn group-active:h-1"
      :class="{
        'h-2': !isOff,
        'h-4': isOff,
      }"
    />

    <div class="text-xs uppercase">
      Power
    </div>
  </button>
</template>
