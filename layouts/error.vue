<template lang='pug'>
div
  h1 {{ error.statusCode }}
  p.abstract
    | {{ error.message }}
    |
    strong :(
    br
    n-link(to='/') Go to homepage

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
      id: '1526401415661-5a755bef0246',
      author: 'Alice Washington'
    }
  }
}
</script>
