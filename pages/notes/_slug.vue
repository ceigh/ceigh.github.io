<template lang='pug'>
div
  h1.title#title {{ note.title }}

  p.author
    | {{ note.author || 'Artjom Löbsack' }}
    br
    | {{ shortDate(note.createdAt) }}

  div.abstract
    h3 Abstract
    p {{ note.abstract }}

  figure(v-if='note.unsplash')
    img(:src='`https://images.unsplash.com/photo-${note.unsplash.id}?w=1000`'
      alt='cover')
    figcaption(v-if='note.unsplash.author') Photo by {{ note.unsplash.author }}

  nav
    h2 Contents
    ol
      li(v-for='link in toc'
        :key='link.id')
        a(:href='`#${link.id}`') {{ link.text }}
        ol(v-if='link.childrens.length')
          li(v-for='child in link.childrens')
            a(:href='`#${child.id}`') {{ child.text }}

  div(v-if='note.config')
    h2 Configuration
    table
      thead
        tr
          th Software
          th Version
      tbody
        tr(v-for='(v, k) in note.config'
          :key='k')
          td
            code {{ k }}
          td
            code {{ v }}

  NuxtContent(:document='note')

  a(href='#title') [Top]
</template>

<script>
import { shortDate } from '~/plugins/filters.js'

export default {
  async asyncData ({ $content, params: { slug } }) {
    return { note: await $content('notes', slug).fetch() }
  },

  computed: {
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

  methods: {
    shortDate
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
