<script setup lang="ts">
const faces = 12
const degPerFace = 360 / faces
const heightPx = 160
const heightPerFace = Math.PI * heightPx / faces
</script>

<template>
  <div
    class="w-10 perspective-1000px"
    :style="{
      height: `${heightPx}px`,
    }"
  >
    <div class="h-full w-full transform-3d inset-0 absolute">
      <div class="h-full w-full transform-3d inset-0 absolute animate-wheel-spin animate-iteration-infinite animate-duration-60s!">
        <div
          v-for="i in faces"
          :key="i"
          class="bg-gray h-1px w-full transform-origin-cc transform-3d left-0 top-50% absolute"
          :style="{
            height: `${heightPerFace}px`,
            transform: `rotateX(${(i - 1) * degPerFace}deg) translateZ(5rem)`,
          }"
        />
      </div>
    </div>
  </div>
</template>
