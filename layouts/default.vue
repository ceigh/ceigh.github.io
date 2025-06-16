<template>
  <div class="layout layout-limited">
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
  min-block-size: 100dvh;
}

.layout-limited {
  max-inline-size: 1920px;
}

.layout-main {
  flex-grow: 1;
}
</style>
