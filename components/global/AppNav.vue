<template lang='pug'>
div
  h1(v-if='!bottom') ceigh.com

  table.app-nav-table(:class='{ "app-nav-table-bottom": bottom }')
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
</template>

<script>
export default {
  props: {
    bottom: {
      type: Boolean,
      default: false
    }
  },

  created () {
    this.links = [
      { name: 'Home', to: '/' },
      { name: 'Gallery', to: '/gallery' },
      { name: 'Notes', to: '/notes' },
      { name: 'Code', to: 'https://git.ceigh.com', external: true },
      { name: 'GitHub', to: 'https://github.com/ceigh', external: true },
      { name: 'Email', to: 'mailto:me@ceigh.com', external: true },
      { name: 'RSS', to: '/rss/atom.xml', external: true }
    ]
  }
}
</script>

<style scoped>
.app-nav-table {
  width: 100%;
}

.app-nav-table-bottom {
  margin-top: 2rem;
}
</style>
