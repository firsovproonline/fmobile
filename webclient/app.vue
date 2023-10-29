<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
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

<style>
:root  {
  --color-primary-50: 132 204 22;
  --color-primary-100: 132 204 122;
}

.text-primary-500 {
  --tw-text-opacity: 1;
  color:#ffffff;
}
</style>