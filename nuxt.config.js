export default {
  ssr: true,
  target: 'server',
  components: true,
  loading: { color: '#dac876' },

  build: {
    parallel: true,
    cache: true,
    transpile: [({ isLegacy }) => isLegacy && 'troxler']
  },

  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ]
  },

  pwa: {
    icon: {
      plugin: false
    },
    meta: {
      ogHost: 'https://ceigh.com',
      twitterCard: 'summary'
    }
  },

  content: {
    liveEdit: false
  },

  feed () {
    const baseUrl = 'https://ceigh.com'
    const baseUrlNotes = `${baseUrl}/notes`
    const baseLinkFeed = '/rss'
    const feedFormats = {
      // rss: { type: 'rss2', file: 'rss.xml' },
      atom: { type: 'atom1', file: 'atom.xml' }
      // json: { type: 'json1', file: 'feed.json' },
    }
    const { $content } = require('@nuxt/content')

    const createFeed = async function (feed) {
      feed.options = {
        title: 'Ceigh\'s blog',
        description: 'Tech notes about frontend',
        link: baseUrlNotes
      }
      const notes = await $content('notes').fetch()

      notes.forEach((note) => {
        const url = `${baseUrlNotes}/${note.slug}`

        feed.addItem({
          title: note.title,
          id: url,
          link: url,
          date: new Date(note.createdAt),
          description: note.abstract,
          content: note.abstract,
          author: note.author || 'Artjom Löbsack'
        })
      })
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `${baseLinkFeed}/${file}`,
      type,
      create: createFeed
    }))
  },

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
