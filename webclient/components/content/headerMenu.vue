<template>
  <UAvatar v-if="data?.user?.image"
      :src="data?.user?.image"
      alt="benjamincanac"
  />
    {{ data?.user?.name }}
    <UDropdown :items="items" >
      <UButton color="black" variant="ghost" icon="i-heroicons-bars-4" />
    </UDropdown>
    <UModal v-model="isOpen" class="modalCenter">
      <div class="p-4">
        <div class="h-48" >

          <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" readonly/>
            </UFormGroup>

            <UFormGroup label="Телефон" name="phone">
              <UInput v-if="store.state.user.master==0" v-maska data-maska="+7 (###) ###-##-##" v-model="state.phone" />
              <UInput v-else v-maska data-maska="+7 (###) ###-##-##" v-model="state.phone" readonly/>
            </UFormGroup>

            <UFormGroup label="Специализация" name="profession">
              <UInput v-if="store.state.user.master==0" v-model="state.profession" />
              <UInput v-else v-model="state.profession" readonly/>
            </UFormGroup>
            <UFormGroup label="Фамилия" name="lastName">
              <UInput v-if="store.state.user.master==0" v-model="state.lastName" />
              <UInput v-else v-model="state.lastName" readonly/>
            </UFormGroup>
            <UFormGroup label="Имя" name="firstName">
              <UInput v-if="store.state.user.master==0" v-model="state.firstName" />
              <UInput v-else v-model="state.firstName" readonly/>
            </UFormGroup>

            <UButton v-if="store.state.user.master==0" type="submit">
              Отправить даннные
            </UButton>
            <UButton v-else @click="isOpen = false">
              Закрыть
            </UButton>

          </UForm>
        </div>
      </div>
    </UModal>
    <UModal v-model="isOpenProduct" class="modalCenter">
      <div class="p-4">
        <div class="h-48" >
          <UForm :state="product" class="space-y-4" >
            <UFormGroup label="Заголовок" name="title">
              <UInput v-model="product.title" />
            </UFormGroup>
            <UFormGroup label="Описание" name="body">
              <UTextarea v-model="product.body" />
            </UFormGroup>
            <UFormGroup label="Фото" name="photo" >
              <div style="display: flex">
                <img :src="product.img1" id="img1" style="width: 100px;height: 60px" @click="addPhoto"/>
                <img :src="product.img2" id="img2" style="width: 100px;height: 60px" @click="addPhoto"/>
                <img :src="product.img3" id="img3" style="width: 100px;height: 60px" @click="addPhoto"/>
                <img :src="product.img4" id="img4" style="width: 100px;height: 60px" @click="addPhoto"/>
              </div>
            </UFormGroup>
            <UButton @click="postProduct">
              Добавить
            </UButton>
          </UForm>
        </div>
      </div>
    </UModal>
    <UModal v-model="isOpenNews" class="modalCenter">
    <div class="p-4">
      <div class="h-48" >
        <UForm :state="news" class="space-y-4" >
          <UFormGroup label="Заголовок" name="title">
            <UInput v-model="news.title" />
          </UFormGroup>
          <UFormGroup label="Описание" name="body">
            <UTextarea v-model="news.body" />
          </UFormGroup>
          <UFormGroup label="Фото" name="photo" >
            <div style="display: flex">
              <img :src="news.img1" id="img1" style="width: 100px;height: 60px" @click="addPhotoNews"/>
              <img :src="news.img2" id="img2" style="width: 100px;height: 60px" @click="addPhotoNews"/>
              <img :src="news.img3" id="img3" style="width: 100px;height: 60px" @click="addPhotoNews"/>
              <img :src="news.img4" id="img4" style="width: 100px;height: 60px" @click="addPhotoNews"/>
            </div>
          </UFormGroup>
          <UButton @click="postNews">
            Добавить
          </UButton>
        </UForm>
      </div>
    </div>
  </UModal>
    <UModal v-model="isOpenRealEstate" class="modalCenter">
    <div class="p-4">
      <div class="h-48" >

        <addRealEstateForm :itemIn="realEstate"/>
          <UButton @click="postNews">
            Добавить
          </UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup>
// @ts-ignore
import { LocalNotifications } from '@capacitor/local-notifications';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { v4 as uuid } from "uuid"
const message = ref("")

const { $socket } = useNuxtApp()
const uid = uuid()

defineCustomElements(window);
const router = useRouter()

const isOpen = ref(false)
const isOpenProduct = ref(false)
const isOpenNews = ref(false)
const isOpenRealEstate = ref(false)
const { status, data, signOut, signIn } = useSession()
import { useStore } from 'vuex'
import AddRealEstateForm from "./forms/addRealestate/index.vue";
const store = useStore()
if(data?.value?.user){
  store.state.user = data?.value.user
}

const getPhoto = (img)=>{
  Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    source: CameraSource.Camera,
    resultType: CameraResultType.Base64
  }).then(image =>{
    product[img] = 'data:image/'+image.format+';base64, '+ image.base64String;
  })
}
const getPhotoNews = (img)=>{
  Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    source: CameraSource.Camera,
    resultType: CameraResultType.Base64
  }).then(image =>{
    news[img] = 'data:image/'+image.format+';base64, '+ image.base64String;
  })
}

const addPhotoNews = (event)=>{
  getPhotoNews(event.target.id)
}

const addPhoto = (event)=>{
  getPhoto(event.target.id)
}
const addRealEstate = ()=>{
  news.date = new Date().getTime()
  isOpenRealEstate.value = true
}

const addNews = ()=>{
  news.date = new Date().getTime()
  isOpenNews.value = true
}
const addProduct = ()=>{
  product.date = new Date().getTime()
  isOpenProduct.value = true
}
const postProduct = () =>{
      useAsyncData(
      'productPut',
      () => $fetch( `/api/product`, {
        method: 'PUT',
        baseURL: '/api/product',
        body:{
          data: product
        }
      })
  ).then(item=>{
        isOpenProduct.value = false
  })
}
const postNews = () =>{
  useAsyncData(
      'newsPut',
      () => $fetch( `/api/news`, {
        method: 'PUT',
        baseURL: '/api/news',
        body:{
          data: news
        }
      })
  ).then(item=>{
    isOpenNews.value = false
  })
}

const OpenEdit = function () {
  console.log( data?.value?.user?.email)
  useAsyncData(
      'master',
      () => $fetch( `/api/master`, {
        method: 'GET',
        baseURL: '/api/master',
        params: {
          email: data?.value?.user?.email
        }
      })
  ).then(item=>{
    if(item.data.value.rows[0]){
      state.phone = item.data.value.rows[0].phone
      state.profession = item.data.value.rows[0].profession
      state.firstName = item.data.value.rows[0].firstName
      state.lastName = item.data.value.rows[0].lastName
      isOpen.value = true
    }else{
      state.email = store.state.user.email
      state.profession = ''
      state.firstName = ''
      state.lastName = ''
      state.phone = ''
      isOpen.value = true
    }
  })
//  if(info){
//    state.phone = info.data.value.phone
//    state.profession = info.data.value.profession
//    state.firstName = info.data.value.firstName
//    state.lastName = info.data.value.lastName
//  }
}
const onSubmit = function (event) {
  // Do something with data
  const info = useAsyncData(
      'masterPost',
      () => $fetch( `/api/master`, {
        method: 'POST',
        baseURL: '/api/master',
        body:{
          data: event.data
        }
      })
  ).then(item=>{
    isOpen.value = false
  })

}
const state = reactive({
  email: undefined,
  phone: undefined,
  profession: undefined,
  firstName: undefined,
  lastName: undefined,
})
state.email = data?.value?.user?.email
const news = reactive({
  title: '',
  body: '',
  date: new Date().getTime()*1000,
  img1: '',
  img2: '',
  img3: '',
  img4: '',
})
const realEstate = reactive({
  title: '',
  Description: '',
  operation: '',
  date: new Date().getTime()*1000,
  img1: '',
  img2: '',
  img3: '',
  img4: '',
})
const product = reactive({
  email: store?.state?.user?.email,
  title: '',
  body: '',
  date: new Date().getTime()*1000,
  img1: '',
  img2: '',
  img3: '',
  img4: '',
})

let items = []
if(status.value == 'authenticated' ){
  if(store.state.user.master === 1 ){
    items = [
      [{
        label: 'Главная',
        icon: 'i-heroicons-home',
        to: '/'
      }],
      [{
        label: 'Добавить товар',
        icon: 'i-heroicons-magnifying-glass-20-solid',
        click: ()=>{addProduct()}
      }],
      [{
        label: 'Мои данные',
        icon: 'i-heroicons-magnifying-glass-20-solid',
        click: ()=>{OpenEdit()}
      }],
      [{
        label: 'Выйти',
        icon: 'i-heroicons-trash-20-solid',
        click: ()=>{signOut()}
      }]
    ]
  } else {
    items = [
      [{
        label: 'Главная',
        icon: 'i-heroicons-home',
        to: '/'
      }],
      [{
        label: 'Стать мастером',
        icon: 'i-heroicons-magnifying-glass-20-solid',
        click: ()=>{OpenEdit()}
      }],
      [{
        label: 'Выйти',
        icon: 'i-heroicons-trash-20-solid',
        click: ()=>{signOut()}
      }]
    ]
  }
  if(store.state.user.admin === 1){
    items = [
      [{
        label: 'Главная',
        icon: 'i-heroicons-home',
        to: '/'
      }],
      [{
        label: 'Добавить Недвижимость',
        icon: 'i-heroicons-magnifying-glass-20-solid',
        to: '/realestate/add'
      }],
      [{
        label: 'Добавить Новость',
        icon: 'i-heroicons-magnifying-glass-20-solid',
        click: ()=>{addNews()}
      }],
      [{
        label: 'Добавить товар',
        icon: 'i-heroicons-magnifying-glass-20-solid',
        click: ()=>{addProduct()}
      }],
      [{
        label: 'Стать мастером',
        icon: 'i-heroicons-magnifying-glass-20-solid',
        click: ()=>{OpenEdit()}
      }],
      [{
        label: 'Выйти',
        icon: 'i-heroicons-trash-20-solid',
        click: ()=>{signOut()}
      }]
    ]
  }


} else {
  items = [
    [{
      label: 'Главная',
      icon: 'i-heroicons-home',
      to: '/'
    }],
    [{
      label: 'Авторизоваться',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: ()=>{signIn()}
    }]
  ]

}

let ws;
onMounted(() => {
  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
//  ws = new WebSocket(`${wsProtocol}//${window.location.host}:3011`);
  ws = new WebSocket(`wss://firsovpro.online/websocket`);
  ws.onopen = () => console.log("connected");
  ws.onmessage = ({ data }) => {
    if(data=='reloadNews'){
      store.dispatch('getNews')
    }
    console.log("data", data);
  };
});
const sendMessage = () => {
  ws.send("hello");
};


//watch(() => status.value, () => {
//    console.log(status.value)
//    const { article } = await useFetch('http://192.168.7.165:3001/progress')
//    const sdata = await $fetch('http://192.168.7.165:3001/progress',{page:page.value}).catch((error) => error.data)
//    rows.length = 0
//    rows.concat(sdata.rows);
//  });
</script>

<style>
.h-48 {
  height: auto;
}

.items-end {
  align-items: center;
}
</style>