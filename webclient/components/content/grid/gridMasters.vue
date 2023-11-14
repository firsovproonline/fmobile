<script setup>
const { $storename, $storename2 } = useNuxtApp()
import { useStore } from 'vuex'
const store = useStore()
const user = store?.state?.user

console.log(user.email)

const columns = [{
  key: 'title',
  label: 'Клиент'
}, {
  key: 'actions'
}]

const items1 = (row) => [
  [{
    label: 'Редактировать',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }],[{
    label: 'Посмотреть товары',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
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
    click: () => console.log('Edit', row)
  }],
  [{
    label: 'Пожаловаться',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }]
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

let pending = true
pending = false
const page = ref(1)
const pageCount = 15
const { data: rows, error } = await useAsyncData(
    'progress',
    () => $fetch( `/api/master`, {
      method: 'GET',
      baseURL: '/api/master',
      params: {
        page: page.value,
        perPage:pageCount
      }
    } ), {
      watch: [
        page,
      ]
    }
);
</script>

<template>
  <UTable :rows="rows.rows" :loading="pending" :columns="columns" class="noheader" >
    <template #title-data="{ row }">
      <div style="display: flex;align-content: center;align-items: center;padding: 8px;">
        <UAvatar size="2xl" :src="row.photo" />
        <div style="padding-left: 8px">
          <div class="label">{{row.lastName}}</div>
          <div class="label">{{row.firstName}}</div>
          <div class="label" style="white-space: normal;width: 200px">{{row.profession}}</div>
        </div>
      </div>
      <div style="display: flex">
        <div>{{row.phone}}</div>
        <a v-if="row.avito" style="margin-left: 12px" :href="row.avito" target="_blank">Avito</a>
      </div>
    </template>
    <template #actions-data="{ row }">
      <div style="display: flex;justify-content: center;align-items: center;">
        <UIcon v-if="row.status==0" name="i-heroicons-light-bulb" style="margin-right: 4px;width: 23px;height: 23px" />
        <UIcon v-if="row.status==1" name="i-heroicons-face-smile" style="margin-right: 4px;width: 23px;height: 23px" />
        <UIcon v-if="row.status==2" name="i-heroicons-face-frown" style="margin-right: 4px;width: 23px;height: 23px" />
      </div>
      <section v-if="row.email == user.email">
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
    </template>
  </UTable>
  <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <UPagination v-model="page" :page-count="pageCount" :total="rows.total" />
  </div>
</template>

<style scoped>
 .i-heroicons-face-smile{
   width: 22px;
   height: 22px;
 }
</style>