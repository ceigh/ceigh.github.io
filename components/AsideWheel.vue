<script setup lang="ts">
const faces = 64
const degPerFace = 360 / faces
const heightRem = 10
const heightPerFaceRem = Math.PI * heightRem / faces
const animationDurSec = 60
const animationDelayPerFaceSec = animationDurSec / faces
</script>

<template>
  <div
    class="rounded-r-md flex w-9 perspective-1080px perspective-origin-center overflow-hidden after:(rounded-inherit content-empty inset-0 absolute shadow-wheel)"
    :style="{
      height: `${heightRem}rem`,
    }"
  >
    <div class="h-full w-full transform-3d inset-0 absolute">
      <div
        class="h-full w-full transform-3d inset-0 absolute animate-wheel-spin animate-iteration-infinite"
        :style="{
          'animation-duration': `${animationDurSec}s`,
        }"
      >
        <div
          v-for="i in faces"
          :key="i"
          class="rounded-xs bg-base w-full transform-3d left-0 absolute animate-wheel-light animate-iteration-infinite shadow-wheel-face before:(rounded-inherit op-12 content-empty inset-0 absolute bg-noise)"
          :style="{
            'height': `${heightPerFaceRem}rem`,
            'top': `calc(50% - ${heightPerFaceRem / 2}rem)`,
            'transform': `rotateX(${(i - 1) * degPerFace}deg) translateZ(5rem)`,
            'animation-duration': `${animationDurSec}s`,
            'animation-delay': `${(i - 1) * animationDelayPerFaceSec}s`,
          }"
        />
      </div>
    </div>
  </div>
</template>
