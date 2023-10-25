<template>
    <NuxtLayout name="default">
      <section class="row">
        <div class="center">
          <h1>Фото</h1>
          <img ref="imageElement" />
        </div>
      </section>
    </NuxtLayout>
</template>

<script>
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

export default {
  name: "indexPhoto",
  layout: 'default',
  mounted() {
    defineCustomElements(window);
    this.getPhoto()
  },
  methods:{
    async getPhoto(){
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
      });
      this.$refs.imageElement.src ='data:image/'+image.format+';base64, '+ image.base64String;
    }
  }
}
</script>

<style>
 #_capacitor-camera-input{
   width: 1px;
   height: 1px;
   opacity: 0;
 }
</style>