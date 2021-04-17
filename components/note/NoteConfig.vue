<template lang='pug'>
div(v-if='config')
  h2 {{ $t('config.heading') }}
  table
    thead
      tr
        th {{ $t('config.software') }}
        th {{ $t('config.version') }}
    tbody
      tr(v-for='(v, k) in config'
        :key='k')
        td
          code {{ k }}
        td
          code {{ v }}
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: null
    }
  }
}
</script>
