<template lang='pug'>
div
  DemoSplash(v-show='isLoading')
  div(ref='rendererContainer' style='cursor: none')
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
    let { size, shadows } = this.$route.query
    // @ts-ignore
    size = ['0', '1'].includes(size) ? parseInt(size) : 1
    // @ts-ignore
    shadows = ['0', '1'].includes(shadows) ? Boolean(parseInt(shadows)) : false

    // @ts-ignore
    await start(this.$refs.rendererContainer as HTMLElement, size, shadows)
    this.isLoading = false
  },
  beforeDestroy: stop
})
</script>
