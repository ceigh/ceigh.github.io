<template lang='pug'>
mixin heading
  a.link-plain(href='/') ceigh.com

div
  h1(v-if='!bottom')
    +heading

  table(:class='{ "mt-2": bottom }')
    thead
      tr
        th(v-for='l in links'
          :key='l.name')
          a(v-if='l.external'
            :href='l.to'
            rel='nofollow noopener noreferrer'
            target='_blank') {{ l.name }}
          NuxtLink(v-else
            :to='l.to') {{ l.name }}

  h1.mt-1(v-if='bottom')
    +heading
</template>

<script lang='ts'>
import Vue, { PropOptions } from 'vue'

interface Link {
  name: string
  to: string
  external?: true
}

export default Vue.extend({
  props: {
    bottom: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>
  },

  computed: {
    links (): Link[] {
      return [
        {
          name: this.$t('nav.notes') as string,
          to: '/notes'
        },
        {
          name: this.$t('nav.demos') as string,
          to: '/demos'
        },
        {
          name: this.$t('nav.code') as string,
          to: 'https://git.ceigh.com',
          external: true
        },
        {
          name: 'GitHub',
          to: 'https://github.com/ceigh',
          external: true
        },
        {
          name: this.$t('nav.email') as string,
          to: 'mailto:me@ceigh.com',
          external: true
        },
        {
          name: 'RSS',
          to: '/rss/atom.xml',
          external: true
        }
      ]
    }
  }
})
</script>

<style scoped>
table {
  width: 100%;
}

th {
  text-align: center;
}

h1:last-child {
  text-align: center;
}
</style>
