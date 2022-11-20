<script lang="ts" setup>
import { items } from "../items"
</script>

<template>
  <div :class="$style.grid">
    <router-link
      v-for="i in items"
      :key="i"
      :to="`/${i}`"
    >
      <img
        :src="`/covers/${i}.jpg`"
        alt=""
      >
    </router-link>
  </div>
</template>

<style module>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8em;
  justify-content: center;
  max-width: 120rem;
  padding: 0.8em;

  & a {
    flex-basis: 12em;
    height: 12em;
    overflow: hidden;
    border-radius: 3em;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.04);
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
