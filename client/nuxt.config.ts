// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
// @ts-ignore
  devtools: {
    enabled: false // or false to disable
  },
// @ts-ignore
  plugins: [
    {src: '~/plugins/testStore.js', mode: 'client'},
  ],
// @ts-ignore
  ssr : false,
// @ts-ignore
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
// @ts-ignore
  app: {
    head: {
      "script": [
        { src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'},
        { src: '/js/svipe.js'},
      ],
    },
  },
// @ts-ignore
  css: [
      '~/assets/css/default.css',
      '~/assets/css/flexslider.css',
  ],
  build: {
    transpile: [
      '/plugins',
    ],
    babel: {
      compact: true,
    },
    extractCSS: true,
  },
  bridge: {
    vite: false,
    nitro: false
  },
  vite: {
    // config options
    logLevel: 'error',

  },
  serverMiddleware: {
    '/api': '~/api'
  }
})
