<template>
  <div class="mainDiv">
    <div class="button" style="margin-left: 12px">
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-three-bars Button-visual">
        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
      </svg>
    </div>
    <div style="margin-left: 12px;width: 100%;text-align: center;" ref="info">Справочник побережья</div>
  </div>
</template>

<script>
import { App } from '@capacitor/app';

export default {
  name: "mobileMenu",
  mounted() {
    //App.addListener('backButton', (state) => {
    //  this.$refs.info.innerHTML ='Выход из программы;';
    //});
  }
}
</script>

<style scoped>
  .mainDiv{
    position: fixed;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    min-height: 42px;
    border-bottom: 1px solid #2d3239;
    width: 100%;
    top: 0px;
    z-index: 3000;
    background: darkgray;
    font-size: 22px;
  }
  .button{
    cursor: pointer;
    padding: 4px;
  }
</style>