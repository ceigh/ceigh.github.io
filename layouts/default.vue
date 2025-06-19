<template>
  <div class="layout">
    <main class="layout-surface">
      <slot />
    </main>

    <aside class="layout-aside">
      <div class="layout-aside-start">
        <div class="layout-wheel">
          wheel
        </div>

        <div class="layout-name">
          Artem Lebzak
        </div>
      </div>

      <div class="">
        icons
      </div>
    </aside>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.layout-surface {
}

.layout-aside {
}

.layout-aside-start {
}

.layout-wheel {
}

.layout-name {
}

.layout-socials {
}
</style>
