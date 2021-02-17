<template lang='pug'>
div
  h1.title#title {{ note.title }}

  p.author
    | {{ note.author || 'Artjom Löbsack' }}
    br
    | {{ shortDate(note.date) }}

  div.abstract
    h3 Abstract
    p {{ note.abstract }}
    i ~ {{ note.readingTime }}
    br
    sub(v-if='note.keywords')
      del
        i {{ note.keywords.map(k => `#${k}`).join(', ') }}

  NoteCover(:unsplash='note.unsplash' :plain='note.plain')

  NoteToc(:toc='note.toc')

  NoteConfig(:config='note.config')

  NuxtContent(:document='note')

  a(href='#title') [Top]

  AppNav(bottom)
</template>

<script>
import { shortDate } from '~/plugins/filters.js'

export default {
  async asyncData ({ $content, params: { slug } }) {
    return { note: await $content('notes', slug).fetch() }
  },

  head () {
    const { note } = this
    if (!note) { return }
    const { abstract, keywords } = note
    if (!note.date || !abstract || !keywords) {
      throw new Error('Note must include date, abstract and keywords')
    }
    const author = note.author || 'Artjom Löbsack'
    const pageTitle = `${note.title} - ${author}`

    return {
      title: pageTitle,
      meta: [
        { hid: 'description', name: 'description', content: abstract },
        { hid: 'author', name: 'author', content: author },
        { hid: 'keywords', name: 'keywords', content: keywords }
      ]
    }
  },

  methods: {
    shortDate
  }
}
</script>
