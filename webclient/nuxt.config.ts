// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
// @ts-ignore
  target: 'server',
  modules: ["@nuxt/ui",'@sidebase/nuxt-auth'],
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true
  },
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
    storage: {
      'redis': {
        driver: 'redis',
        /* redis connector options */
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        username: "", // needs Redis >= 6
        password: "",
        db: 0, // Defaults to 0
      },
    }
  }

})