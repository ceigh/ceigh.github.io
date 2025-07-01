<script setup lang="ts">
import { useAudio } from '@/utils/audio'
import { usePersistedState } from '@/utils/state'

const THEMES = [0, 1, 2] as const
type Theme = typeof THEMES[number]

const theme = usePersistedState<Theme>('theme', 1)

onMounted((): void => {
  watch(theme, (value): void => {
    if (!THEMES.includes(value)) {
      theme.value = 1
      return
    }

    const html = document.documentElement

    html.classList.remove('light', 'dark')

    if (value === 0) {
      html.classList.add('light')
    }
    else if (value === 2) {
      html.classList.add('dark')
    }
  }, { immediate: true })
})

const { play: playAudio } = useAudio('/assets/audio/btn-2-down.mp3')

function setTheme(value: Theme): void {
  theme.value = value
  playAudio()
}
</script>

<template>
  <div class="flex flex-col gap-2 w-16">
    <div class="p-1px rounded-full bg-theme-switch-border">
      <div class="border-0.5 border-base-900/30 rounded-inherit flex relative from-base-400 to-base-500 bg-linear-to-b shadow-theme-switch before:(rounded-inherit op-12 pointer-events-none content-empty inset-0 absolute bg-noise)">
        <button
          v-for="i in 3"
          :key="i"
          type="button"
          class="grow-1 aspect-ratio-0.6"
          :class="{
            'rounded-l-full': i === 1,
            'rounded-r-full': i === 3,
          }"
          :aria-label="['Light theme', 'System theme', 'Dark theme'][i - 1]"
          @click="setTheme(i - 1 as Theme)"
        />

        <div
          class="rounded-full flex h-100% aspect-ratio-1 pointer-events-none transition-transform items-center left-0 top-50% justify-center absolute from-base-300 to-base-400 bg-linear-to-b shadow-theme-switch-handle before:(rounded-inherit op-16 content-empty inset-0 absolute bg-noise)"
          :style="{
            transform: `translateY(-50%) translateX(${theme * 40}%)`,
          }"
        >
          <div class="rounded-full w-50% aspect-ratio-1 z-1 from-primary-600 to-primary-400 bg-linear-to-br shadow-theme-switch-handle-mark" />
        </div>
      </div>
    </div>

    <div class="text-lg p-x-1 flex items-center justify-between">
      <i class="i-app:sun" />
      <i class="i-app:auto" />
      <i class="i-app:moon" />
    </div>
  </div>
</template>
