<script lang="ts" setup>
import { start, stop } from "./three"
</script>

<template>
  <three-container
    :start="start"
    :stop="stop"
    style="cursor: none;"
  />
</template>
