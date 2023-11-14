<template>
    <UTable :rows="items" :columns="columns" class="noheader" style="margin-top: 12px" >
      <template #title-data="{ row }">
        <UContainer class="rborder">
          <h3 style="text-align: center" class="title">
            {{row.title}}
          </h3>
          <div v-if="!row.video" :style="'height: 200px;background-image: url('+row.img1+');background-size: cover;'">

          </div>
          <div style="white-space: normal;width: 100%">
            {{row.body}}
          </div>
          <video v-if="row.video" :src="row.video" poster="/help.jpg" controls style="height: 200px;width: 100%">
            This is fallback content to display if the browser
            does not support the video element.
          </video>
        </UContainer>
      </template>
    </UTable>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "gridNews",
  data: () => ({
    columns: [{
      key: 'title',
      label: 'Клиент'
    }],
    user: {
      real_name: ''
    }
  }),
  computed:{
    items(){
      const store = useStore()
      return store?.state?.news.rows;
    }
  },
  mounted() {
    console.log(this.items)
  }
}
</script>

<style scoped>
  .rborder{
    padding: 4px;
    box-shadow: 4px 3px 4px 0px #cfcfcf;
  }
</style>