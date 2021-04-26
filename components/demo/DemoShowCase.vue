<template lang='pug'>
div
  figure(v-for='(img, i) in images' :key='img.title'
    :class='{ "white-bg": whiteBg, "mb-1": i !== images.length - 1 }')
    img(:src='`/images/${img.src}`' :alt='img.name')
    figcaption {{ img.name }}
</template>

<script lang='ts'>
import Vue, { PropOptions } from 'vue'

interface Image {
  name: string
  src: string
}

export default Vue.extend({
  props: {
    images: {
      required: true,
      type: Array
    } as PropOptions<Image[]>,
    whiteBg: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>
  }
})
</script>
