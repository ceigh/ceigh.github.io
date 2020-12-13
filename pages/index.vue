<template lang='pug'>
div
  h2 About me
  NuxtContent(:document='index')
  br
  figure
    canvas.troxler(ref='canvas'
      width='400'
      height='300'
      title='Click to redraw'
      @click='redraw')
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
    this.redraw()
  },

  methods: {
    redraw () {
      const canvas = this.$refs.canvas
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      drawTroxler(canvas)
    }
  }
}
</script>

<style scoped>
.troxler {
  cursor: pointer;
}
</style>
