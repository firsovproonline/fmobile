<template>
  {{item.firstName}}
  {{item.lastName}}
  {{item.id}}
</template>

<script>
export default {
  name: "info",
  computed:{
    item(){
      if(this.$route.params && this.$route.params.id)
        return this.$store.getters.master.find(({ id }) => id == this.$route.params.id)
      else
        return {id:-1}

    }
  }
}
</script>

<style scoped>

</style>