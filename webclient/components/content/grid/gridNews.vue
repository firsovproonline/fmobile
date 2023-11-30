<template>
    <UTable :rows="items" :columns="columns" class="noheader" style="margin-top: 12px" >
      <template  #title-data="{ row }">
        <UContainer v-if="!this.itemMinimal" :class=" row.id % 2 === 0 ? 'rborder':'rborder1'">
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
          <div style="height: 2px;border-top: 1px solid"></div>
          <img :src="'/api/image?d=news&i=1&r='+ row.id" style="width:100%;"/>
<!--
          <div v-if="row && !row.video" :style="'height: 240px;background-image: url('+'/api/image?d=news&i=1&r='+ row.id+');background-size: contain;'+
'    background-repeat: no-repeat;'+
'    background-position: center;'">

          </div>
-->
          <div style="white-space: normal;width: 100%;">
            {{row.body}}
          </div>
          <video v-if="row && row.video" :src="row.video" :poster="row.img1" controls style="height: 200px;width: 100%">
          </video>
        </UContainer>
        <UContainer v-else :class=" row.id % 2 === 0 ? 'rborder':'rborder1'">
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
          <div style="display: flex">
            <img :src="'/api/image?d=news&i=1&r='+ row.id" style="width:150px;border-radius: 12px"/>
            <div style="white-space: normal;width: 100%;padding: 3px;padding-top: 0px">
              {{row.body}}
            </div>
          </div>
          <div style="text-align: end;padding-right: 8px">Подробнее</div>

        </UContainer>
      </template>

    </UTable>
    <div class="flex justify-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="perPage" :total="total" />
    </div>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "gridNews",
  props: {
    itemMinimal: false
  },
  data: () => ({
    columns: [{
      key: 'title',
      label: 'Клиент'
    }],
    user: {
      real_name: ''
    },
    store: useStore(),
    page : 0,
    perPage: 15
  }),
  computed:{
    items(){
      return this?.store?.state?.news.rows;
    },
    total(){
      return this?.store?.state?.news.total;
    }
  },
  watch:{
    page(value){
      this.store.dispatch('getNews', {
        page: value,
        perPage: this.perPage
      })

    }
  },
  mounted() {
    this.page = 1
    console.log(this.itemMinimal)
  }
}
</script>

<style>
  .rborder{
    background-image: url("/img/item_news_bg1.png") !important;
    border-radius: 15px; /* Уголки */
    padding: 4px;
  }
  .rborder * {
    color: #000000;
  }
  .rborder1{
    background-image: url("/img/item_news_bg2.png") !important;
    border-radius: 15px; /* Уголки */
    padding: 4px;

  }
  .rborder1 * {
    color: #fffaf0;
  }

  .py-4 {
    padding-top: 4px;
    padding-bottom: 4px;
  }

</style>