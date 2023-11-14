<template>
  <UAvatar v-if="data?.user?.image"
      :src="data?.user?.image"
      alt="benjamincanac"
  />
    {{ data?.user?.name }}
    <UDropdown :items="items" >
      <UButton color="gray" variant="ghost" icon="i-heroicons-bars-4" />
    </UDropdown>
    <UModal v-model="isOpen" class="modalCenter">
      <div class="p-4">
        <div class="h-48" >

          <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" readonly/>
            </UFormGroup>

            <UFormGroup label="Телефон" name="phone">
              <UInput v-model="state.phone" />
            </UFormGroup>

            <UFormGroup label="Специализация" name="profession">
              <UInput v-model="state.profession" />
            </UFormGroup>
            <UFormGroup label="Фамилия" name="lastName">
              <UInput v-model="state.lastName" />
            </UFormGroup>
            <UFormGroup label="Имя" name="firstName">
              <UInput v-model="state.firstName" />
            </UFormGroup>

            <UButton type="submit">
              Submit
            </UButton>
          </UForm>
        </div>
      </div>
    </UModal>
</template>

<script setup>
// @ts-ignore
import { LocalNotifications } from '@capacitor/local-notifications';



const isOpen = ref(false)
const { status, data, signOut, signIn } = useSession()
import { useStore } from 'vuex'
const store = useStore()
if(data?.value?.user){
  store.state.user = data?.value.user
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

if(state.email){

  const info = await useAsyncData(
      'master',
      () => $fetch( `/api/master`, {
        method: 'GET',
        baseURL: '/api/master',
        params: {
          email: data?.value?.user?.email
        }
      })
  );
  if(info){
    state.phone = info.data.value.phone
    state.profession = info.data.value.profession
    state.firstName = info.data.value.firstName
    state.lastName = info.data.value.lastName

  }
}


let items = []
if(status.value == 'authenticated' ){
  items = [
    [{
      label: 'Личный кабинет',
      icon: 'i-heroicons-magnifying-glass-20-solid',
      click: ()=>{isOpen.value = true}
    }],[{
      label: 'Стать мастером',
      icon: 'i-heroicons-magnifying-glass-20-solid',
      click: ()=>{isOpen.value = true}
    }], [{
      label: 'Выйти',
      icon: 'i-heroicons-trash-20-solid',
      click: ()=>{signOut()}
    }]
  ]
} else {
  items = [
    [{
      label: 'Авторизоваться',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: ()=>{signIn()}
    }]
  ]

}
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