<script setup lang="ts">
const links = [
  {
    href: 'https://t.me/giceh',
    text: 'Telegram',
  },
  {
    href: 'https://github.com/ceigh',
    text: 'Github',
  },
]

const audioDownRef = useTemplateRef<HTMLAudioElement>('audioDownRef')
const audioUpRef = useTemplateRef<HTMLAudioElement>('audioUpRef')
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        target="_blank"
        rel="noopener noreferrer"
        class="group rounded-e-1 flex relative after:(rounded-inherit h-full w-2 content-empty right--2 absolute)"
        @pointerdown="audioDownRef?.play()"
        @pointerup="audioUpRef?.play()"
      >
        <span class="text-lg tracking-tighter text-center min-h-22 uppercase writing-sideways-lr">
          {{ l.text }}
        </span>

        <span class="m-e--2 m-s-2 rounded-inherit bg-gray-400 w-2 transition-width relative bg-btn-gradient-r before:(rounded-inherit content-empty inset-0 right-1px absolute bg-noise) group-active:w-1" />
      </a>
    </div>

    <audio ref="audioDownRef" hidden preload="auto">
      <source src="/assets/audio/btn-click-1-down.mp3" type="audio/mpeg">
    </audio>
    <audio ref="audioUpRef" hidden preload="auto">
      <source src="/assets/audio/btn-click-1-up.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>
