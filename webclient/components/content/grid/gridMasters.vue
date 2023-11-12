<script setup>
const columns = [{
  key: 'title',
  label: 'Клиент'
}, {
  key: 'actions'
}]

const items = (row) => [
  [{
    label: 'Редактировать',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row)
  }], [{
    label: 'В архив',
    icon: 'i-heroicons-archive-box-20-solid'
  }], [{
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
    () => $fetch( `https://firsovpro.online:3001/master`, {
      method: 'GET',
      baseURL: 'https://firsovpro.online:3001/master',
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
console.log(rows)
</script>

<template>
  <UTable :rows="rows.rows" :loading="pending" :columns="columns" class="noheader" >
    <template #title-data="{ row }">
      <div style="display: flex;align-content: center;align-items: center;padding: 8px;">
        <img :src="row.photo">
        <div style="padding-left: 8px">
          <div class="label">{{row.lastName}}</div>
          <div class="label">{{row.firstName}}</div>
          <div class="label">{{row.profession}}</div>
        </div>
      </div>
      <div style="display: flex">
        <div>{{row.phone}}</div>
        <a v-if="row.avito" style="margin-left: 12px" :href="row.avito" target="_blank">Avito</a>
      </div>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <UPagination v-model="page" :page-count="pageCount" :total="rows.total" />
  </div>
</template>
