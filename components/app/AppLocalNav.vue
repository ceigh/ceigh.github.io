<template lang='pug'>
nav
  a(href='#title') [{{ $t('top') }}]
  NuxtLink(to='./') [{{ $t('back') }}]
</template>

<style scoped>
nav {
  text-align: right;
}

nav :not(:last-child) {
  margin-right: 1rem;
}
</style>
