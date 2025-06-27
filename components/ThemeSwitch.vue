<script setup lang="ts">
import { usePersistedState } from '@/utils/state'

const theme = usePersistedState('theme', 1)

onMounted((): void => {
  watch(theme, (value): void => {
    if (![0, 1, 2].includes(value)) {
      theme.value = 1
      return
    }

    const html = document.documentElement

    html.classList.remove('light', 'dark')

    if (0 === value) {
      html.classList.add('light')
    }
    else if (2 === value) {
      html.classList.add('dark')
    }
  }, { immediate: true })
})
</script>

<template>
  <div class="flex flex-col gap-2 w-16">
    <div class="bg-theme-switch-border p-1px rounded-full">
      <div class="shadow-theme-switch border-0.5 border-base-900/30 rounded-inherit flex relative from-base-400 to-base-500 bg-linear-to-b before:(rounded-inherit op-12 pointer-events-none content-empty inset-0 absolute bg-noise)">
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
          @click="theme = i - 1"
        />

        <div
          class="shadow-theme-switch-handle rounded-full flex h-100% aspect-ratio-1 pointer-events-none transition-transform items-center left-0 top-50% justify-center absolute from-base-300 to-base-400 bg-linear-to-b before:(rounded-inherit op-16 content-empty inset-0 absolute bg-noise)"
          :style="{
            transform: `translateY(-50%) translateX(${theme * 40}%)`,
          }"
        >
          <div class="shadow-theme-switch-handle-mark rounded-full w-50% aspect-ratio-1 z-1 from-primary-600 to-primary-400 bg-linear-to-br" />
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
