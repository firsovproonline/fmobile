// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
// @ts-ignore
  ssr : false,
// @ts-ignore
  devServer: {
    host: '0.0.0.0',
    port: 3010
  },
  css: [
    '~/assets/css/main.css',
  ],
})