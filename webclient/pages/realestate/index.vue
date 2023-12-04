<template>
<div>
  <AddRealEstateForm :itemIn="item" />
</div>
</template>

<script>
import AddRealEstateForm from "../../components/content/forms/addRealestate/index.vue";
export default {
  name: "index",
  components: {AddRealEstateForm},
  data: () => ({
    item:{}
  }),
  mounted() {
      $fetch( `/api/realestate`, {
        method: 'GET',
        params: {

        }
      }).then(items=>{
        for(let key in items.fields){
          items[key] = items.fields[key]
        }

        this.item = items
        delete this.item.fields
        this.item['operation'] = 'Продаю'
        console.log('initems',items)
      })
  }
}
</script>

<style scoped>

</style>