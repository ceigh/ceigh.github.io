<template lang='pug'>
div
  NuxtContent(:document='header')
  Nuxt
</template>

<script>
export default {
  // can't use asyncData here :(
  async fetch () {
    this.header = await this.$content('header').fetch()
  },

  data () {
    return {
      header: null
    }
  }
}
</script>

<style scoped>
.post-header table {
  width: 100%;
}
</style>
