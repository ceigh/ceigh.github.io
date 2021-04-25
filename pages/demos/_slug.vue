<template lang='pug'>
div
  NuxtContent(v-if='demo.full' :document='demo')

  div(v-else)
    h1.title#title {{ demo.title }}

    p.author
      | {{ demo.author || name }}
      br
      | {{ shortDate(demo.date, $i18n.locale) }}

    NuxtContent(:document='demo')

    AppLocalNav
    AppNav(bottom)
    AppSwitchLocale
</template>

<script>
import { shortDate } from '~/plugins/filters.js'
import { name } from '~/plugins/const.json'

const fullClass = 'full'

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

  mounted () {
    if (this.demo.full) { document.body.classList.add(fullClass) }
  },
  beforeDestroy () {
    if (this.demo.full) { document.body.classList.remove(fullClass) }
  },

  methods: { shortDate }
}
</script>
