<script lang='ts' setup>
import { ref, onMounted, onUnmounted } from "vue"

const props = defineProps<{
  start(container: HTMLElement): Promise<void>,
  stop(): void,
}>()

const isLoading = ref(true)
const container = ref<null | HTMLElement>(null)

onMounted(async () => {
  if (!container.value) return
  await props.start(container.value)
  isLoading.value = false
})
onUnmounted(() => {
  props.stop()
})
</script>

<template>
  <div>
    <div
      v-show="isLoading"
      :class="$style.loader"
    >
      <span />
    </div>

    <div ref="container" />
  </div>
</template>

<style module>
@keyframes loader {
  0% {
    box-shadow: calc(-1.5 * var(--size)) 0 currentcolor inset;
  }

  100% {
    box-shadow: var(--size) 0 currentcolor inset;
  }
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: hsla(var(--color-fg) / 100%);
  background: hsla(var(--color-bg) / 100%);

  & span {
    --size: 3rem;

    display: block;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    animation: loader 1s ease-in-out infinite;
  }
}
</style>
