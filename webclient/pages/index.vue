<template>
  <div style="padding-left: 4px;padding-right: 4px">
    <top-menu />
  </div>
  <!--
<UCard class="mt-10">
  <template #header>
    <div class="flex justify-between">
    </div>
  </template>
  <div class="flex flex-wrap" >
    <UContainer class="mt--10 flex-col" style="max-width: 300px;min-width: 300px" >
      <UAccordion :items="items" class="grey1">
        <template #item="{ item }">
          <p class="italic text-gray-900 dark:text-white text-center">
            {{ item.description }}
          </p>
        </template>

        <template #getting-started>
          <div class="text-red-400 dark:text-white text-center">
            <p class="text-sm text-red-400 dark:text-gray-400 mt-2">
              192.168.1.444
            </p>
          </div>
        </template>

        <template #installation="{ description }">
          <div class="flex flex-col justify-center items-center gap-1 mb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Installation
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Install <code>@nuxt/ui</code> dependency to your project:
            </p>
            <p>
              {{ description }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <code>$ npm install @nuxt/ui</code>
            <code>$ yarn add @nuxt/ui</code>
            <code>$ pnpm add @nuxt/ui</code>
          </div>
        </template>
      </UAccordion>
    </UContainer>
    <UContainer class="flex-auto">
      <GridImpression />
    </UContainer>
  </div>
</UCard>
-->
</template>

<script setup>
definePageMeta({ auth: false })
import GridImpression from "../components/content/grid/gridImpression.vue";
import TopMenu from "../components/content/grid/topMenu.vue";

const items = [{
  label: 'Клиенты',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  slot: 'getting-started'
}, {
  label: 'Звонки',
  icon: 'i-heroicons-arrow-down-tray',
  defaultOpen: false,
  slot: 'installation'
}, {
  label: 'Помещения',
  icon: 'i-heroicons-eye-dropper',
  defaultOpen: false,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}]
</script>
