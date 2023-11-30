<template>
  <div style="display: flex;justify-content: center;flex-wrap: wrap;">
    <img :src="items.img1 == '' ? '/img/addImg.png':items.img1" id="img1" style="width: auto;height: 75px" @click="addPhoto"/>
    <img v-if="items.img1 !== ''" :src="items.img2 == '' ? '/img/addImg.png':items.img2" id="img2" style="width: auto;height: 75px" @click="addPhoto"/>
    <img v-if="items.img2 !== ''" :src="items.img3 == '' ? '/img/addImg.png':items.img3" id="img3" style="width: auto;height: 75px" @click="addPhoto"/>
    <img v-if="items.img3 !== ''" :src="items.img4 == '' ? '/img/addImg.png':items.img4" id="img4" style="width: auto;height: 75px" @click="addPhoto"/>
  </div>

</template>

<script>
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

export default {
  name: 'addImages',
  props: {
    items: {}
  },
  methods:{
    addPhoto(event){
      Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
      }).then(image => {
        this.items[event.target.id] = 'data:image/' + image.format + ';base64, ' + image.base64String;
      })
    }
  },
  mounted() {
    console.log(this.items)
  }
}
</script>

<style scoped>
  img{
    margin: 3px;
  }
</style>