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
  <div class="flex flex-col gap-2 w-18">
    <div class="shadow-theme-switcher border-0.5 border-gray-900/30 rounded-full flex relative from-gray-400 to-gray-500 bg-linear-to-b before:(rounded-inherit op-12 pointer-events-none content-empty inset-0 absolute bg-noise)">
      <button
        v-for="i in 3"
        :key="i"
        type="button"
        class="grow-1 aspect-ratio-1"
        :class="{
          'rounded-l-full': i === 1,
          'rounded-r-full': i === 3,
        }"
        :aria-label="['Light theme', 'System theme', 'Dark theme'][i - 1]"
        @click="theme = i - 1"
      />

      <div
        class="rounded-full bg-red h-100% aspect-ratio-1 pointer-events-none transition-transform left-0 top-50% absolute dark:bg-green"
        :style="{
          transform: `translateY(-50%) translateX(${theme * 100}%)`,
        }"
      />
    </div>

    <div class="text-lg flex items-center justify-between">
      <i class="i-app:sun" />
      <i class="i-app:auto" />
      <i class="i-app:moon" />
    </div>
  </div>
</template>
