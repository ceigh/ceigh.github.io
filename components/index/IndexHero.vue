<template>
  <div>
    <p class="hero-intro">
      Crafting sleek, accessible interfaces with clean code&nbsp;&mdash;
      where pixel-perfect visuals move with effortless rhythm.
    </p>

    <p class="hero-test">
      Test
    </p>
  </div>
</template>

<style scoped>
@import '@/assets/style/breakpoints.css';

.hero-intro {
  font-size: fluid(42, 24);

  @media (--screen-sm) {
    font-size: fluid(32, 16);
  }
}

.hero-test {
  font-size: fluid(32, 16);
}
</style>
