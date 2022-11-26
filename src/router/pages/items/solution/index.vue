<script lang="ts" setup>
const items = [
  "solution",
  "que",
  "friday",
  "lanos",
  "smile",
  "garamond",
  "prevention",
]
</script>

<template>
  <div :class="$style.container">
    <img
      v-for="i in items"
      :key="i"
      :src="`/items/solution/${i}.png`"
      loading="lazy"
      :class="$style.img"
    >
  </div>
</template>

<style module>
.container {
  background: hsl(var(--color-white));
}

.img {
  width: 100%;
}
</style>
