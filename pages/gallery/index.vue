<template lang='pug'>
div
  h2 {{ $t('gallery.heading') }}

  .demo(v-for='demo in demos' :key='demo.slug')
    figure(:class='{ "white-bg": demo.whiteBg }')
      NuxtLink(:to='`/gallery/${demo.slug}`')
        img(:src='`/images/${demo.preview}`' :alt='demo.title')
      figcaption
        | {{ demo.title }}
        |
        i(:title='demo.date') - {{ shortDate(demo.date) }}
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

<style scoped>
.demo:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
