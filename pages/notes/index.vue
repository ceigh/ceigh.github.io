<template lang='pug'>
div
  h2 {{ heading }}
  p.mb-1 {{ $t('notes.description') }}.

  ul
    li(v-for='note in notes'
      :key='note.slug')
      NuxtLink(:to='`/notes/${note.slug}`')
        | {{ note.title || note.slug }}
      |
      |
      i(:title='note.date')
        | - {{ shortDate(note.date, $i18n.locale) }}
</template>

<script>
import { shortDate } from '~/plugins/filters.js'

async function getNotes ($content, locale) {
  return await $content(`${locale}/notes`).fetch()
}

export default {
  layout: 'header',

  async asyncData ({ $content, app }) {
    return {
      notes: await getNotes($content, app.i18n.locale)
    }
  },

  head () {
    return { title: this.heading }
  },

  computed: {
    heading () {
      return this.$t('notes.heading')
    }
  },

  watch: {
    async '$i18n.locale' (newLocale) {
      this.notes = await getNotes(this.$content, newLocale)
    }
  },

  methods: {
    shortDate
  }
}
</script>
