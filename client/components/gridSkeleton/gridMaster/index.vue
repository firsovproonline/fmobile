<template>
  <itemM v-for="(value, index) in items" :key="index" :item="value" />
</template>

<script>
import ItemM from "./item.vue";
export default {
  name: "gridMaster",
  components: {ItemM},
  computed:{
    items(){
      return this.$store.getters.master
    }
  }
}
</script>

<style scoped>

</style>