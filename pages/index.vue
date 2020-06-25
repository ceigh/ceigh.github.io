<template lang='pug'>
div
  h1 Artjom Löbsack
  NuxtLink(to='articles') Articles
  NuxtContent(:document='document')
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const document = await $content('hello').fetch()
    return { document }
  }
}
</script>
