<script setup lang="ts">
const links = [
  {
    href: '/#story',
    text: 'Story',
  },
  {
    href: '/#work',
    text: 'Work',
  },
  {
    href: '/#chat',
    text: 'Chat',
  },
]

const audioDownRef = useTemplateRef<HTMLAudioElement>('audioDownRef')
const audioUpRef = useTemplateRef<HTMLAudioElement>('audioUpRef')
</script>

<template>
  <div>
    <nav class="flex flex-col gap-6">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        class="group rounded-s-0.5 flex flex-row-reverse items-center relative after:(rounded-inherit h-full w-2 content-empty left--2 absolute)"
        @pointerdown="audioDownRef?.play()"
        @pointerup="audioUpRef?.play()"
      >
        <span class="text-sm uppercase writing-sideways-rl">
          {{ l.text }}
        </span>

        <span class="m-e-2 m-s--2 rounded-inherit bg-gray-400 h-6 w-2 transition-width relative bg-btn-gradient-l shadow-btn-l group-active:w-1 before:(content-empty inset-0 absolute bg-noise)" />
      </a>
    </nav>

    <audio ref="audioDownRef" hidden preload="auto">
      <source src="/assets/audio/btn-click-2-down.mp3" type="audio/mpeg">
    </audio>
    <audio ref="audioUpRef" hidden preload="auto">
      <source src="/assets/audio/btn-click-2-up.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>
