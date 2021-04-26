<template lang='pug'>
div
  h2 {{ heading }}
  p.mb-1 {{ $t('demos.description') }}.

  div(v-for='(demo, i) in demos' :key='demo.slug'
    :class='{ "mb-1": i !== demos.length - 1 }')
    figure(:class='{ "white-bg": demo.whiteBg }')
      NuxtLink(:to='`/demos/${demo.slug}`' no-prefetch)
        img(:src='`/images/${demo.preview}`' :alt='demo.title')
      figcaption
        | {{ demo.title }}
        | -
        |
        i(:title='demo.date') {{ shortDate(demo.date, $i18n.locale) }}
</template>

<script lang='ts'>
import Vue from 'vue'
import { shortDate } from '~/plugins/filters'

export default Vue.extend({
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
    // @ts-ignore
    return { title: this.heading }
  },

  computed: {
    heading (): string {
      return this.$t('demos.heading') as string
    }
  },

  methods: { shortDate }
})
</script>

<style scoped>
img {
  height: 50vh;
  object-fit: cover;
  object-position: top;
}
</style>
