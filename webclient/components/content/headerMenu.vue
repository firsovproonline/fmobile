<template>
    {{ data?.user?.name }}
    <UDropdown :items="items" >
      <UButton color="gray" variant="ghost" icon="i-heroicons-bars-4" />
    </UDropdown>
    <UModal v-model="isOpen" class="modalCenter">
      <div class="p-4">
        <div class="h-48" >
          1111 cccccccccccccccc
          ffffffffffffff
          fffff
          <a href="https://firsovpro.online:3001/auth/yandex">Авторизоваться</a>
        </div>
      </div>
    </UModal>
</template>

<script setup>
const { status, data, signOut, signIn } = useSession()
const isOpen = ref(false)
console.log(status, data)
const items = [
  [{
    label: 'Авторизоваться',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: ()=>{signIn()}
  }], [{
    label: 'Поиск',
    icon: 'i-heroicons-magnifying-glass-20-solid',
    click: ()=>{isOpen.value = true}
  }], [{
    label: 'Выйти',
    icon: 'i-heroicons-trash-20-solid',
    click: ()=>{signOut()}
  }]
]

</script>

<style>
.items-end {
  align-items: center;
}
</style>