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

<script lang='ts'>
import Vue, { PropOptions } from 'vue'

interface UnsplashCover {
  id: string
  author: string
}

interface PlainCover {
  src: string
  caption: string
}

export default Vue.extend({
  props: {
    unsplash: {
      type: Object,
      default: null
    } as PropOptions<UnsplashCover>,
    plain: {
      type: Object,
      default: null
    } as PropOptions<PlainCover>
  }
})
</script>
