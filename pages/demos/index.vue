<template lang='pug'>
div
  h2 {{ heading }}
  p.mb-1 {{ $t('demos.description') }}.

  div(v-for='(demo, i) in demos' :key='demo.slug'
    :class='{ "mb-1": i !== demos.length - 1 }')
    figure(:class='{ "white-bg": demo.whiteBg }')
      NuxtLink(:to='`/demos/${demo.slug}`')
        img(:src='`/images/${demo.preview}`' :alt='demo.title')
      figcaption
        | {{ demo.title }}
        |
        i(:title='demo.date') - {{ shortDate(demo.date, $i18n.locale) }}
</template>

<script>
import { shortDate } from '~/plugins/filters.js'

export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return {
      demos: await $content('demos')
        .sortBy('timestamp', 'desc')
        .only(['slug', 'whiteBg', 'preview', 'title', 'date'])
        .fetch()
    }
  },

  head () {
    return { title: this.heading }
  },

  computed: {
    heading () {
      return this.$t('demos.heading')
    }
  },

  methods: {
    shortDate
  }
}
</script>

<style scoped>
img {
  height: 50vh;
  object-fit: cover;
  object-position: top;
}
</style>
