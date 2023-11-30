//import CredentialsProvider from 'next-auth/providers/credentials'
import YandexProvider from 'next-auth/providers/yandex'
import { NuxtAuthHandler } from "#auth";
import config  from "../../config/db.config";
import connectionMysql from "~/server/database/config/mysql";
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
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            if(session.user){
                // запрос в базу есть ли такой юзвер
                let query = `SELECT * FROM user WHERE email="`+session.user.email+`"`
                const [master] = await connectionMysql.execute(query);
                if(!master[0]){
                    // добавляем юзвера
                    // @ts-ignore
                    let query = "INSERT INTO user (email,avatar) VALUES ('"+session.user.email+"','"+session.user.image+"')";
                    // @ts-ignore
                    await connectionMysql.execute(query)
                    // @ts-ignore
                    session.user.admin =  0
                    // @ts-ignore
                    session.user.master =  0
                    return session
                }else{
                    query = `SELECT * FROM master WHERE email="`+session.user.email+`"`
                    const [master1] = await connectionMysql.execute(query);
                    if(!master1[0]){
                        // @ts-ignore
                        session.user.admin =  master[0].admin
                        // @ts-ignore
                        session.user.master =  0
                    }else {
                        // @ts-ignore
                        session.user.admin =  master[0].admin
                        // @ts-ignore
                        session.user.master =  1
                    }
                    return session
                }
            }else{
                return session

            }
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
})
