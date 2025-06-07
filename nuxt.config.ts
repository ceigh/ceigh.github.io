export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  telemetry: { enabled: false },
  devtools: { enabled: false },
  experimental: { typedPages: true },
  devServer: { host: '0.0.0.0' },
  imports: { scan: false },
  sourcemap: { client: false, server: false },

  // app: {
  //   head: {
  //     link: [
  //       {
  //         rel: 'preload',
  //         as: 'font',
  //         href: '/fonts/Myriad-Pro/Myriad-Pro-Regular.woff',
  //         type: 'font/woff',
  //         crossorigin: 'anonymous',
  //       },
  //     ],
  //   },
  // },

  css: [
    '@/assets/style/normalize.css',
    '@/assets/style/fonts.css',
  ],
})
