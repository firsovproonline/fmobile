<template>
    <div class="item">
      <router-link to="/master"><img src="~/assets/img/rabotnic.png"></router-link>
      <div class="label">Контакты мастеров</div>
    </div>
    <router-link to="/realestate" class="item" style="margin-top: 12px">
      <div><img src="~/assets/img/nedvi.jpg"></div>
      <div class="label">Недвижимость</div>
    </router-link>
    <div class="item" style="margin-top: 12px">
      <div><img src="~/assets/img/kontMer.png"></div>
      <div class="label">Адреса чиновников</div>
    </div>
</template>

<script>
export default {
  name: "pageFirst"
}
</script>

<style lang="scss" scoped>
  .item{
    cursor: pointer;
    position: relative;
    img{
      width: 100%;
    }
    .label{
      position: absolute;
      width: 100%;
      text-align: center;
      top: 160px;
      font-size: 38px;
      color: floralwhite;
      text-shadow: 4px 3px 0px #000000, 9px 8px 0px rgba(0,0,0,0.15);

    }
  }
</style>