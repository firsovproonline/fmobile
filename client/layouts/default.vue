<template>
      <div id="pagewidth">
        <MobileMenu />
        <div style="margin-top: 10px">
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