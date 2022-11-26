<script lang="ts" setup>
import { ref, onMounted } from "vue"

const getRandInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

function getRandColor () {
  const h = getRandInt(0, 360)
  const s = getRandInt(42, 98)
  const l = getRandInt(40, 90)
  return `hsl(${h}, ${s}%, ${l}%)`
}

const size = ref(["10vmax", "10vmax"])
const borderRadius = ref("100%")
const skew = ref(["0deg", "0deg"])
const rotate = ref("0deg")
const colors = ref(["#fff", "#fff"])
const stopPos = ref("0%")
const gradientPos = ref(["50%", "50%"])
const blur = ref("1vmax")

function generate () {
  size.value = [...Array(2)].map(() => `${getRandInt(20, 50)}%`)
  borderRadius.value = [...Array(2)].map(() => [...Array(4)]
    .map(() => `${getRandInt(20, 100)}%`).join(" ")).join(" / ")
  skew.value = [...Array(2)].map(() => `${getRandInt(-15, 15)}deg`)
  rotate.value = `${getRandInt(-15, 15)}deg`
  colors.value = [...Array(2)].map(getRandColor)
  stopPos.value = `${getRandInt(0, 50)}%`
  gradientPos.value = [...Array(2)].map(() => `${getRandInt(-100, 100)}%`)
  blur.value = `${getRandInt(2, 3)}vmax`
}
onMounted(generate)
</script>

<template>
  <div :class="$style.container">
    <div
      :class="$style.spot"
      :style="{
        '--w': size[0],
        '--h': size[1],
        '--border-radius': borderRadius,
        '--skew-x': skew[0],
        '--skew-y': skew[1],
        '--rotate': rotate,
        '--color-1': colors[0],
        '--color-2': colors[1],
        '--stop-pos': stopPos,
        '--g-x': gradientPos[0],
        '--g-y': gradientPos[1],
        '--blur': blur,
      }"
      @click="generate()"
    />
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}

.spot {
  --w: 10vmax;
  --h: 10vmax;
  --border-radius: 100%;
  --skew-x: 0deg;
  --skew-y: 0deg;
  --rotate: 0deg;
  --color-1: #fff;
  --color-2: #fff;
  --stop-pos: 0%;
  --g-x: 50%;
  --g-y: 50%;
  --blur: 1vmax;
  --scale: 1;

  width: var(--w);
  height: var(--h);
  background-image:
    radial-gradient(
      circle at var(--g-x) var(--g-y),
      var(--color-1) var(--stop-pos),
      var(--color-2),
      rgb(0 0 0 / 0%)
    );
  border-radius: var(--border-radius);
  transform:
    scale(var(--scale))
    skew(var(--skew-x), var(--skew-y))
    rotate(var(--rotate));
  cursor: pointer;
  filter: blur(var(--blur));
  transition: 0.2s ease-in-out, border 0s;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      --scale: 1.05;
    }
  }

  &:active {
    --scale: 0.95;
  }
}
</style>
