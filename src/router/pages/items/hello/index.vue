<script lang="ts" setup>
import { useHead } from "@unhead/vue"
import { start, stop } from "./three"

useHead({
  htmlAttrs: {
    style: "overscroll-behavior: none; overflow: hidden;",
  },
})
</script>

<template>
  <three-container
    :start="start"
    :stop="stop"
    style="cursor: none;"
  />
</template>
