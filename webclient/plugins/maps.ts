import { defineNuxtPlugin } from '#app'
import plugin from 'vue-yandex-maps'


const settings = {
    apiKey: '1aba3cf5-2bb5-4fb6-ae91-3f480496e3bc', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    // coordorder: 'latlong', // Порядок задания географических координат
    // debug: false, // Режим отладки
    version: '2.1' // Версия Я.Карт
}
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(plugin, settings)
});