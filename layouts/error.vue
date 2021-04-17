<template lang='pug'>
div
  h1 {{ error.statusCode }}
  p.abstract
    | {{ error.message }}
    |
    strong :(
    br
    a(href='/') {{ $t('error.start') }}

  NoteCover(:unsplash='unsplash')
</template>

<script>
export default {
  props: {
    error: {
      required: true,
      type: Object
    }
  },

  head () {
    return { title: this.error.message }
  },

  created () {
    this.unsplash = {
      id: '7K3VasWk47Q',
      author: 'Kyaw Tun'
    }
  }
}
</script>
