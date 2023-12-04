// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
// @ts-ignore
  devtools: { enabled: false },
// @ts-ignore
  target: 'server',
  modules: [
    "@nuxt/ui",
    '@sidebase/nuxt-auth',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-pdf'
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
  //components: true,
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: false,
  },
// @ts-ignore
  plugins: [
    {src: '~/plugins/main.js', mode: 'client'},
    { src: '~/plugins/maps', mode: 'client' },
  ],
// @ts-ignore
  ssr : false,
// @ts-ignore
  devServer: {
    host: '0.0.0.0',
    port: 3010
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/default.css',
  ],
  nitro: {
    plugins: ['~/plugins/nitro.server.ts']

//    storage: {
//      'redis': {
//        driver: 'redis',
//        /* redis connector options */
//       port: 6379, // Redis port
//        host: "127.0.0.1", // Redis host
//        username: "", // needs Redis >= 6
//        password: "",
//        db: 0, // Defaults to 0
//      },
//    }
  }

})