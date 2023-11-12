<script setup>
  import { CapacitorHttp } from '@capacitor/core';

  let infoD = '11111111111111111111111'
  const columns = [{
    key: 'calldate',
    label: 'Дата звонка'
  }, {
    key: 'title',
    label: 'Клиент'
  }, {
    key: 'actions'
  }]

  const items = (row) => [
    [{
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Edit', row.uid)
    }], [{
      label: 'Archive',
      icon: 'i-heroicons-archive-box-20-solid'
    }], [{
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid'
    }]
  ]

  let pending = true
  pending = false
  const page = ref(1)
  const pageCount = 15
  const { data: rows, error } = await useAsyncData(
    'progress',
    () => $fetch( `http://firsovpro.online:3001/progress`, {
      method: 'GET',
      baseURL: 'http://firsovpro.online:3001/progress',
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

//  watch(() => page.value, () => {
//    console.log(page.value)
//    const { article } = await useFetch('http://192.168.7.165:3001/progress')
//    const sdata = await $fetch('http://192.168.7.165:3001/progress',{page:page.value}).catch((error) => error.data)
//    rows.length = 0
//    rows.concat(sdata.rows);
//  });
</script>

<template>
  <UTable :rows="rows.rows" :loading="pending" :columns="columns" class="noheader" >
    <template #title-data="{ row }">
      <div>3333333333333333333333333</div>
    </template>
    <template #actions-data="{ row }">
      <div>sssssssssssssss</div>
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <UPagination v-model="page" :page-count="pageCount" :total="rows.total" />
  </div>
</template>
