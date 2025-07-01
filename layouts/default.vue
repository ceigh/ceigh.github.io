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

        <PixelScreen>
          <slot />
        </PixelScreen>

        <div class="p-x-14 p-b-7 flex gap-7 items-center justify-between">
          <FooterMarkings />
          <ThemeSwitch />
        </div>
      </div>

      <LinksBtns class="bottom-40 right-0 absolute z-10" />

      <PowerBtn class="bottom-full left-14 absolute" />
    </main>
  </div>
</template>
