<template>
      <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-primary-200/75 dark:border-primary-900/50 topMdiv">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div class="flex items-center justify-between gap-3 h-[--header-height]">
            <div class="lg:flex-1 flex items-center gap-1.5 " style="padding: 12px;padding-left: 4px;padding-right: 4px;width: 100%">
              <div style="width: 100%;display: flex">
                <select v-model="$colorMode.preference" style="width: 1px">
                  <option value="system">System</option>
                  <option value="light" selected>Light</option>
                  <option value="dark">Dark</option>
                  <option value="sepia">Sepia</option>
                </select>
                <audio controls autoplay  style="height: 28px;max-width: 90%">
                  <source src="https://firsovpro.online/stream" type="audio/aac">
                </audio>
              </div>
              <HeaderMenu />
            </div>
          </div>
        </div>
      </header>
      <UContainer>
        <slot />
      </UContainer>

</template>

<style>

</style>
<script>
import HeaderMenu from "../components/content/headerMenu.vue";
export default {
  components: {HeaderMenu},
}
</script>

<style>
 body {
   background-image: url("/img/bg2.jpg");
   background-size: cover;
 }
 html {
   min-height: 100%;
 }
 body {
   min-height: 100%;
 }
 .topMdiv{
   background-image: url("/img/bar_new.png") !important;
   background-size: cover;

 }
</style>