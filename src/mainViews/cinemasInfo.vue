<template>
  <Loader v-if="loading" />
  <div v-else class="cinemas-info">
    <img class="cinemas-info__img" :src="this.cinema.imgBannerSRC" alt="" />
    <div class="cinemas-info__wrap">
      <div class="cinemas-info__sidebar">
        <div class="cinemas-info__halls">
          <p class="cinemas-info__sidebar_title">
            Кол-во залов: {{ Object.keys(this.cinema.halls).length }}
          </p>
          <div
            class="cinemas-info__hall"
            v-for="hall in this.cinema.halls"
            :key="hall.id"
          >
            <router-link
              :to="{
                name: 'hallInfo',
                params: { id: cinema.id, idHall: hall.id },
              }"
              tag="a"
            >
              {{ hall.name }}
            </router-link>
          </div>
        </div>
        <div class="cinemas-info__sessions">
          <p class="cinemas-info__sidebar_title">Смотрите сегодня:</p>
          <div class="cinemas-info__session">
            <a href="/" class="router-link-active">Сеанс 1</a>
          </div>
          <div class="cinemas-info__session">
            <a href="/" class="router-link-active">Сеанс 2</a>
          </div>
          <div class="cinemas-info__session">
            <a href="/" class="router-link-active">Сеанс 3</a>
          </div>
          <div class="cinemas-info__session">
            <a href="/" class="router-link-active">Сеанс 4</a>
          </div>
          <div class="cinemas-info__session">
            <a href="/" class="router-link-active">Сеанс 5</a>
          </div>
          <div class="cinemas-info__session">
            <a href="/" class="router-link-active">Сеанс 6</a>
          </div>
        </div>
      </div>
      <div class="cinemas-info__block">
        <div class="cinemas-info__top">
          <h4 class="cinemas-info__title">{{ this.cinema.name }}</h4>
          <img
            class="cinemas-info__logo"
            :src="this.cinema.imgLogoSRC"
            alt=""
          /><button
            class="btn-success"
            @click.prevent="$router.push('/timetable')"
          >
            Расписание сеансов
          </button>
        </div>
        <p class="cinemas-info__desc">
          {{ this.cinema.description }}
        </p>
        <h5 class="cinemas-info__circs-title text-center">Условия</h5>
        <p class="cinemas-info__circs-text">
          {{ this.cinema.circs }}
        </p>
        <h5 class="cinemas-info__circs-title text-center">ФОТОГАЛЕРЕЯ</h5>
        <div class="cinemas-info__gallery">
          <SwiperSlider
            :dataImg="this.cinema.gallery"
            :name="'cinema'"
            :swiperOptions="{
              loop: true,
              autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              },
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "@/components/app/loader.vue";
import SwiperSlider from "@/components/mainApp/SwiperSlider.vue";

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Loader,
    SwiperSlider,
  },
  computed: mapGetters(["allCinemas"]),

  async mounted() {
    await this.$store.dispatch("fetchCinemas", this.allCinemas);
    this.cinema = await this.$store.getters.oneCinema(+this.$attrs.id)[0];

    this.loading = false;
  },
};
</script>

<style scoped>
.cinemas-info__img {
  width: 100%;
  height: 500px;
}
.cinemas-info__wrap {
  position: relative;
}
.cinemas-info__sidebar {
  position: absolute;
  top: 30px;
  left: 10px;
}
.cinemas-info__sidebar_title {
  font-weight: 700;
  margin-top: 20px;
}
.cinemas-info__hall a,
.cinemas-info__session a {
  border: 2px solid #000000;
  border-bottom: 0px;
  font-weight: 700;
  color: #2c3e50;
  display: block;
  text-decoration: none;
  padding: 5px;
  text-align: center;
}
.cinemas-info__hall:last-child,
.cinemas-info__session:last-child {
  border-bottom: 2px solid #000000;
}
.cinemas-info__block {
  padding: 20px;
  padding-left: 200px;
  text-align: center;
}
.cinemas-info__top {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.cinemas-info__logo {
  width: 200px;
  height: 200px;
  margin: 30px;
}
.cinemas-info__gallery {
  max-width: 70%;
  margin: 0 auto;
  cursor: pointer;
}
.cinemas-info__gallery .swiper-container {
  height: 560px;
}
</style>
