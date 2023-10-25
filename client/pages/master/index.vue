<template>
  <NuxtLayout name="default">
    <section class="row" style="min-height: calc(100vh - 180px);">
      <div class="center">
        <GridMaster />
      </div>
    </section>
  </NuxtLayout>
</template>

<script>
import GridMaster from "../../components/gridSkeleton/gridMaster/index.vue";
export default {
  name: "index",
  layout: 'default',
  components: {GridMaster}
}
</script>

<style scoped>

</style>