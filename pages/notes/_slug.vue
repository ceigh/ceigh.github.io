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
  }
}
</script>
