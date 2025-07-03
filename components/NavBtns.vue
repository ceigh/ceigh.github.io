<script setup lang="ts">
import { useDownUpAudio } from '@/utils/audio'

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

const { playDown, playUp } = useDownUpAudio(
  '/assets/audio/btn-1-down.mp3',
  '/assets/audio/btn-1-up.mp3',
)
</script>

<template>
  <div>
    <nav class="flex flex-col gap-6">
      <a
        v-for="l in links"
        :key="l.text"
        :href="l.href"
        class="group rounded-s-0.4 flex flex-row-reverse items-center relative after:(rounded-inherit h-full w-2 content-empty left--2 top-0 absolute)"
        @pointerdown="playDown()"
        @pointerup="playUp()"
      >
        <span class="text-xs uppercase writing-sideways-rl">
          {{ l.text }}
        </span>

        <span class="m-e-2 m-s--2 rounded-inherit bg-base-400 h-6 w-2 transition-width relative bg-btn-gradient-l shadow-btn-l before:(op-6 content-empty inset-0 absolute bg-noise) group-active:w-1" />
      </a>
    </nav>
  </div>
</template>
