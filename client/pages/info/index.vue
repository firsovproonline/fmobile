<template>
    <NuxtLayout name="default">
      <section class="row">
        <div class="center">
          <h1>Responsive HTML5/CSS3 template</h1>
        </div>
      </section>
    </NuxtLayout>
</template>

<script>
import { Device } from '@capacitor/device';

const logDeviceInfo = async () => {
  const info = await Device.getInfo();

  console.log(info);
};
export default {
  name: "indexInfo",
  layout: 'default',
  methods:{

  },
  mounted() {
    logDeviceInfo();
  }
}
</script>

<style scoped>

</style>