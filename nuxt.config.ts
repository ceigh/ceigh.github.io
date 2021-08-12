import readingTime from 'reading-time'
import type { IContentDocument } from '@nuxt/content/types/content'
import feed from './plugins/feed'
import i18n from './plugins/i18n'

export default {
  ssr: true,
  target: 'server',
  components: [{
    path: '@/components', ignore: ['demo/*/three']
  }],
  loading: { color: '#dac876' },

  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ]
  },
  css: ['latex.css', '~/assets/styles'],

  pwa: { icon: { plugin: false } },
  content: { liveEdit: false },
  feed,
  i18n,

  buildModules: [
    '@nuxt/typescript-build',
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
    transpile: ['three', 'troxler'],
    babel: { compact: true }
  },

  hooks: {
    'content:file:beforeInsert': (doc: IContentDocument) => {
      if (doc.extension === '.md') {
        const { minutes } = readingTime(doc.text)
        doc.minutes = Math.round(minutes)
        doc.timestamp = new Date(doc.date)
      }
    }
  }
}
