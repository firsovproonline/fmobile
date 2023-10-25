import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0,
            master: [
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

            ]

        };
    },
    mutations: {
        setMaster(state, value){
            state.master = value
        }
    },
    getters : {
        master(state){ return state.master},
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin
});