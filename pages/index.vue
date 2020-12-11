<template lang='pug'>
div
  h2 About me
  NuxtContent(:document='index')
  br
  figure
    img(:src='getRandomTroxler()'
      alt='troxler')
    figcaption Troxler's fading
</template>

<script>

export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return { index: await $content('index').fetch() }
  },

  head: {
    title: 'Home'
  },

  methods: {
    getRandomTroxler () {
      const dir = '/images/troxler/'
      const max = 11
      const idx = Math.floor(Math.random() * (max - 1) + 1)
      return `${dir}${idx}.jpg`
    }
  }
}
</script>
