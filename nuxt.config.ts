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

  css: [
    '@/assets/style/normalize.css',
    '@/assets/style/fonts.css',
    '@/assets/style/variables.css',
    '@/assets/style/global.css',
  ],

  // Use lightningcss as postcss plugin
  postcss: {
    plugins: {
      // @ts-expect-error Upstream type
      'autoprefixer': false,
      // @ts-expect-error Upstream type
      'cssnano': false,
      'postcss-lightningcss': {
        lightningcssOptions: {
          sourceMap: false,
          drafts: {
            customMedia: true,
          },
        },
      },
    },
  },
})
