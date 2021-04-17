<template lang='pug'>
.app-switch-locale
  button(@click='switchLocale')
    span(v-if='$i18n.locale === "ru"') Switch to English
    span(v-else) Переключить на Русский
</template>

<script>
export default {
  methods: {
    switchLocale () {
      const { $i18n } = this
      const otherLocales =
        $i18n.locales.filter(l => l !== $i18n.locale)
      $i18n.setLocale(otherLocales[0])
    }
  }
}
</script>

<style>
.app-switch-locale {
  text-align: center;
  margin-top: 2rem;
}
</style>
