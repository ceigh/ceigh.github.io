<template lang='pug'>
div
  h1.title#title {{ demo.title }}

  p.author
    | {{ demo.author || name }}
    br
    | {{ shortDate(demo.date, $i18n.locale) }}

  NuxtContent(:document='demo')

  AppNav(bottom)
</template>

<script>
import { shortDate } from '~/plugins/filters.js'
import { name } from '~/plugins/const.json'

export default {
  async asyncData ({ $content, params: { slug } }) {
    return { demo: await $content('demos', slug).fetch(), name }
  },

  head () {
    const { demo } = this
    if (!demo) { return }
    if (!demo.date) {
      throw new Error('Demo must include date')
    }
    const author = demo.author || name
    const pageTitle = `${demo.title} - ${author}`

    return {
      title: pageTitle,
      meta: [
        { hid: 'author', name: 'author', content: author }
      ]
    }
  },

  methods: {
    shortDate
  }
}
</script>
