<script setup>
import GridProduct from "./gridProduct.vue";
definePageMeta({
   colorMode: 'light',
})
const { $storename, $storename2 } = useNuxtApp()
import { useStore } from 'vuex'
const store = useStore()
const user = store?.state?.user
const columns = [{
  key: 'title',
  label: 'Мастера'
}, {
  key: 'actions'
}]
const itemsAdmin1 = (row) => [
  [{
    label: 'Посмотреть товары',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => showProduct(row)
  }],
  [{
    label: 'Посмотреть данные',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }]
]
const items1 = (row) => [
  [{
    label: 'Редактировать',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }],[{
    label: 'Посмотреть товары',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => showProduct(row)
  }], [{
    label: 'Добавить товар',
    icon: 'i-heroicons-archive-box-20-solid'
  }], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid'
  }]
]
const items = (row) => [
  [{
    label: 'Посмотреть товары',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => showProduct(row)
  }],
  [{
    label: 'Пожаловаться',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }]
]
const itemsAdmin0 = (row) => [
  [{
    label: 'Посмотреть',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {editMaster(row)}
  }],
]
const items0 = (row) => [
  [{
    label: 'Редактировать',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }],
  [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid'
  }]
]
let pending = false
const status = ref(1)
const q = ref('')
const page = ref(0)
const pageCount = 15

const rows = computed(()=>{
  return store.state.master.rows
})
const total = computed(()=>{
  return store.state.master.total
})

watch(() => q.value, () => {
  store.dispatch('getMaster', {
    page: page,
    perPage:pageCount,
    q: q,
    status: status
  })
});
watch(() => status.value, () => {
  store.dispatch('getMaster', {
    page: page,
    perPage:pageCount,
    q: q,
    status: status
  })
})
watch(() => page.value, () => {
  store.dispatch('getMaster', {
    page: page,
    perPage:pageCount,
    q: q,
    status: status
  })
})
page.value = 1
const atatuses = [{
  name: 'Все',
  value: 1
}, {
  name: 'На модерировании',
  value: 0,
}, {
  name: 'Отклонены',
  value: 3
}]
const isOpen = ref(false)
const isOpenProduct = ref(false)
const state = reactive({
  email: undefined,
  phone: undefined,
  profession: undefined,
  firstName: undefined,
  lastName: undefined,
  status: undefined
})
const onSubmit = function (event) {
  // Do something with data
  useAsyncData(
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
const disallowMaster = function(){
  state.status = 3
  console.log(state)
}
const allowMaster = function(){
  state.status = 1
  useAsyncData(
      'allowMaster',
      () => $fetch( `/api/master`, {
        method: 'POST',
        baseURL: '/api/master',
        body:{
          data: state
        }
      })
  ).then(item=>{
    isOpen.value = false
  })
}
const editMaster = function (master) {
  // Do something with data
  useAsyncData(
      'master',
      () => $fetch( `/api/master`, {
        method: 'GET',
        baseURL: '/api/master',
        params: {
          email: master.email
        }
      })
  ).then(item=>{
    console.log(item.data.value.rows[0])
    if(item.data.value.rows[0]){
      state.email = item.data.value.rows[0].email
      state.phone = item?.data?.value?.rows[0]?.phone
      state.profession = item?.data?.value?.rows[0]?.profession
      state.firstName = item?.data?.value?.rows[0]?.firstName
      state.lastName = item?.data?.value?.rows[0]?.lastName
      state.status = item?.data?.value?.rows[0]?.status
      isOpen.value = true
    }else{
      state.email = user.email
      isOpen.value = true
    }
  })
}
const showProduct = (row)=>{
  isOpenProduct.value = true
}
</script>

<template>
  <UModal v-model="isOpenProduct" class="modalCenter">
    <div class="p-4">
      <div class="h-48" >
        <gridProduct />
      </div>
    </div>
  </UModal>
  <UModal v-model="isOpen" class="modalCenter">
    <div class="p-4">
      <div class="h-48" >

        <UForm :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" readonly/>
          </UFormGroup>

          <UFormGroup label="Телефон" name="phone">
            <UInput v-model="state.phone" readonly/>
          </UFormGroup>

          <UFormGroup label="Специализация" name="profession">
            <UInput v-model="state.profession" readonly/>
          </UFormGroup>
          <UFormGroup label="Фамилия" name="lastName">
            <UInput v-model="state.lastName" readonly/>
          </UFormGroup>
          <UFormGroup label="Имя" name="firstName">
            <UInput v-model="state.firstName" readonly/>
          </UFormGroup>
          <div style="display: flex">
            <UButton @click="allowMaster">
              Разрешить
            </UButton>
            <UButton @click="disallowMaster" style="margin-left: 12px">
              Запретить
            </UButton>
          </div>
        </UForm>
      </div>
    </div>
  </UModal>

  <div style="display: flex;justify-content: center;align-items: center;">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 findq" >
      <UInput v-model="q" placeholder="Поиск мастера..."  />
    </div>
    <USelect v-if="user.admin == 1" v-model="status" :options="atatuses" option-attribute="name" style="min-width: 110px;margin-right: 8px" >
    </USelect>
    <div style="min-width: 12px"></div>
  </div>



  <UTable :rows="rows" :loading="pending" :columns="columns" class="gridMaster" >
    <template #title-data="{ row }">
      <div style="display: flex;align-content: center;align-items: center;padding: 8px;">
        <UAvatar size="2xl" :src="row.photo" />
        <div style="padding-left: 8px">
          <div class="label" style="white-space: normal;min-width: 240px">{{row.profession}}</div>
          <div class="label">{{row.lastName}}</div>
          <div class="label">{{row.firstName}}</div>
        </div>
      </div>
      <div style="display: flex">
        <div v-if="row.status === 1" class="label">{{row.phone}}</div>
        <div v-if="row.status === 0" class="label">На модерировании</div>
        <a v-if="row.avito" style="margin-left: 12px" :href="row.avito" target="_blank">Avito</a>
      </div>
    </template>
      <template #actions-data="{ row }">
        <div style="display: flex;justify-content: center;align-items: center;">
          <UIcon v-if="row.status==0" name="i-heroicons-light-bulb" style="margin-right: 4px;width: 23px;height: 23px" />
          <UIcon v-if="row.status==1" name="i-heroicons-face-smile" style="margin-right: 4px;width: 23px;height: 23px" />
          <UIcon v-if="row.status==2" name="i-heroicons-face-frown" style="margin-right: 4px;width: 23px;height: 23px" />
        </div>
        <section v-if="user.admin == 0">
          <section v-if="user && user.email && row.email == user.email">
            <UDropdown v-if="row.status === 0"  :items="items0(row)">
              <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
            <UDropdown v-if="row.status === 1"  :items="items1(row)">
              <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </section>
          <section v-else>
            <UDropdown v-if="row.status === 1"  :items="items(row)">
              <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </section>
        </section>
        <section v-if="user.admin == 1">
          <UDropdown v-if="row.status === 0"  :items="itemsAdmin0(row)">
            <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
          <UDropdown v-if="row.status === 1"  :items="itemsAdmin1(row)">
            <UButton  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </section>
      </template>
  </UTable>
  <div class="flex justify-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <UPagination v-model="page" :page-count="pageCount" :total="total" />
  </div>
</template>

<style>

.gridMaster table tr:nth-child(odd ){
  background-image: url("/img/item_news_bg1.png") !important;
  border-radius: 15px; /* Уголки */
  padding: 4px;

}
.gridMaster table tr:nth-child(even ){
  background-image: url("/img/item_news_bg2.png") !important;
  border-radius: 15px; /* Уголки */
  padding: 4px;

}

.gridMaster table tr:nth-child(odd ) .label {
  color: #000000;
}

.gridMaster table tr:nth-child(even ) .label {
  color: #fffaf0;
}

 .i-heroicons-face-smile{
   width: 22px;
   height: 22px;
 }

 .findq{
   width: 90%;
 }
.findq input{
  width: 100% !important;
}
.findq div{
  width: 100% !important;
}

</style>