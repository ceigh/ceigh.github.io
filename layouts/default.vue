<template>
  <div class="p-18 flex justify-center h-dvh">
    <main class="p-t-8 surface rounded-4xl grow-1 min-h-720px relative before:(rounded-inherit op-12 content-empty inset-0 absolute bg-noise)">
      <NavBtns class="translate-y--50% left-0 top-50% absolute z-10" />

      <AsideWheel class="left-full top-46 absolute z--1" />

      <div class="flex flex-col h-full relative overflow-hidden">
        <div class="p-x-14 flex gap-14 items-center justify-between">
          <NuxtLink to="/">
            <h1 class="text-3xl tracking-tight uppercase">
              C31–GH
            </h1>
          </NuxtLink>

          <div class="flex gap-7 items-center justify-end">
            <AudioToggle />

            <img
              src="/assets/img/speaker.svg"
              alt="Speaker"
              width="90"
              height="90"
              class="w-21 aspect-ratio-1 object-contain"
            >
          </div>
        </div>

        <div class="p-x-14 p-y-7 grow-1 overflow-hidden">
          <div class="text-3xl font-mono p-2px rounded-8px h-full overflow-hidden bg-screen-border shadow-screen-border shadow-screen-glow">
            <div class="border-0.5px border-slate-500 rounded-6px bg-blue-100 h-full overflow-hidden bg-screen-grid">
              <div class="p-6 h-full overflow-y-auto">
                <slot />
              </div>
            </div>
          </div>
        </div>

        <div class="p-x-14 p-b-7 flex gap-7 items-center justify-between">
          <div class="text-base-600 flex flex-col gap-2 items-end">
            <div class="text-4xl flex gap-2">
              <i class="i-app:cc" aria-label="Creative Commons" />
              <i class="i-app:accessibility" aria-label="Accesibility" />
              <i class="i-app:no-ai" aria-label="No AI" />
              <i class="i-app:open-source" aria-label="Open source" />
            </div>

            <div class="text-0.5rem uppercase">
              2025 Made in Russia
            </div>
          </div>

          <ThemeSwitch />
        </div>
      </div>

      <LinksBtns class="bottom-40 right-0 absolute z-10" />
    </main>
  </div>
</template>
