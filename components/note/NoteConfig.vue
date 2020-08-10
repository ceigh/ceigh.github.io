<template lang='pug'>
div(v-if='config')
  h2 Configuration
  table
    thead
      tr
        th Software
        th Version
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
