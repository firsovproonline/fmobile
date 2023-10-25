<template>
    <NuxtLayout name="default">
      <section class="row">
        <div class="center">
          <PageFirst />
          <div class="buttons" style="display: none">
            <router-link to="/info" class="btn btnGreen"><span>О устройстве</span></router-link>
            <span><em>or</em></span>
            <router-link to="/photo" class="btn btnBlue"><span>фото</span></router-link>
          </div>
        </div>
      </section>
      <section id="twoColumnLayout" class="row grey">
        <div class="center">
          <h1>Приветствуем жителей побережья</h1>
          <strong class="subHeading">и гостей Азовского берега</strong>
          <div class="columns">
            <div class="half">
              <div class="imgHolder alignLeft"><img src="/img/bereg1.jpg" alt="image" style="width:170px" /></div>
              <p>Берег Азовского моря - это не только место, где можно провести отпуск. Это живописные природные края, которые 
                сочетаются с рукотворными деяниями человеческими. Тут много посёлков, 
              которые населяют прекраснейшие люди. Люди, живущие тут с рождения, и люди, которые по зову души 
              перебрались сюда со всех уголков страны и даже из-за рубежа. </p>
              <p>Несмотря на то, что наши посёлки уступают по размерам мегаполисам, тут также есть свои сервисы, свои мастера 
              разнообразных специальностей и также бурлит в своём ритме жизнь.</p>
              <p>У нас можно встретить и таксиста, и юриста, и ювелира, ну и конечно же донского казака. Кстати, если вам что-то нужно 
                найти, и вы не знаете где искать - односельчане всегда отзовутся на помощь и подскажут в каком направлении двигаться.</p>
              <p>И как же не упомянуть наше море? Пусть оно и не столь глубоко, но как же приятно посидеть у кромки берега в горячей воде
                и наслаждаться солнечными ваннами или наблюдать как резвятся малыши в этом огромной природном бассейне или увидеть как 
                на воду спускают лодку.</p>
              <p>Всё это о нас, о нашем любимом и ярком побережье, о его поселковых селениях и, конечно же, о его замечательных жителях. </p>
              <p> </p>
            </div>
            <div class="half">
              <div class="imgHolder fullWidth"><img src="/img/bereg2.jpg" alt="image" /></div>
              <p></p>
            </div>
          </div>
        </div>
      </section>
      <section id="threeColumnLayout" class="row">
        <div class="center">
          <h1>Three Column Layout</h1>
          <strong class="subHeading">lorem ipsum dolor sit amet, consectetur adipiscing elit</strong>
          <div class="columns">
            <div class="oneThird">
              <div class="imgHolder fullWidth"><img src="/img/content03.jpg" alt="image" /></div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa <a href="#">tellus elementum</a> nunc, eu pulvinar urna risus a orci.</p>
              <p>Ut scelerisque, sapien in luctus ultrices, magna ante convallis orci</p>
            </div>
            <div class="oneThird">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus elementum nunc.</p>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur </li>
                <li>adipiscing elit. In luctus, tortor vel</li>
                <li>pharetra, massa tellus elementum nunc</li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus. </p>
              <p>In luctus, tortor vel vehicula pharetra, massa tellus. S ss fit amet, consectetur adipiscing elit. </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus. </p>
            </div>
            <div class="oneThird">
              <div class="imgHolder alignLeft"><img src="/img/content05.jpg" alt="image" /></div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus elementum nunc, eu pulvinar urna risus a orci.</p>
              <p>Ut scelerisque, sapien in luctus ultrices, magna ante convallis orci, vel iaculis massa sapien sed risus.</p>
              <p>Ut scelerisque, sapien in luctus ultrices, magna ante convallis orci, vel iaculis massa sapien sed risus.</p>
              <p>Ut scelerisque, sapien in luctus ultrices, magna ante convallis orc.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="boxes" class="row grey">
        <div class="center">
          <h1>Information Boxes</h1>
          <strong class="subHeading">lorem ipsum dolor sit amet, consectetur adipiscing elit</strong>
          <div class="columns">
            <article class="news oneThird">
              <div>
                <h3><a href="#">Lorem ipsum dolor</a></h3>
                <div class="content">
                  <a href="#" class="imgHolder fullWidth"><img src="/img/img-news01.jpg" alt="" /></a>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div class="readMore"><a href="#" class="btn btnSmall"><span>Read More</span></a></div>
              </div>
            </article>
            <article class="news oneThird">
              <div>
                <h3><a href="#">Lorem ipsum dolor</a></h3>
                <div class="content">
                  <a href="#" class="imgHolder fullWidth"><img src="/img/img-news01.jpg" alt="" /></a>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div class="readMore"><a href="#" class="btn btnSmall"><span>Read More</span></a></div>
              </div>
            </article>
            <article class="news oneThird">
              <div>
                <h3><a href="#">Lorem ipsum dolor</a></h3>
                <div class="content">
                  <a href="#" class="imgHolder fullWidth"><img src="/img/img-news01.jpg" alt="" /></a>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div class="readMore"><a href="#" class="btn btnSmall"><span>Read More</span></a></div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section id="testiomonialsTab" class="row">
        <div class="center">
          <h1>Testimonials</h1>
          <strong class="subHeading">lorem ipsum dolor sit amet, consectetur adipiscing elit</strong>
          <div id="testimonials" class="gallery">
            <ul class="slides">
              <li>
                <div class="row">
                  <blockquote>
                    <q>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus elementum nunc, eu pulvinar </q>
                  </blockquote>
                  <blockquote>
                    <q>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus elementum nunc, eu pulvinar </q>
                  </blockquote>
                </div>
                <div class="row">
                  <blockquote>
                    <q>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus elementum nunc, eu pulvinar </q>
                  </blockquote>
                  <blockquote>
                    <q>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, massa tellus elementum nunc, eu pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus, tortor vel vehicula pharetra, mas</q>
                  </blockquote>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="contactUs" class="row grey">
        <div class="center">
          <h1>Contact Us</h1>
          <strong class="subHeading">lorem ipsum dolor sit amet, consectetur adipiscing elit</strong>
          <div class="columns">
            <div class="half">
              <form action="#" class="form">
                <fieldset>
                  <h2>Feedback form</h2>
                  <div class="formRow">
                    <div class="textField"><input type="text" placeholder="Your name ..." /></div>
                  </div>
                  <div class="formRow">
                    <div class="textField"><input type="text" placeholder="Your Email ..." /></div>
                  </div>
                  <div class="formRow">
                    <div class="textField"><textarea cols="20" rows="4" placeholder="Your Email ..."></textarea></div>
                  </div>
                  <div class="formRow">
                    <button class="btnSmall btn submit right">
                      <span>Send Message</span>
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
            <div class="half">
              <h2>How to find us</h2>
              <div id="map">
                <div class="imgHolder"><img src="/img/map.jpg" alt="google map" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </NuxtLayout>
</template>

<script>
import PageFirst from "../components/gridSkeleton/pageFirst/index.vue";
export default {
  name: "index",
  components: {PageFirst},
  layout: 'default'
}
</script>

<style scoped>

</style>