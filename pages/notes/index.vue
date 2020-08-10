<template lang='pug'>
div
  h2 Notes
  ul
    li(v-for='note in notes'
      :key='note.slug')
      NuxtLink(:to='`/notes/${note.slug}`')
        | {{ note.title || note.slug }}
      |
      | - {{ shortDate(note.createdAt) }}
</template>

<script>
import { shortDate } from '~/plugins/filters.js'

export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return { notes: await $content('notes').fetch() }
  },

  methods: {
    shortDate
  },

  head: {
    title: 'Notes'
  }
}
</script>
