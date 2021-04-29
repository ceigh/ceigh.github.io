<template lang='pug'>
div
  DemoSplash(v-if='isLoading')
  div(ref='rendererContainer')
</template>

<script lang='ts'>
import Vue from 'vue'
import { start, stop } from './three'

export default Vue.extend({
  data () {
    return {
      isLoading: true
    }
  },

  async mounted () {
    await start(this.$refs.rendererContainer as HTMLElement)
    this.isLoading = false
  },
  beforeDestroy: stop
})
</script>
