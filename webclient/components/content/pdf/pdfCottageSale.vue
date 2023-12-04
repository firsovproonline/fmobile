<template>
  <div>
    <div ref="pdfSection" class="pdfSection" style=";width:350px;padding: 12px">
      <h3>
        {{item?.operation}} {{getSpr(item?.Category)}} площадью {{item?.TotalArea}} м²
      </h3>
      <div>
        Этажей {{item?.FloorsCount}}, год постройки {{item?.BuildYear}}, на участке {{item?.Area}} {{getSpr(item?.AreaUnitType)}}
      </div>
      <div>
        на землях {{getSpr(item?.LandCategory)}} под {{getSpr(item?.PermittedLandUseType)}} <label v-if="item?.IsLandWithContract">с подрядом </label>
      </div>
      <div>
        <label v-if="item?.address">{{item?.address}}</label>
      </div>

      <div style="border-top: 1px dotted;height: 12px;margin-top: 2px"></div>
      <div>В наличии:</div>
      <div style="display: flex;flex-wrap: wrap;">
        <div v-if="item?.HasElectricity == true">Электричество,</div>
        <div v-if="item?.HasGas == true" style="margin-left: 4px">
          газ {{getSpr(item?.gasType)}},
        </div>
        <div v-if="item?.HasDrainage == true" style="margin-left: 4px">
          канализация {{getSpr(item?.Drainage)}},
        </div>
        <div v-if="item?.HasWater == true" style="margin-left: 4px">
          вода {{getSpr(item?.SuburbanWaterType)}},
        </div>
        <div v-if="item?.HasSecurity == true" style="margin-left: 4px">охрана,</div>
        <div v-if="item?.HasBathhouse == true" style="margin-left: 4px">Баня,</div>
        <div v-if="item?.HasGarage == true" style="margin-left: 4px">Гараж,</div>
        <div v-if="item?.HasPool == true" style="margin-left: 4px">бассейн,</div>
        <div v-if="item?.HasTerrace == true" style="margin-left: 4px">терраса,</div>
        <div v-if="item?.HasCellar == true" style="margin-left: 4px">погреб,</div>

      </div>
            <div style="border-top: 1px dotted;height: 12px;margin-top: 2px"></div>
            <div>О строении:</div>
            <div style="display: flex;flex-wrap: wrap;">
              <div>Материал дома {{getSpr(item?.MaterialType)}}</div>
              <div>Состояние дома {{getSpr(item?.Condition)}}</div>
            </div>
            <div style="border-top: 1px dotted;height: 12px;margin-top: 2px"></div>
            <div>Условия сделки:</div>
            <div style="display: flex;">
              <div>Цена: <span style="color:red">{{item?.Price}}</span></div>
              <div v-if="item?.MortgageAllowed==true" style="margin-left: 6px">ипотека</div>
              <div v-if="item?.AgentBonusValue && item?.AgentBonusValue!=='' && item?.AgentBonusValue!==0" style="margin-left: 6px">Бонус агенту: <span style="color:red">{{item?.AgentBonusValue}}</span> {{getSpr(item?.PaymentType)}}</div>
            </div>
            <div style="display: flex;margin-top: 12px;flex-wrap: wrap;justify-content: space-around;">
              <img v-if="item?.img1!==''" :src="item.img1" style="height: 120px;margin: 3px"/>
              <img v-if="item?.img2!==''" :src="item.img2" style="height: 120px;margin: 3px"/>
              <img v-if="item?.img3!==''" :src="item.img3" style="height: 120px;margin: 3px"/>
              <img v-if="item?.img4!==''" :src="item.img4" style="height: 120px;margin: 3px"/>
            </div>
    </div>
    <button @click="generateReport">
      скачать PDF
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { exportToPDF } from '#imports'
import html2pdf from 'html2pdf.js';
export default {
  name: 'PdfCottageSale',
  props:{
    item:{},
    spr: null
  },
  computed:{
  },
  methods:{
    getSpr(val){
      if(this.spr){
        if(this.spr.find(item => item.value == val)!==null){
          return this.spr.find(item => item.value == val).name
        }else{ return 'ups'}
      }else{
        return val
      }
    },
    generateReport () {
      html2pdf(this.$refs.pdfSection, {
        margin: 1,
        dpi: 150,
        scale: 0.9,
        width: 450,
        jsPDF: { format: 'A4', orientation: 'portrait',width: 400, },
        //filename: "i-was-html.pdf",
      });
    }
  },
  mounted() {
    console.log(this.spr)
    console.log('=============',this.item)
  }
}
</script>

<style scoped>
  h3{
    font-size: 18px;
  }
</style>