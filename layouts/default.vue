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
  padding-inline: fluid(64, 24);
  max-inline-size: 1920px;
  min-block-size: 100dvh;
}

.layout-main {
  flex-grow: 1;
}
</style>
