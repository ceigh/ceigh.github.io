<template lang='pug'>
nav
  h2 {{ $t('contents') }}
  ol
    li(v-for='link in tocRearranged'
      :key='link.id')
      a(:href='`#${link.id}`') {{ link.text }}
      ol(v-if='link.childrens.length')
        li(v-for='child in link.childrens')
          a(:href='`#${child.id}`') {{ child.text }}
</template>

<script lang='ts'>
import Vue, { PropOptions } from 'vue'

interface Link {
  id: string
  childrens: Link[]
  text: string
  depth: number
}
type Toc = Link[]

export default Vue.extend({
  props: {
    toc: {
      required: true,
      type: Array
    } as PropOptions<Toc>
  },

  computed: {
    tocRearranged (): Toc {
      const res: Toc = []
      this.toc.forEach((l) => {
        const { depth } = l
        if (depth === 2) {
          l.childrens = []
          res.push(l)
        } else if (depth === 3) {
          res[res.length - 1].childrens.push(l)
        }
      })
      return res
    }
  }
})
</script>
