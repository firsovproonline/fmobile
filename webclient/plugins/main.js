import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0,
            user: {},
            news: {
                total: 1,
                rows: [
                    {
                        id: 1,
                        title: 'Алень подготовила хреновуху',
                        body: 'Народ записывается в сомелье. Будем надеятся что фраза водка Хреновая заиграет новым смыслом',
                        video: null,
                        img1:'/hrenovuha.jpeg',
                        img2:'',
                        img3:'',
                        date: ''
                    },
                    {
                        id: 2,
                        title: 'Дом сгорел а радио осталось',
                        body: 'Но жизнь продолжается. Правда без помощи добрых людей вновь остроить дом к сожалению не получится',
                        video: '/help.mp4',
                        img1:'/help.jpg',
                        img2:'',
                        img3:'',
                        date: ''
                    }
                ],
                date: 0
            },
            product: {
                total: 0,
                rows: [],
                date: 0
            },
            master: {
                total: 3,
                rows: [
                    {
                        firstName: 'Иван',
                        lastName: 'Иванов',
                        photo:  '/img/avatar.png',
                        profession: 'Электрик',
                        phone: '+7 (999) 999-99-99',
                        id: 1
                    },
                    {
                        firstName: 'Иван',
                        lastName: 'Сидоров',
                        photo:  '/img/avatar.png',
                        profession: 'Сантехник (немец)',
                        phone: '+7 (999) 999-99-99',
                        id: 2
                    },
                    {
                        firstName: 'Сергей',
                        lastName: 'Петров',
                        photo:  '/img/avatar.png',
                        profession: 'Сварщик',
                        phone: '+7 (999) 999-99-99',
                        id: 3
                    },

                ],
                date: 0
            }
        };
    },
    mutations: {
        setMaster(state, value){
            state.master = value
        },
        setUser(state, value){
            state.user = value
        },
        setNews(state, value){
            state.news = value
        }

    },
    getters : {
        master(state){ return state.master},
        user(state){ return state.user},
        news(state){ return state.news},
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin
});