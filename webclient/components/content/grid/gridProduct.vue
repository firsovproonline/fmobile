<template>
  <UTable :rows="items" :columns="columns" class="noheader" style="margin-top: 12px" >
    <template #title-data="{ row }">
      <UContainer :class=" row.id % 2 === 0 ? 'rborder':'rborder1'">
        <h3 style="text-align: center;padding-top: 6px" class="title">
          <div style="display: flex;justify-content: space-between;">
            <div>
              {{row.title}}
            </div>
            <div>
              {{new Date(row.date).toLocaleDateString()}}
            </div>
          </div>
        </h3>
        <img :src="'/api/image?d=product&i=1&r='+ row.id" style="width:100%;"/>
        <div style="display: flex">
          <div style="white-space: normal;width: 100%;padding-left: 4px;padding-right: 4px">
            {{row.body}}
          </div>
        </div>
        <div style="display: flex">
          <div>{{row.phone}}</div>
          <div style="margin-left: 12px">{{row.firstName}}</div>
        </div>
      </UContainer>
    </template>
  </UTable>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "gridProduct",
  data: () => ({
    columns: [{
      key: 'title',
      label: 'Ярмарка'
    }],
    store: useStore()
  }),
  computed:{
    items(){
      return this?.store?.state?.product.rows;
    }
  },
  mounted() {
    useAsyncData(
        'product',
        () => $fetch( `/api/product`, {
          method: 'GET',
          baseURL: '/api/product',
        } )
    ).then(items=>{
      this.store.state.product = items.data.value
    })
  }

}
</script>

<style >
.rborder{
  background-image: url("/img/item_news_bg1.png") !important;
  border-radius: 15px; /* Уголки */
  padding: 4px;
}
.rborder1{
  background-image: url("/img/item_news_bg2.png") !important;
  border-radius: 15px; /* Уголки */
  padding: 4px;

}
.rborder * {
  color: #000000;
}

.rborder1 * {
  color: #fffaf0;
}

.py-4 {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>