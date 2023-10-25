<template>
  <NuxtLayout name="default">
    <section class="row" style="min-height: calc(100vh - 180px);">
      <div class="center">
        <GridRealEstate />
      </div>
    </section>
  </NuxtLayout>
</template>

<script>
import GridRealEstate from "../../../components/gridSkeleton/realestate/index.vue";
export default {
  name: "index",
  components: {GridRealEstate}
}
</script>

<style scoped>

</style>