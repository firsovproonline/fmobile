<template>
  <UModal v-model="isOpen" class="modalCenter">
    <div class="p-4">
      <div class="h-48" >
        <PdfCottageSale :item="item" :spr="spr" />
      </div>
    </div>
  </UModal>
    <UForm :state="item" class="space-y-4 rborder" >
      <UFormGroup>
        <div style="display: flex">
          <UFormGroup label="Операция" >
            <USelect v-model="item.operation" :options="operations" />
          </UFormGroup>
          <div style="width: 8px"></div>
          <UFormGroup v-if="item.operation=='Сдаю'" label="срок" >
            <USelect v-if="item.operation=='Сдаю'" v-model="item.period" :options="periods"  />
          </UFormGroup>
          <UFormGroup v-if="item.operation=='Продаю'" label="Тип" >
            <USelect  v-model="item.Category"  option-attribute="name" :options="objectTypesSale"  />
          </UFormGroup>
          <div style="width: 8px"></div>
          <UFormGroup v-if="item.TotalArea!==null && item.operation=='Продаю'" label="Пл. м²" >
            <UInput v-model="item.TotalArea" v-maska data-maska="0.99" data-maska-tokens="0:\d:multiple|9:\d:optional" style="width: 100px" class="centerInput" />
          </UFormGroup>
        </div>
        <div style="height: 8px"></div>
        <div v-if="item.operation=='Сдаю'">
          <USelect v-if="item.operation=='Сдаю' && item.period=='Посуточно'" v-model="item.Category"  option-attribute="name" :options="objectTypesRentDaily"  />
          <div style="height: 8px"></div>
          <UFormGroup v-if="item.Category=='dailyHouseRent'" >
            <div style="display: flex" class="centerInput">
              <UFormGroup v-if="item?.FloorsCount" label="Этажей" >
                <UInput v-if="item?.FloorsCount" v-model="item.FloorsCount" v-maska data-maska="##" style="width: 40px" class="centerInput" />
              </UFormGroup>
              <div style="width: 6px"></div>
              <UFormGroup v-if="item?.BedsCount" label="сп. мест" >
                <UInput v-if="item?.BedsCount" v-model="item.BedsCount" v-maska data-maska="##" style="width: 40px" />
              </UFormGroup>

            </div>

          </UFormGroup>
        </div>
        <div v-if="item.operation=='Продаю'">

          <div>
            <div style="display: flex;align-items: center;">
              <div style="width: 98%"><hr /></div>
              <div style="margin-left: 6px">Здание</div>
              <UButton color="black" variant="ghost" icon="i-heroicons-bars-4" @click="showBuilding = !showBuilding" />
            </div>
            <div v-if="showBuilding" style="display: flex;flex-wrap: wrap;" id="dch">
              <UFormGroup v-if="item.FloorsCount !== null" label="Этажей" >
                <UInput  v-model="item.FloorsCount" v-maska data-maska="##" style="width: 40px" class="centerInput" />
              </UFormGroup>
              <div style="width: 8px"></div>
              <UFormGroup v-if="item.BuildYear !== null" label="Год стр." >
                <UInput  v-model="item.BuildYear" v-maska data-maska="####" style="width: 50px" class="centerInput" />
              </UFormGroup>
              <div style="flex: auto"></div>
              <UFormGroup v-if="item.HeatingType!==null" label="Отопление" >
                <USelect  v-model="item.HeatingType"  option-attribute="name" :options="HeatingTypes"  />
              </UFormGroup>
              <UFormGroup v-if="item.gasType!==null" label="Газоснабжение" >
                <USelect  v-model="item.gasType"  option-attribute="name" :options="gasTypes"  />
              </UFormGroup>
              <div style="flex: auto"></div>
              <UFormGroup v-if="item.Drainage!==null" label="Канализация" >
                <USelect  v-model="item.Drainage"  option-attribute="name" :options="Drainages"  />
              </UFormGroup>
              <UFormGroup v-if="item.SuburbanWaterType!==null" label="Водоснабжение" >
                <USelect  v-model="item.SuburbanWaterType"  option-attribute="name" :options="SuburbanWaterTypes"  />
              </UFormGroup>
              <div style="flex: auto"></div>
              <UFormGroup v-if="item.Condition!==null" label="Состояние дома" >
                <USelect  v-model="item.Condition"  option-attribute="name" :options="Conditions"  />
              </UFormGroup>
              <UFormGroup v-if="item.MaterialType!==null" label="Материал дома" >
                <USelect  v-model="item.MaterialType"  option-attribute="name" :options="MaterialTypes"  />
              </UFormGroup>
            </div>
          </div>


          <div>
            <div style="display: flex;align-items: center;">
              <div style="width: 98%"><hr /></div>
              <div style="margin-left: 6px">Особенности</div>
              <UButton color="black" variant="ghost" icon="i-heroicons-bars-4" @click="showTab1 = !showTab1" />
            </div>
            <div v-if="showTab1" style="display: flex;flex-wrap: wrap;" id="dch">
              <UCheckbox v-if="item.HasElectricity!==null" label="электричество" color="cyan"  v-model="item.HasElectricity" />
              <UCheckbox v-if="item.HasWater!==null" label="вода" color="cyan"  v-model="item.HasWater" />
              <UCheckbox v-if="item.HasGas!==null" label="газ" color="cyan"  v-model="item.HasGas" />
              <UCheckbox v-if="item.HasDrainage!==null" label="канализация" color="cyan"  v-model="item.HasDrainage" />
              <UCheckbox v-if="item.HasSecurity!==null" label="охрана" color="cyan"  v-model="item.HasSecurity" />
              <UCheckbox v-if="item.HasBathhouse!==null" label="Баня" color="cyan"  v-model="item.HasBathhouse" />
              <UCheckbox v-if="item.HasGarage!==null" label="Гараж" color="cyan"  v-model="item.HasGarage" />
              <UCheckbox v-if="item.HasPool!==null" label="бассейн" color="cyan"  v-model="item.HasPool" />
              <UCheckbox v-if="item.HasTerrace!==null" label="терраса" color="cyan"  v-model="item.HasTerrace" />
              <UCheckbox v-if="item.HasCellar!==null" label="погреб" color="cyan"  v-model="item.HasCellar" />

            </div>
          </div>

          <div>
            <div style="display: flex;align-items: center;">
              <div style="width: 98%"><hr /></div>
              <div style="margin-left: 6px">Участок</div>
              <UButton color="black" variant="ghost" icon="i-heroicons-bars-4" @click="showLand = !showLand" />
            </div>
            <div v-if="showLand" style="display: flex;flex-wrap: wrap;" id="dch">
              <UFormGroup v-if="item.PermittedLandUseType!==null" label="использования участка" >
                <USelect  v-model="item.PermittedLandUseType"  option-attribute="name" :options="PermittedLandUseTypes"  />
              </UFormGroup>
              <div style="width: 8px"></div>
              <UFormGroup label="Пл." >
                <UInput v-model="item.Area" v-maska data-maska="0.99" data-maska-tokens="0:\d:multiple|9:\d:optional" style="width: 80px" class="centerInput" />
              </UFormGroup>
              <div style="width: 8px"></div>
              <UFormGroup v-if="item.AreaUnitType!==null" label="изм." >
                <USelect  v-model="item.AreaUnitType"  option-attribute="name" :options="AreaUnitTypes"  />
              </UFormGroup>
            </div>
            <div v-if="showLand" style="display: flex;flex-wrap: wrap;align-items: center;justify-content: space-evenly;" id="dch">
              <UCheckbox v-if="item.IsLandWithContract!==null" label="участок с подрядом" color="cyan"  v-model="item.IsLandWithContract" />
              <div style="margin-left: 8px;font-size: 15px">Категория земли</div>
              <USelect  v-model="item.LandCategory"   option-attribute="name" :options="LandCategorys"  />

            </div>


          </div>
          <div>
            <div style="display: flex;align-items: center;">
              <div style="width: 98%"><hr /></div>
              <div style="margin-left: 6px;white-space: nowrap">Условия сделки</div>
              <UButton color="black" variant="ghost" icon="i-heroicons-bars-4" @click="showBargainTerms = !showBargainTerms" />
            </div>
            <div v-if="showBargainTerms" style="display: flex;align-items: center;justify-content: space-between;" id="dch">
              <div style="display: flex;align-items: center;width: 100px">
                <UFormGroup v-if="item.Price!==null" label="Цена" >
                  <UInput v-model="item.Price" v-maska data-maska="0.99" data-maska-tokens="0:\d:multiple|9:\d:optional" style="width: 100px" class="centerInput" />
                </UFormGroup>
                <div style="min-width: 6px"></div>
                <UFormGroup label="Ипотека"  >
                  <UCheckbox v-if="item.MortgageAllowed!==null" label="" color="cyan"  v-model="item.MortgageAllowed" />
                </UFormGroup>
              </div>
              <UFormGroup label="Бонус агенту"  >
                <div style="display: flex">
                  <UInput v-model="item.AgentBonusValue" v-maska data-maska="0.99" data-maska-tokens="0:\d:multiple|9:\d:optional" style="width: 100px"  />
                  <div style="min-width: 6px"></div>
                  <USelect  v-model="item.PaymentType"  option-attribute="name" :options="PaymentTypes" style="width: 100px"  />

                </div>


              </UFormGroup>
            </div>
          </div>

          <div>
            <div style="display: flex;align-items: center;">
              <div style="width: 98%"><hr /></div>
              <div style="margin-left: 6px">Описание</div>
              <UButton color="black" variant="ghost" icon="i-heroicons-bars-4" @click="showDescription = !showDescription" />
            </div>
            <div>
              <UFormGroup v-if="showDescription" label="Заголовок" name="title">
                <UInput v-model="item.title" />
              </UFormGroup>
              <UFormGroup v-if="showDescription" label="Комментарий" name="title">
                <UTextarea v-if="showDescription" v-model="item.Description" />
              </UFormGroup>
            </div>
          </div>

          <div>
            <div style="display: flex;align-items: center;">
              <div style="width: 98%"><hr /></div>
              <div style="margin-left: 6px">Фото</div>
              <UButton color="black" variant="ghost" icon="i-heroicons-bars-4" @click="showPhoto = !showPhoto" />
            </div>
            <addImages v-if="showPhoto" :items="item" />
          </div>

        </div>

      </UFormGroup>
      <UButton @click="isOpen = true">
        test
      </UButton>
    </UForm>
</template>

<script>

import AddImages from "../../addImages/index.vue";
import PdfCottageSale from "../../pdf/pdfCottageSale.vue";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
const currencyMask = createNumberMask({
  prefix: '$',
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  name: "addRealEstateForm",
  components: {PdfCottageSale, AddImages},
  props:{
    itemIn:{},
  },
  data: () => ({
    currencyMask:createNumberMask({
      prefix: '$',
      allowDecimal: true,
      includeThousandsSeparator: true,
      allowNegative: false,
    }),
    isOpen:false,
    operations:['Сдаю','Продаю'],
    periods:['Неделя','Посуточно','Длительный'],
    objectTypesRentDaily: [],
    listNoDelete:['id','title','Description','operation','date','img1','img2','img3','img4'],
    item:{},
    PaymentTypes: [
      {
        name: 'Фикс.',
        value: 'fixed'
      },
      {
        name: 'Процент',
        value: 'percent'
      },

    ],
    PermittedLandUseTypes: [
      {
        name: 'Фермерское хозяйство',
        value: 'farm'
      },
      {
        name: 'Садоводство',
        value: 'gardening'
      },
      {
        name: 'Огородничество',
        value: 'horticulture'
      },
      {
        name: 'ИЖС',
        value: 'individualHousingConstruction'
      },
      {
        name: 'Иное',
        value: 'other'
      },
      {
        name: 'ЛПХ',
        value: 'privateFarm'
      },
      {
        name: 'Дачное хозяйство',
        value: 'suburbanNonProfitPartnership'
      },

    ],
    HeatingTypes: [
      {
        name: 'Автономное газовое',
        value: 'autonomousGas'
      },
      {
        name: 'центральное угольное',
        value: 'centralCoal'
      },
      {
        name: 'центральное газовое',
        value: 'centralGas'
      },
      {
        name: 'Дизельное',
        value: 'diesel'
      },
      {
        name: 'Электрическое',
        value: 'electric'
      },
      {
        name: 'Камин',
        value: 'fireplace'
      },
      {
        name: 'Нет',
        value: 'no'
      },
      {
        name: 'Твердотопливный котел',
        value: 'solidFuelBoiler'
      },
      {
        name: 'Печь',
        value: 'stove'
      },

    ],
    MaterialTypes: [
      {
        name: 'Газобетонный блок',
        value: 'aerocreteBlock'
      },
      {
        name: 'Щитовой',
        value: 'boards'
      },
      {
        name: 'Кирпичный',
        value: 'brick'
      },
      {
        name: 'Пенобетонный блок',
        value: 'foamConcreteBlock'
      },
      {
        name: 'Газосиликатный блок',
        value: 'gasSilicateBlock'
      },
      {
        name: 'Монолитный',
        value: 'monolith'
      },
      {
        name: 'Каркасный',
        value: 'wireframe'
      },
      {
        name: 'Деревянный',
        value: 'wood'
      },

    ],
    Conditions: [
      {
        name: 'Без внутренней отделки',
        value: 'interiorDecorationRequired'
      },
      {
        name: 'под снос',
        value: 'majorRepairsRequired'
      },
      {
        name: 'Готов к проживанию',
        value: 'ready'
      },
      {
        name: 'Недостроенный',
        value: 'unfinished'
      },

    ],
    SuburbanWaterTypes: [
      {
        name: 'Скважина',
        value: 'borehole'
      },
      {
        name: 'Центральное',
        value: 'central'
      },
      {
        name: 'Колодец',
        value: 'well'
      },

    ],
    Drainages: [
      {
        name: 'Центральная',
        value: 'central'
      },
      {
        name: 'Выгребная яма',
        value: 'cesspool'
      },
      {
        name: 'Септик',
        value: 'septicTank'
      },

    ],
    gasTypes: [
      {
        name: 'граница участка',
        value: 'border'
      },
      {
        name: 'Газовый баллон',
        value: 'gasBottle'
      },
      {
        name: 'Газгольдер',
        value: 'gasHolder'
      },
      {
        name: 'Магистральный в доме',
        value: 'main'
      },
    ],
    LandCategorys: [
      {
        name: 'ЗСН',
        value: 'forAgriculturalPurposes'
      },
      {
        name: 'Иное',
        value: 'other'
      },
      {
        name: 'ЗНП',
        value: 'settlements'
      },

    ],
    AreaUnitTypes: [
      {
        name: 'Гектар',
        value: 'hectare'
      },
      {
        name: 'Сотка',
        value: 'sotka'
      },

    ],
    objectTypesSale: [
      {
        name: 'Дом/дача',
        value: 'houseSale'
      },
      {
        name: 'Коттедж',
        value: 'cottageSale'
      },
      {
        name: 'Таунхаус',
        value: 'townhouseSale'
      },
      {
        name: 'Участок',
        value: 'landSale'
      },
      {
        name: 'Часть дома',
        value: 'houseShareSale'
      },
    ],
    spr:[],
    showTab1: false,
    showPhoto: false,
    showDescription: false,
    showLand: false,
    showBuilding: false,
    showBargainTerms: false
  }),
  mounted() {
    this.listNoDelete.forEach(l=>{
      this.item[l] = this.itemIn[l]
    })
    this.item.operation = ref(this.operations[1])
    this.spr = this.spr.concat(this.objectTypesSale)
    this.spr = this.spr.concat(this.AreaUnitTypes)
    this.spr = this.spr.concat(this.LandCategorys)
    this.spr = this.spr.concat(this.PermittedLandUseTypes)
    this.spr = this.spr.concat(this.SuburbanWaterTypes)
    this.spr = this.spr.concat(this.gasTypes)
    this.spr = this.spr.concat(this.Drainages)
    this.spr = this.spr.concat(this.SuburbanWaterTypes)
    this.spr = this.spr.concat(this.MaterialTypes)
    this.spr = this.spr.concat(this.Conditions)
    this.spr = this.spr.concat(this.PaymentTypes)


    //this.item.period = ref(this.periods[0])
    //this.item.Category = ref(this.objectTypesRentDaily[1])
    //this.item.ExternalId = ''
  },
  watch:{
    'item.operation'(val){
      this.item = {}
      this.listNoDelete.forEach(l=>{
        this.item[l] = this.itemIn[l]
      })
      this.item.operation = val
      if(val=='Сдаю'){
        this.item.period = ref(this.periods[1])
      }else{
        this.item.Category = ref('cottageSale')
        this.item.TotalArea = 1
        this.item.HasElectricity = ref(false)
        this.item.HasWater = ref(false)
        this.item.HasGas = ref(false)
        this.item.HasDrainage = ref(false)
        this.item.HasSecurity = ref(false)
        this.item.HasBathhouse = ref(false)
        this.item.HasGarage = ref(false)
        this.item.HasPool = ref(false)
        this.item.HasTerrace = ref(false)
        this.item.HasCellar = ref(false)
        this.item.MortgageAllowed = ref(false)

        this.item.PermittedLandUseType = ref('individualHousingConstruction')
        this.item.Area = ref(1)
        this.item.Price = ref(1)
        this.item.AgentBonusValue = ref(1)


        this.item.AreaUnitType = ref('sotka')
        this.item.IsLandWithContract = ref(true)
        this.item.LandCategory = ref('settlements')
        this.item.FloorsCount = ref(1)
        this.item.BuildYear = ref(2020)
        this.item.HeatingType = ref('electric')
        this.item.gasType = ref('main')
        this.item.Drainage = ref('septicTank')
        this.item.SuburbanWaterType = ref('borehole')
        this.item.Condition = ref('ready')
        this.item.MaterialType = ref('brick')
        this.item.PaymentType = ref('fixed')


      }
    },
    'item.Category'(val){

    },
    'item.period'(val){
      if(val==='Посуточно' && this.item.operation ==='Сдаю'){
        this.objectTypesRentDaily= [{
            name: 'дом, дача, коттедж',
            value: 'dailyHouseRent'
          },{
            name: 'Квартира',
            value: 'dailyFlatRent'
          },{
            name: 'койко-место',
            value: 'dailyBedRent'
          },{
            name: 'комнату',
            value: 'dailyRoomRent'
          },
        ]
        this.item.Category = ref(this.objectTypesRentDaily[1])
      }
    }

  }
}
</script>

<style>
.centerInput  {
  text-align: -webkit-center;
}
.rborder{
  background-image: url("/img/item_news_bg1.png") !important;
  border-radius: 15px; /* Уголки */
  padding: 4px;
}
.rborder * {
  color: #000000;
}

#dch .w-4{
  width: 28px !important;;
}
#dch .h-4{
  height: 28px !important;
}
#dch .items-start {
  align-items: center;
  height: 40px;
}
#dch .ms-3 {
  margin-inline-start: 2px;
}
#dch .items-start{
  min-width: 126px;
}
</style>