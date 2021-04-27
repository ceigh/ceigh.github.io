<template lang='pug'>
div
  .splash(v-if='isLoading')
    span {{ $t('loading') }}…
  div(v-show='!isLoading' ref='rendererContainer')
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

<style scoped>
.splash {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.splash span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
}
</style>
