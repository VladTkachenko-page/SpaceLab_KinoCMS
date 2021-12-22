<template>
  <swiper class="film-slider" :ref="this.name" :options="this.swiperOptions">
    <swiper-slide class="my-swiper" v-for="img in this.dataImg" :key="img.id">
      <router-link :to="'/' + img.url" v-if="link">
        <img :src="img.imgSRC" alt="" />
      </router-link>
      <img :src="img.imgSRC" alt="" v-else />
    </swiper-slide>
    <!-- <div :class="'swiper-pagination' + ' ' +'swiper-pagination-' + this.name" slot="pagination"></div> -->
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Swiper as SwiperClass, Autoplay } from "swiper/swiper.esm";
SwiperClass.use([Autoplay]);

import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle";

export default {
  name: "carrousel",
  data() {
    return {};
  },
  props: ["link", "dataImg", "name", "swiperOptions"],
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    swiper() {
      return this.$refs[this.name].$swiper;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.film-slider {
  overflow: hidden;
}
.my-swiper img {
  width: 100%;
  height: 100%;
}
.swiper-pagination {
  bottom: 50px;
}
.swiper-pagination >>> .swiper-pagination-bullet {
  opacity: 1;
  border: black solid 1px;
  background-color: white;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: black;
}
</style>
