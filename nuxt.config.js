import feed from './plugins/feed'
import i18n from './plugins/i18n'

export default {
  ssr: true,
  target: 'server',
  components: true,
  loading: { color: '#dac876' },

  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css'
      }
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
  i18n,

  css: [
    'latex.css',
    '~/assets/styles'
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
    '@nuxtjs/robots',
    'nuxt-i18n'
  ],

  build: {
    transpile: [({ isLegacy }) => isLegacy && 'troxler']
  },

  hooks: {
    'content:file:beforeInsert': (doc) => {
      if (doc.extension === '.md') {
        const { text } = require('reading-time')(doc.text)
        doc.readingTime = text
        doc.timestamp = new Date(doc.date)
      }
    }
  }
}
