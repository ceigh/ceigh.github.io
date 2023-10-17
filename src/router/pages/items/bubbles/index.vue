<script setup lang="ts">
import { useCssModule } from "vue"
import { useHead } from "@unhead/vue"

useHead({
  title: "Bubbles",
  link: [
    {
      rel: "icon",
      href: "/items/bubbles/icon.png",
      type: "image/png",
    },
  ],
  htmlAttrs: {
    class: useCssModule().html,
  },
})
</script>

<template>
  <div :class="$style.container">
    <div>
      <img
        src="/items/bubbles/logo.png"
        :class="$style.logo"
        width="256"
        height="256"
      >

      <h1 :class="$style.heading">
        Bubbles
      </h1>

      <p :class="$style.intro">
        Unleash your imagination and inflate virtual soap bubbles in&nbsp;this
        immersive&nbsp;<a
          href="https://en.wikipedia.org/wiki/Augmented_reality"
          target="_blank"
        >AR</a>
        experiment.
      </p>

      <button
        type="button"
        :class="$style.btn"
      >
        <i-ai-augmented-reality />
        <span>View</span>
      </button>
    </div>

    <div :class="$style.copy">
      <i-fluent-bubble-multiple-20-regular :class="$style.fleuron" />
      <p>
        Made by
        <router-link to="/">
          Ceigh
        </router-link>
        in 2023
      </p>
    </div>
  </div>
</template>

<style module>
@font-face {
  font-weight: 600;
  font-family: ClashDisplay-Semibold;
  font-style: normal;
  src: url("/items/bubbles/ClashDisplay-Semibold.woff2") format("woff2");
  font-display: block;
}

@font-face {
  font-weight: 400;
  font-family: Archivo-Regular;
  font-style: normal;
  src: url("/items/bubbles/Archivo-Regular.woff2") format("woff2");
  font-display: swap;
}

::selection {
  background: hsl(var(--color-selection) / 20%);
}

:focus-visible {
  outline:
    2px
    solid
    hsl(var(--color-selection) / 100%);
  outline-offset: 2px;
}

.html {
  background: hsl(var(--color-fg) / 100%);
}

.container {
  --color-selection: 164deg 64% 24%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100dvh;
  padding: 8vmax 5vmax 5vmax;
  color: hsl(var(--color-fg) / 70%);
  font-size: 1.3rem;
  font-family: Archivo-Regular, sans-serif;
  line-height: 1.4;
  text-align: center;
  background:
    linear-gradient(
      hsl(var(--color-bg) / 100%) 50%,
      hsl(var(--color-bg) / 97%)
    );

  & > * + * {
    margin-top: 5vmax;
  }

  & a {
    display: inline-flex;
    color: hsl(var(--color-fg) / 100%);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.logo {
  width: auto;
  height: clamp(12rem, 13vw, 16rem);
  margin-bottom: 2rem;
  object-fit: contain;
}

.heading {
  margin: 0;
  margin-bottom: 0.1em;
  font-size: clamp(4rem, 9vw, 6rem);
  font-family: ClashDisplay-Semibold, sans-serif;
  line-height: 1;
  background:
    linear-gradient(
      hsl(var(--color-fg) / 90%) 60%,
      hsl(var(--color-fg) / 20%)
    );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro {
  max-width: 40ch;
  margin: 0 0 1.4em;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0.47em 0.94em;
  color: hsl(var(--color-bg) / 100%);
  font-size: 1.2rem;
  line-height: 1.18;
  background: hsl(var(--color-fg) / 100%);
  border: none;
  border-radius: 0.47em;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  & > * + * {
    margin-left: 0.4em;
  }

  &:hover {
    background: hsl(var(--color-fg) / 80%);
  }

  &:active {
    filter: brightness(80%);
  }
}

.fleuron {
  margin-bottom: 0.3em;
  font-size: 1.8em;
}

.copy {
  font-size: 0.7em;
  opacity: 0.5;

  & p {
    margin: 0;
  }
}
</style>
