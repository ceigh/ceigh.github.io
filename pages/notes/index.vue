<template lang='pug'>
div
  h2 {{ heading }}
  p.mb-1 {{ $t('notes.description') }}.

  ul
    li(v-for='note in notes' :key='note.slug')
      NuxtLink(:to='`/notes/${note.slug}`') {{ note.title || note.slug }}
      |
      | -
      |
      i(:title='note.date') {{ shortDate(note.date, $i18n.locale) }}
</template>

<script lang='ts'>
import Vue from 'vue'
import { shortDate } from '~/plugins/filters'

async function getNotes (content: Function, locale: string) {
  return await content(`${locale}/notes`)
    .sortBy('timestamp', 'desc')
    .only(['slug', 'title', 'date'])
    .fetch()
}

export default Vue.extend({
  layout: 'header',

  async asyncData ({ $content, i18n }) {
    return { notes: await getNotes($content, i18n.locale) }
  },

  head () {
    // @ts-ignore
    return { title: this.heading }
  },

  computed: {
    heading (): string {
      return this.$t('notes.heading') as string
    }
  },

  watch: {
    async '$i18n.locale' (newLocale) {
      // @ts-ignore
      this.notes = await getNotes(this.$content, newLocale)
    }
  },

  methods: { shortDate }
})
</script>
