<template lang='pug'>
figure(v-if='unsplash')
  img(:src='`https://source.unsplash.com/${unsplash.id}`'
    alt='cover')
  figcaption(v-if='unsplash.author') {{ $t('cover') }} {{ unsplash.author }}
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
