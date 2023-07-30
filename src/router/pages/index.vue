<template>
  <div>
    <main :class="$style.main">
      <h1 :class="$style.title">
        Ceigh
      </h1>

      <gallery />
    </main>

    <footer :class="$style.footer">
      <div :class="$style.contacts">
        <a
          href="https://github.com/ceigh"
          target="_blank"
          aria-label="GitHub"
        >
          <i-si-github />
        </a>
        <a
          href="https://t.me/giceh"
          target="_blank"
          aria-label="Telegram"
        >
          <i-si-telegram />
        </a>
        <a
          href="mailto:giceh@ya.ru"
          aria-label="Email"
        >
          <i-si-maildotru />
        </a>
      </div>
    </footer>
  </div>
</template>

<style>
@font-face {
  font-family: Magilio;
  font-display: block;
  src: url("/fonts/Magilio/MagilioRegular.otf") format("opentype");
}
</style>

<style module>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  margin: 0;
  color: hsl(var(--color-white));
  font-size: clamp(8rem, 17vw, 20rem);
  font-family: Magilio, serif;
  line-height: 1;
  letter-spacing: -0.02em;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  pointer-events: none;
}

.footer {
  padding: 4rem 2rem;
  text-align: center;
}

.contacts {
  display: flex;
  gap: 0.8em;
  justify-content: center;
  font-size: 1.5rem;

  & a {
    display: flex;
    padding: 0.35em;
    border-radius: 0.5em;

    @media (hover: hover) {
      &:hover {
        background: hsla(var(--color-fg) / 10%);
      }
    }
  }
}
</style>
