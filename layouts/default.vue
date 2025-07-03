<template>
  <div class="p-8 flex min-h-720px items-center justify-center h-dvh">
    <main class="surface rounded-3xl grow-1 h-full max-h-1080px max-w-720px relative before:(rounded-inherit op-12 content-empty inset-0 absolute bg-noise)">
      <NavBtns class="translate-y--50% left-0 top-50% absolute z-10" />

      <div class="flex flex-col h-full relative overflow-hidden">
        <div class="p-x-12 p-t-8 flex gap-0 items-center justify-between">
          <NuxtLink to="/">
            <h1 class="text-2xl tracking-tight uppercase">
              C31–GH
            </h1>
          </NuxtLink>

          <div class="flex gap-0 items-center justify-end" />
        </div>

        <PixelScreen>
          <slot />
        </PixelScreen>

        <div class="p-x-12 p-b-4 flex gap-4 items-center">
          <ThemeSwitch />

          <AudioToggle />
        </div>
      </div>

      <LinksBtns class="bottom-0 right-12 absolute z-10" />

      <PowerBtn class="bottom-full right-12 absolute" />

      <FooterMarkings class="translate-y-50% bottom-25% right-0 absolute" />

      <AsideWheel class="translate-y--50% left-full top-25% absolute z--1" />
    </main>
  </div>
</template>
