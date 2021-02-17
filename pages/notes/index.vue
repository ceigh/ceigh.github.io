<template lang='pug'>
div
  h2 Notes
  ul
    li(v-for='note in notes'
      :key='note.slug')
      NuxtLink(:to='`/notes/${note.slug}`')
        | {{ note.title || note.slug }}
      |
      |
      i(:title='note.createdAt')
        | - {{ shortDate(note.date) }}
</template>

<script>
import { shortDate } from '~/plugins/filters.js'

export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return { notes: await $content('notes').fetch() }
  },

  head: {
    title: 'Notes'
  },

  methods: {
    shortDate
  }
}
</script>
