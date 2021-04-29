<template lang='pug'>
.splash
  span {{ $t('loading') }}…
</template>

<style scoped>
.splash {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.splash span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
}
</style>
