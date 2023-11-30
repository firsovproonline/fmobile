import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0,
            user: {},
            news: {
                total: 0,
                rows: [],
                date: 0
            },
            product: {
                total: 0,
                rows: [],
                date: 0
            },
            master: {
                total: 0,
                rows: [],
                date: 0
            },
            realEstate: {
                total: 0,
                rows: [],
                date: 0
            }
        };
    },
    actions: {
        getRealEstate(store, params){
            $fetch( `/api/realestate`, {
                method: 'GET',
                params: {
                    q: params.q.value,
                    page: params.page.value,
                    perPage:15,
                    status: params.status.value
                }
            }).then(items=>{
                store.state.realEstate = items
            })
        },

        getMaster(store, params){
            $fetch( `/api/master`, {
                method: 'GET',
                params: {
                    q: params.q.value,
                    page: params.page.value,
                    perPage:15,
                    status: params.status.value
                }
            }).then(items=>{
                store.state.master = items
            })
        },
        getNews(store, params){
            $fetch( `/api/news`, {
                method: 'GET',
                params: {
                    q: '',
                    page: 1,
                    perPage:15,
                }
            }).then(items=>{
                store.state.news = items
            })
        },
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