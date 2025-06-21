<template>
  <div class="p-8 p-e-18 flex justify-center h-dvh">
    <main class="p-t-10 surface rounded-12 grow-1 relative before:(rounded-inherit content-empty inset-0 absolute bg-noise)">
      <div class="bg-gray-500 h-40 w-10 left-full top-40 absolute" />

      <div class="flex flex-col h-full relative overflow-hidden">
        <h1 class="text-3xl tracking-tight p-x-10 uppercase">
          Ceigh
        </h1>

        <div class="p-10 grow-1 overflow-hidden">
          <div class="text-3xl font-mono p-2px rounded-8px h-full overflow-hidden bg-screen-border shadow-screen-border shadow-screen-glow">
            <div class="border-0.5px border-slate-500 rounded-6px bg-blue-100 h-full overflow-hidden bg-screen-grid">
              <div class="p-6 h-full overflow-y-auto">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Links class="bottom-30 right-0 absolute" />
    </main>
  </div>
</template>
