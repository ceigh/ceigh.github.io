import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'

export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  telemetry: { enabled: false },
  devtools: { enabled: false },
  experimental: { typedPages: true },
  devServer: { host: '0.0.0.0' },
  imports: { scan: false },
  sourcemap: { client: false, server: false },

  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
      },
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },

  app: {
    head: {
      title: 'Ceigh — The Rhythm Architect',

      // Remove after preloading were added to unocss
      // https://github.com/unocss/unocss/issues/4674
      link: [
        {
          rel: 'preload',
          as: 'font',
          href: '/assets/fonts/pixelifysans-a45e2f67.woff2',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          href: '/assets/fonts/inter-d99c326e.woff2',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },

  modules: [
    '@unocss/nuxt',
  ],

  watch: [
    /assets\/icons\/.+\.svg/,
  ],
})
