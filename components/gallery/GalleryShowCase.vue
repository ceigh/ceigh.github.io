<template lang='pug'>
div
  figure(v-for='(img, i) in images' :key='img.title'
    :class='{ "white-bg": whiteBg, "mb-1": i !== images.length - 1 }')
    img(:src='`/images/${img.src}`' :alt='img.name')
    figcaption {{ img.name }}
</template>

<script>
export default {
  props: {
    images: {
      required: true,
      type: Array
    },
    whiteBg: {
      type: Boolean,
      default: false
    }
  }
}
</script>
