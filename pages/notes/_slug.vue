<template lang='pug'>
div
  h1.title {{ note.title }}

  p.author
    | {{ note.author || 'Artjom Löbsack' }}
    br
    | {{ note.date }}

  div.abstract
    h3 Abstract
    p {{ note.abstract }}

  NuxtContent(:document='note')
</template>

<script>
export default {
  async asyncData ({ $content, params: { slug } }) {
    return { note: await $content('notes', slug).fetch() }
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
