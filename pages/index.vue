<template lang='pug'>
div
  h2 Me
  NuxtContent(:document='index')
</template>

<script>
export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return { index: await $content('index').fetch() }
  },

  head: {
    title: 'Home'
  }
}
</script>
