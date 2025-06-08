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

  app: {
    head: {
      link: [
        {
          rel: 'preload',
          as: 'font',
          href: '/fonts/Inter-Display/Inter-Display-Medium.woff2',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          href: '/fonts/Reddit-Sans-Condensed/Reddit-Sans-Condensed-Black.ttf',
          type: 'font/ttf',
          crossorigin: 'anonymous',
        },
      ],
    },
  },

  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
        drafts: {
          customMedia: true,
        },
      },
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },

  css: [
    '@/assets/style/normalize.css',
    '@/assets/style/fonts.css',
    '@/assets/style/variables.css',
    '@/assets/style/global.css',
  ],
})
