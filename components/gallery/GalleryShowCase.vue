<template lang='pug'>
div
  figure(v-for='(image, i) in images' :key='image.title'
    :class='{ "white-bg": whiteBg, "mb-1": i !== images.length - 1 }')
    img(:src='`/images/${image.src}`' :alt='image.name')
    figcaption {{ image.name }}
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
