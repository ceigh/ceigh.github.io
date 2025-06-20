<script setup lang="ts">
// const links = [
//   {
//     href: 'https://t.me/giceh',
//     icon: 'i-app:telegram',
//     ariaLabel: 'Telegram',
//   },
//   {
//     href: 'https://github.com/ceigh',
//     icon: 'i-app:github',
//     ariaLabel: 'Github',
//   },
// ]
</script>

<template>
  <div class="p-8 p-e-18 flex justify-center h-dvh">
    <main class="p-10 surface rounded-12 grow-1 relative before:(rounded-inherit content-empty inset-0 absolute bg-noise)">
      <div class="bg-gray-500 h-40 w-10 left-full top-25% absolute" />

      <div class="flex flex-col gap-10 h-full relative overflow-hidden">
        <h1 class="text-3xl tracking-tight uppercase">
          Ceigh
        </h1>

        <div class="text-56px leading-none font-pixel p-2px rounded-8px grow-1 overflow-hidden bg-screen-border shadow-screen">
          <div class="bg-screen-grid border-0.5px border-slate-500 rounded-6px bg-blue-100 h-full overflow-hidden">
            <div class="p-6 h-full overflow-y-auto">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- <div class="text-5xl p-s-8 flex gap-2 items-center justify-end"> -->
    <!--   <a -->
    <!--     v-for="l in links" -->
    <!--     :key="l.href" -->
    <!--     :href="l.href" -->
    <!--     target="_blank" -->
    <!--     rel="noopener noreferrer" -->
    <!--     :aria-label="l.ariaLabel" -->
    <!--     class="rounded-full flex active:scale-90" -->
    <!--   > -->
    <!--     <i :class="l.icon" /> -->
    <!--   </a> -->
    <!-- </div> -->
  </div>
</template>
