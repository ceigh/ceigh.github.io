<template lang='pug'>
figure(v-if='unsplash')
  img(:src='`https://images.unsplash.com/photo-${unsplash.id}?w=1000&q=70`'
    alt='cover')
  figcaption(v-if='unsplash.author') Photo by {{ unsplash.author }}
</template>

<script>
export default {
  props: {
    unsplash: {
      type: Object,
      default: null
    }
  }
}
</script>
