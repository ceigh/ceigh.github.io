<template lang='pug'>
div
  h2 {{ heading }}
  NuxtContent(:document='document')
  br
  figure
    canvas(ref='canvas'
      width='400'
      height='300'
      style='cursor: pointer'
      :title='$t("home.troxler.title")'
      @click='renderTroxler')
    figcaption {{ $t('home.troxler.caption') }}
</template>

<script>
import { drawTroxler } from 'troxler'

async function getDocument ($content, locale) {
  return await $content(`${locale}/home`).fetch()
}

export default {
  layout: 'header',

  async asyncData ({ $content, app }) {
    return {
      document: await getDocument($content, app.i18n.locale)
    }
  },

  head () {
    return { title: this.heading }
  },

  computed: {
    heading () {
      return this.$t('home.heading')
    }
  },

  watch: {
    async '$i18n.locale' (newLocale) {
      this.document = await getDocument(this.$content, newLocale)
    }
  },

  mounted () {
    this.renderTroxler()
  },

  methods: {
    renderTroxler () {
      drawTroxler(this.$refs.canvas)
    }
  }
}
</script>
