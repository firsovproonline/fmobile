<template>
  <div style="padding: 8px">
    <AddRealEstateForm :itemIn="realEstate" />
  </div>
</template>

<script>
import AddRealEstateForm from "../../../components/content/forms/addRealestate/index.vue";
export default {
  name: "index",
  components: {AddRealEstateForm},
  data: () => ({
    realEstate : reactive({
      title: '',
      Description: '',
      operation: '',
      date: new Date().getTime()*1000,
      img1: '',
      img2: '',
      img3: '',
      img4: '',
    })
  }),
}
</script>

<style scoped>

</style>