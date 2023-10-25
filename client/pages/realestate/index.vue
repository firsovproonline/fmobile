<template>
  <NuxtLayout name="default">
    <section class="row" style="min-height: calc(100vh - 180px);">
      <div class="center">
        <router-link to="/realestate/sale" >
          <div class="item" style="background-image: url(/img/prodaga.png)">
            <div class="label">Покупка</div>
          </div>
        </router-link>
        <router-link to="/realestate" class="item" >
            <div class="item" style="background-image: url(/img/arenda1.png);margin-top: 12px">
              <div class="label" >Посуточно</div>
            </div>
        </router-link>
      </div>
    </section>
  </NuxtLayout>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.item{
  text-align: center;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 210px;
  background-size: cover;
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