<template>
  <div class="p-18 flex justify-center h-dvh">
    <main class="p-t-8 surface rounded-12 grow-1 min-h-720px relative before:(rounded-inherit content-empty inset-0 absolute bg-noise)">
      <Nav class="translate-y--50% left-0 top-50% absolute z-10" />

      <Wheel class="left-full top-46 absolute" />

      <div class="flex flex-col h-full relative overflow-hidden">
        <div class="p-x-14 flex gap-7 items-center justify-between">
          <h1 class="text-3xl tracking-tight uppercase">
            C31–GH
          </h1>

          <img
            src="/assets/img/speaker.svg"
            alt="Speaker"
            width="90"
            height="90"
            class="w-21 aspect-ratio-1 object-contain"
          >
        </div>

        <div class="p-14 p-t-7 grow-1 overflow-hidden">
          <div class="text-3xl font-mono p-2px rounded-8px h-full overflow-hidden bg-screen-border shadow-screen-border shadow-screen-glow">
            <div class="border-0.5px border-slate-500 rounded-6px bg-blue-100 h-full overflow-hidden bg-screen-grid">
              <div class="p-6 h-full overflow-y-auto">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Links class="bottom-30 right-0 absolute z-10" />
    </main>
  </div>
</template>
