<template lang='pug'>
NuxtContent(:document='note')
</template>

<script>
export default {
  async asyncData ({ $content, params: { slug } }) {
    return { note: await $content('notes', slug).fetch() }
  }
}
</script>
