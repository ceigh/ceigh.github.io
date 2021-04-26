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

<script lang='ts'>
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    config: {
      type: Object,
      default: null
    } as PropOptions<Record<string, string>>
  }
})
</script>
