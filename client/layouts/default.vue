<template>
      <div id="pagewidth">
        <MobileMenu />
        <header id="header">
          <div class="center">
            <nav id="mainNav">
              <ul>
                <li class="active"><a href="#pagewidth"><span>gallery</span></a></li>
                <li><a href="#twoColumnLayout"><span>2 columns</span></a></li>
                <li><a href="#threeColumnLayout"><span>3 columns</span></a></li>
                <li><a href="#boxes"><span>boxes</span></a></li>
                <li><a href="#testiomonialsTab"><span>testimonials</span></a></li>
                <li><a href="#contactUs"><span>contact us</span></a></li>
              </ul>
            </nav>
          </div>
        </header>
        <div id="content" style="margin-top: 42px">
          <slot />
        </div>
        <footer id="footer">
          <div class="center">
            <span class="copy">Created by <a href="http://firsovpro.online">firsovpro.online</a></span>
            Subscribe to our <a href="firsovpro@yandex.ru">email</a>
          </div>
        </footer>
      </div>
</template>
<script>
import MobileMenu from "../components/menu/index.vue";
export default {
  components: {MobileMenu}
}
</script>