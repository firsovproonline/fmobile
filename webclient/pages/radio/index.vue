<template>
  <table style="width: 100%;margin-top: 20px">
    <tr>
      <td style="width: 20%"></td>
      <td>
        <audio controls autoplay >
          <source src="https://firsovpro.online/stream" type="audio/aac">
        </audio>
      </td>
      <td style="width: 20%"></td>
    </tr>
  </table>
  <GridNews />
</template>

<script setup>
import GridNews from "../../components/content/grid/gridNews.vue";

definePageMeta({ auth: false })

</script>

<style scoped>

</style>