<template>
  <NuxtLayout name="default">
    <section class="row" style="min-height: calc(100vh - 180px);">
      <div class="center">
        <info />
      </div>
    </section>
  </NuxtLayout>
</template>

<script>
import Info from "../../components/gridSkeleton/gridMaster/info.vue";

export default {
  name: "masterInfoPage",
  components: {Info},
}
</script>

<style scoped>

</style>