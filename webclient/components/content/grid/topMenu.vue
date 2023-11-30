<script setup>
const columns = [ {
  key: 'title',
  label: 'Клиент'
}]
let pending = true
pending = false
const page = ref(1)
const rows = [
  {title : 'Новости побережья',
    img: '/img/radio.png',
    to: '/radio'
  },
  {title : 'Контакты мастеров',
    img: '/img/rabotnic.png',
    to: '/master'
  },
  {title : 'Ярмарка',
    img: '/img/product.jpg',
    to: '/products'
  },
  {title : 'Недвижимость',
    img: '/img/nedvi.jpg',
    to: '/realestate'
  },
  {title : 'Адреса чиновников',
    img: '/img/kontMer.png',
    to: '/'
  },
]

const router = useRouter()

const select  = (row)=> {
  router.push(row.to)
}
</script>

<template>
  <UTable :rows="rows" :loading="pending" :columns="columns" class="noheader" @select="select" >
    <template #title-data="{ row }" >
      <div :style="'height: 260px;background-image: url('+row.img+');background-size: cover;'" >
        <h2>{{row.title}}</h2>
      </div>
    </template>
  </UTable>
</template>

<style scoped>
.py-4 {
  padding-top: 3px;
  padding-bottom: 3px;
}
tr{
  border: none;
}

h2{
  position: relative;
  top: 120px;
  color: #fffaf0;
  font-size: 38px;
  text-align: center;
  text-shadow: 4px 3px 0 #000, 9px 8px 0 rgba(0,0,0,.15);
}
</style>