<template lang='pug'>
NuxtContent(:document='index')
</template>

<script>
export default {
  async asyncData ({ $content }) {
    return { index: await $content('index').fetch() }
  }
}
</script>
