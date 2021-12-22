<template>
  <div
    class="bgc"
    :style="
      'background-image: url(' +
      this.backBanner.imgSRC +
      ');' +
      'background-size: 100%'
    "
  >
    <SwiperSlider
      v-if="this.allUpCards.status"
      :dataImg="this.allUpCards"
      :name="'banner'"
      :link="true"
      :swiperOptions="{
        loop: true,
        allowTouchMove: false,
        autoplay: {
          delay: this.allUpCards.speed * 1000 || 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
      }"
    />
    <div class="container bgc-white">
      <MainHeader />
      <router-view />
      <MainFooter />
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/mainApp/MainHeader.vue";
import MainFooter from "@/components/mainApp/MainFooter.vue";
import { mapGetters } from "vuex";
import SwiperSlider from "@/components/mainApp/SwiperSlider.vue";

export default {
  name: "MainSite",
  components: {
    MainHeader,
    MainFooter,
    SwiperSlider,
  },
  computed: mapGetters(["allUpCards", "backBanner"]),
  async mounted() {
    await this.$store.dispatch("fetchUpCards");
    await this.$store.dispatch("fetchBackBanner");
  },
};
</script>
<style scoped>
.bgc-white {
  background-color: #fff;
}
.bgc .swiper-container {
  height: 100px;
}
.bgc .swiper-container >>> img {
  height: 100px;
}
</style>
