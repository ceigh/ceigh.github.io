<template lang='pug'>
nav
  h2 Contents
  ol
    li(v-for='link in tocRearranged'
      :key='link.id')
      a(:href='`#${link.id}`') {{ link.text }}
      ol(v-if='link.childrens.length')
        li(v-for='child in link.childrens')
          a(:href='`#${child.id}`') {{ child.text }}
</template>

<script>
export default {
  props: {
    toc: {
      required: true,
      type: Array
    }
  },

  computed: {
    tocRearranged () {
      const res = []
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
}
</script>
