<script setup lang="ts">
const links = [
  {
    href: 'https://t.me/giceh',
    icon: 'i-app:telegram',
    ariaLabel: 'Telegram',
  },
  {
    href: 'https://github.com/ceigh',
    icon: 'i-app:github',
    ariaLabel: 'Github',
  },
]
</script>

<template>
  <div class="flex min-h-dvh">
    <main class="p-12 surface rounded-e-16 grow-1 relative before:(rounded-inherit content-empty inset-0 absolute surface-noise)">
      <div class="relative">
        <slot />
      </div>
    </main>

    <aside class="p-y-8 p-e-8 flex flex-col gap-6">
      <div class="flex grow-1 gap-6 items-end justify-between">
        <div class="bg-gray-500 self-center text-vertical">
          wheel
        </div>

        <div class="text-3xl tracking-tight uppercase text-vertical">
          Artem Lebzak
        </div>
      </div>

      <div class="text-5xl p-s-8 flex gap-2 items-center justify-end">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="l.ariaLabel"
          class="rounded-full flex active:scale-90"
        >
          <i :class="l.icon" />
        </a>
      </div>
    </aside>
  </div>
</template>
