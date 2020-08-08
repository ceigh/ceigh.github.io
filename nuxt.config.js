export default {
  mode: 'universal',
  target: 'server',
  loading: {
    color: '#dac876'
  },
  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  pwa: {
    icon: {
      iconSrc: '~/static/favicon.png',
      accessibleIcons: false
    },
    meta: {
      ogHost: 'https://ceigh.com',
      twitterCard: 'summary'
    }
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
    '@nuxt/content'
  ]
}
