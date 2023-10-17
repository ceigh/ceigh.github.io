<script setup lang="ts">
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
        Launch
      </button>
    </div>

    <div :class="$style.copy">
      <img
        alt="Bubbles fleuron"
        :class="$style.fleuron"
      >
      <p>
        <router-link to="/">
          Ceigh
        </router-link>
        2023
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
  background: hsl(45deg 37% 44% / 20%);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100dvh;
  padding: 10vmax 5vmax;
  color: hsl(var(--color-fg) / 70%);
  font-size: 1.3rem;
  font-family: Archivo-Regular, sans-serif;
  line-height: 1.4;
  text-align: center;

  & > * + * {
    margin-top: 10vmax;
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
  margin-bottom: 2rem;
}

.heading {
  margin: 0;
  margin-bottom: 0.1em;
  font-size: 6rem;
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
  margin: 0 0 2em;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0.4em 0.8em;
  color: inherit;
  font-size: 1.3em;
  background: none;
  border: none;
  border: 1px solid currentcolor;
  border-radius: 0.5em;

  &:hover {
    background: hsl(var(--color-fg) / 5%);
  }

  &:active {
    filter: brightness(80%);
  }
}

.fleuron {
  display: block;
  margin-bottom: 0.2em;
}

.copy {
  font-size: 0.7em;
  opacity: 0.5;

  & p {
    margin: 0;
  }
}
</style>
