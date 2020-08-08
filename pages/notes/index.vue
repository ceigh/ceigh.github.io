<template lang='pug'>
div
  h1 Notes
  ul
    li(v-for='note in notes'
      :key='note.slug')
      NuxtLink(:to='`/notes/${note.slug}`')
        | {{ note.title || note.slug }}
</template>

<script>
export default {
  layout: 'header',

  async asyncData ({ $content }) {
    return { notes: await $content('notes').fetch() }
  },

  head: {
    title: 'Notes'
  }
}
</script>
