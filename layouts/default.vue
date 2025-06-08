<template>
  <div class="layout">
    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1920px;
  min-height: 100dvh;
}

.layout-main {
  flex-grow: 1;
}
</style>
