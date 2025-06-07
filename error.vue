<script setup lang="ts">
defineProps<{
  error: {
    data: unknown
    description: string
    message: string
    statusCode: number
    statusMessage: string
    url: string
  }
}>()
</script>

<template>
  <div>
    {{ error.message }}
  </div>
</template>
