<template>
  <div data-js-events="right" @dblclick="dblclick">
    <div style="display: flex;align-content: center;align-items: center;">
      <img :src="this.item.photo">
      <div style="padding-left: 8px">
        <div class="label">{{this.item.lastName}}</div>
        <div class="label">{{this.item.firstName}}</div>
        <div class="label">{{this.item.profession}}</div>
      </div>
    </div>
    <div class="rating-area">
      <input type="radio" id="star-5" name="rating" value="5">
      <label for="star-5" title="Оценка «5»"></label>
      <input type="radio" id="star-4" name="rating" value="4">
      <label for="star-4" title="Оценка «4»"></label>
      <input type="radio" id="star-3" name="rating" value="3">
      <label for="star-3" title="Оценка «3»"></label>
      <input type="radio" id="star-2" name="rating" value="2">
      <label for="star-2" title="Оценка «2»"></label>
      <input type="radio" id="star-1" name="rating" value="1">
      <label for="star-1" title="Оценка «1»"></label>
    </div>
    <h2>{{this.item.phone}}</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: "itemM",
  props:{
    item: {}
  },
  data: () => ({
    touchendX: 0,
    touchstartX: 0,
    touchendY: 0,
    touchstartY: 0
  }),
  methods:{
    dblclick(){
      this.$router.push('/master/'+this.item.id)
    },
    handleGesture() {
      console.log(this.touchendX , this.touchstartX)
      if (this.touchendX < this.touchstartX) {
        console.log('Swiped Left');
      }
      if (this.touchendX > this.touchstartX && this.touchendX - this.touchstartX > 200 ) {
        this.$router.push('/master/'+this.item.id)
      }
      if (this.touchendY < this.touchstartY) {
        console.log('Swiped Up');
      }
      if (this.touchendY > this.touchstartY) {
        console.log('Swiped Down');
      }
      if (this.touchendY === this.touchstartY) {
        console.log('Tap');
      }
    }
  },
  mounted() {
    this.$el.addEventListener('touchstart', (event)=> {
      this.touchstartX = event.changedTouches[0].screenX;
      this.touchstartY = event.changedTouches[0].screenY;
    }, false);
    this.$el.addEventListener('touchend', (event) => {
      this.touchendX = event.changedTouches[0].screenX;
      this.touchendY = event.changedTouches[0].screenY;
      this.handleGesture();
    }, false);
  }
}
</script>

<style scoped>
  .label{
    font-size: 18px;
  }

  .rating-area {
    overflow: hidden;
    width: 265px;
    margin: 0 auto;
  }
  .rating-area:not(:checked) > input {
    display: none;
  }
  .rating-area:not(:checked) > label {
    float: right;
    width: 42px;
    padding: 0;
    cursor: pointer;
    font-size: 32px;
    line-height: 32px;
    color: lightgrey;
    text-shadow: 1px 1px #bbb;
  }
  .rating-area:not(:checked) > label:before {
    content: '★';
  }
  .rating-area > input:checked ~ label {
    color: gold;
    text-shadow: 1px 1px #c60;
  }
  .rating-area:not(:checked) > label:hover,
  .rating-area:not(:checked) > label:hover ~ label {
    color: gold;
  }
  .rating-area > input:checked + label:hover,
  .rating-area > input:checked + label:hover ~ label,
  .rating-area > input:checked ~ label:hover,
  .rating-area > input:checked ~ label:hover ~ label,
  .rating-area > label:hover ~ input:checked ~ label {
    color: gold;
    text-shadow: 1px 1px goldenrod;
  }
  .rate-area > label:active {
    position: relative;
  }
</style>