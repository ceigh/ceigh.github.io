import feed from './plugins/feed'

export default {
  ssr: true,
  target: 'server',
  components: true,
  loading: { color: '#dac876' },

  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ]
  },

  pwa: {
    icon: {
      plugin: false
    }
  },

  content: {
    liveEdit: false
  },

  feed,

  css: [
    'latex.css',
    '~/assets/styles/common.css'
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/pwa'
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  hooks: {
    'content:file:beforeInsert': (doc) => {
      if (doc.extension === '.md') {
        const { text } = require('reading-time')(doc.text)
        doc.readingTime = text
      }
    }
  }
}
