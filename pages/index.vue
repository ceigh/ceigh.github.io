<template lang='pug'>
div
  h2 About me
  NuxtContent(:document='index')
  br
  figure
    canvas(ref='canvas'
      width='400'
      height='300'
      title='Click to redraw')
    figcaption Troxler's fading
</template>

<script>
import { drawTroxler } from 'troxler'

export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return { index: await $content('index').fetch() }
  },

  head: {
    title: 'Home'
  },

  mounted () {
    const canvas = this.$refs.canvas
    drawTroxler(canvas)
  }
}
</script>
