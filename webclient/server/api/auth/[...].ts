//import CredentialsProvider from 'next-auth/providers/credentials'
import YandexProvider from 'next-auth/providers/yandex'
import { NuxtAuthHandler } from "#auth";
import config  from "../../config/db.config";
export default NuxtAuthHandler({
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret: config.NUXT_SECRET,
    providers: [
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        YandexProvider.default({
            checks: 'both',
            clientId: config.YANDEX_CLIENT_ID,
            clientSecret: config.YANDEX_CLIENT_SECRET
        }),
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    ]
})
