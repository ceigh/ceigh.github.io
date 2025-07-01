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
    class="group m-b--7 rounded-t-md flex flex-col gap-2 items-center after:(rounded-inherit h-6 w-full content-empty bottom-7 left-0 absolute)"
    @pointerdown="() => {
      toggle()
      playDown()
    }"
    @pointerup="playUp()"
    @keydown.enter="toggle()"
    @keydown.space="toggle()"
  >
    <div
      class="rounded-inherit bg-red w-10 transition-height bg-power-btn shadow-power-btn group-active:h-2"
      :class="{
        'h-3': !isOff,
        'h-6': isOff,
      }"
    />

    <div class="text-sm uppercase">
      Power
    </div>
  </button>
</template>
