<template>
      <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-primary-200/75 dark:border-primary-900/50">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div class="flex items-center justify-between gap-3 h-[--header-height]">
            <div class="lg:flex-1 flex items-center gap-1.5" style="padding: 12px;padding-left: 4px;padding-right: 4px;width: 100%">
              <ColorScheme><USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" /></ColorScheme>
              <div style="width: 100%"></div>
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
  components: {HeaderMenu}
}
</script>