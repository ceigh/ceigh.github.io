<template lang='pug'>
div
  h1.title {{ note.title }}

  p.author
    | {{ note.author || 'Artjom Löbsack' }}
    br
    | {{ date }}

  div.abstract
    h3 Abstract
    p {{ note.abstract }}

  nav
    h2 Contents
    ol
      li(v-for='link in toc'
        :key='link.id')
        a(:href='`#${link.id}`') {{ link.text }}

  NuxtContent(:document='note')
</template>

<script>
export default {
  async asyncData ({ $content, params: { slug } }) {
    return { note: await $content('notes', slug).fetch() }
  },

  computed: {
    date () {
      return new Date(this.note.createdAt).toLocaleString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    },
    toc () {
      return this.note.toc.filter(l => l.depth === 2)
    }
  },

  head () {
    const { note } = this
    if (!note) { return }
    const { abstract, keywords } = note
    if (!abstract || !keywords) {
      throw new Error('Note must include abstract and keywords')
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
  }
}
</script>
