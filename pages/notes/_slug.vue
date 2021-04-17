<template lang='pug'>
div
  h1.title#title {{ note.title }}

  p.author
    | {{ note.author || name }}
    br
    | {{ shortDate(note.date, $i18n.locale) }}

  div.abstract
    h3 {{ $t('abstract') }}
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
import { name } from '~/plugins/const.json'

async function getNote ($content, locale, slug) {
  return await $content(`${locale}/notes`, slug).fetch()
}

export default {
  async asyncData ({ $content, i18n, params: { slug } }) {
    return {
      name,
      note: await getNote($content, i18n.locale, slug)
    }
  },

  head () {
    const { note } = this
    if (!note) { return }
    const { abstract, keywords } = note
    if (!note.date || !abstract || !keywords) {
      throw new Error('Note must include date, abstract and keywords')
    }
    const author = note.author || name
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

  watch: {
    async '$i18n.locale' (newLocale) {
      this.note = await getNote(this.$content,
        newLocale, this.$query.params.slug)
    }
  },

  methods: {
    shortDate
  }
}
</script>
