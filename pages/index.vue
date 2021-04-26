<template lang='pug'>
div
  h2 {{ heading }}
  NuxtContent(:document='document')
  br
  figure
    canvas(ref='canvas'
      width='320'
      height='240'
      style='cursor: pointer'
      :title='$t("home.troxler.title")'
      @click='renderTroxler')
    figcaption {{ $t('home.troxler.caption') }}
</template>

<script lang='ts'>
import Vue from 'vue'
import { drawTroxler } from 'troxler'

async function getDocument (content: Function, locale: string) {
  return await content(`${locale}/home`).fetch()
}

export default Vue.extend({
  layout: 'header',

  async asyncData ({ $content, i18n }) {
    return { document: await getDocument($content, i18n.locale) }
  },

  head () {
    // @ts-ignore
    return { title: this.heading }
  },

  computed: {
    heading (): string {
      return this.$t('home.heading') as string
    }
  },

  watch: {
    async '$i18n.locale' (newLocale) {
      // @ts-ignore
      this.document = await getDocument(this.$content, newLocale)
    }
  },

  mounted () {
    this.renderTroxler()
  },

  methods: {
    renderTroxler (): void {
      drawTroxler(this.$refs.canvas)
    }
  }
})
</script>
