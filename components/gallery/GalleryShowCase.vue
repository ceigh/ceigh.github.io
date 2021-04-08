<template lang='pug'>
div(:class='{ "white-bg": whiteBg }')
  figure(v-for='i in images' :key='i.title')
    img(:src='`/images/${i.src}`' :alt='i.name')
    figcaption {{ i.name }}
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
