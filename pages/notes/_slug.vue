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
        ol(v-if='link.childrens.length')
          li(v-for='child in link.childrens')
            a(:href='`#${child.id}`') {{ child.text }}

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
      const res = []
      this.note.toc.forEach((l) => {
        const { depth } = l
        if (depth === 2) {
          l.childrens = []
          res.push(l)
        } else if (depth === 3) {
          res[res.length - 1].childrens.push(l)
        }
      })
      return res
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
