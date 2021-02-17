<template lang='pug'>
figure(v-if='unsplash')
  img(:src='`https://images.unsplash.com/photo-${unsplash.id}?w=1000&q=70`'
    alt='cover')
  figcaption(v-if='unsplash.author') Photo by {{ unsplash.author }}
figure(v-else-if='plain')
  img(:src='plain.src'
    alt='cover')
  figcaption(v-if='plain.caption') {{ plain.caption }}
</template>

<script>
export default {
  props: {
    unsplash: {
      type: Object,
      default: null
    },
    plain: {
      type: Object,
      default: null
    }
  }
}
</script>
