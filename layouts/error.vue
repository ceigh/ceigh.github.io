<template lang='pug'>
div
  h1 {{ error.statusCode }}
  p.abstract
    | {{ error.message }}
    |
    strong :(
    br
    a(href='/') {{ $t('error.start') }}

  NoteCover(:unsplash='{ id: "7K3VasWk47Q", author: "Kyaw Tun" }')
</template>

<script lang='ts'>
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    error: {
      required: true,
      type: Object
    } as PropOptions<Error>
  },

  head () {
    return { title: this.error.message }
  }
})
</script>
