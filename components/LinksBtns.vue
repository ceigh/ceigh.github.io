<script setup lang="ts">
import { useDownUpAudio } from '@/utils/audio'

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

const { playDown, playUp } = useDownUpAudio(
  '/assets/audio/btn-1-down.mp3',
  '/assets/audio/btn-1-up.mp3',
)
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <a
        v-for="l in links"
        :key="l.text"
        :href="l.href"
        target="_blank"
        rel="noopener noreferrer"
        class="group rounded-e-1 flex items-center relative after:(rounded-inherit h-full w-2 content-empty right--2 top-0 absolute)"
        @pointerdown="playDown()"
        @pointerup="playUp()"
      >
        <span class="text-sm uppercase writing-sideways-lr">
          {{ l.text }} ↗
        </span>

        <span class="m-e--2 m-s-2 rounded-inherit bg-base-400 h-19 w-2 transition-width relative bg-btn-gradient-r before:(rounded-inherit op-18 content-empty inset-0 right-1px absolute bg-noise) group-active:w-1" />
      </a>
    </div>
  </div>
</template>
