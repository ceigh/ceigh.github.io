<template lang='pug'>
div
  h2 Gallery

  NuxtLink(v-for='demo in demos' :key='demo.slug'
    :to='`/gallery/${demo.slug}`')
    figure(:class='{ "white-bg": demo.whiteBg }')
      img(:src='`/images/${demo.preview}`' :alt='demo.title')
      figcaption {{ demo.title }}
</template>

<script>
import { shortDate } from '~/plugins/filters.js'

export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return { demos: await $content('demos').fetch() }
  },

  head: {
    title: 'Gallery'
  },

  methods: {
    shortDate
  }
}
</script>
