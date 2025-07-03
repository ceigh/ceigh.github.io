<script setup lang="ts">
import { useDownUpAudio } from '@/utils/audio'

const links = [
  {
    href: 'https://t.me/giceh',
    text: 'TG',
  },
  {
    href: 'https://github.com/ceigh',
    text: 'GH',
  },
]

const { playDown, playUp } = useDownUpAudio(
  '/assets/audio/btn-1-down.mp3',
  '/assets/audio/btn-1-up.mp3',
)
</script>

<template>
  <div>
    <div class="flex gap-4">
      <a
        v-for="l in links"
        :key="l.text"
        :href="l.href"
        target="_blank"
        rel="noopener noreferrer"
        class="group rounded-b-1 flex flex-col items-center relative after:(rounded-inherit h-2 w-full content-empty bottom--2 left-0 absolute)"
        @pointerdown="playDown()"
        @pointerup="playUp()"
      >
        <span class="text-xs uppercase">
          {{ l.text }} ↗
        </span>

        <span class="m-b--2 m-t-2 rounded-inherit bg-base-400 h-2 w-12 transition-height relative bg-btn-gradient-r before:(rounded-inherit op-16 content-empty inset-0 bottom-1px absolute bg-noise) group-active:h-1" />
      </a>
    </div>
  </div>
</template>
