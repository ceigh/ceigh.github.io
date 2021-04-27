<template lang='pug'>
div(ref='rendererContainer')
</template>

<script lang='ts'>
import Vue from 'vue'
import { start, stop } from './three'

export default Vue.extend({
  async mounted () {
    await start(this.$refs.rendererContainer as HTMLElement)
  },
  beforeDestroy: stop
})
</script>
