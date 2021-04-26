<template lang='pug'>
.switch.mt-2
  button(@click='switchLocale')
    span(v-if='$i18n.locale === "ru"') Switch to English
    span(v-else) Переключить на Русский
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  methods: {
    switchLocale (): void {
      const { $i18n } = this
      const otherLocales = $i18n.locales
        // @ts-ignore
        .filter((l: string) => l !== $i18n.locale)
      $i18n.setLocale(otherLocales[0])
      window.scrollTo(0, 0)
    }
  }
})
</script>

<style scoped>
.switch {
  text-align: center;
}
</style>
