<script setup lang="ts">
const isOff = useState('isOff', () => false)
</script>

<template>
  <div class="p-x-12 p-b-4 p-t-7 grow-1 overflow-hidden">
    <div
      class="text-2xl font-mono p-2px rounded-8px h-full transition-box-shadow overflow-hidden bg-screen-border"
      :class="{
        'shadow-screen-glow-on': !isOff,
        'shadow-screen-glow-off': isOff,
      }"
    >
      <div class="border-0.5px border-slate-500 rounded-6px bg-blue-100 h-full overflow-hidden bg-screen-grid">
        <div class="p-4 h-full overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
