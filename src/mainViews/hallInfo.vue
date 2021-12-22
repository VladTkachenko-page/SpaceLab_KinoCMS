<template>
  <Loader v-if="loading" />
  <div v-else class="hall-info">
    <img class="hall-info__img" :src="this.hall.imgBannerSRC" alt="" />
    <div class="hall-info__wrap">
      <div class="hall-info__sidebar">
        <div class="hall-info__sessions">
          <p>Смотрите сегодня</p>
          <div class="hall-info__session">
            <a href="/" class="router-link-active">Сеанс 1</a>
          </div>
          <div class="hall-info__session">
            <a href="/" class="router-link-active">Сеанс 2</a>
          </div>
          <div class="hall-info__session">
            <a href="/" class="router-link-active">Сеанс 3</a>
          </div>
          <div class="hall-info__session">
            <a href="/" class="router-link-active">Сеанс 4</a>
          </div>
          <div class="hall-info__session">
            <a href="/" class="router-link-active">Сеанс 5</a>
          </div>
          <div class="hall-info__session">
            <a href="/" class="router-link-active">Сеанс 6</a>
          </div>
        </div>
        <button
          class="btn-success hall-info__btn"
          @click.prevent="$router.push('/timetable')"
        >
          Расписание сеансов
        </button>
      </div>
      <div class="hall-info__block">
        <h5 class="hall-info__title text-center">{{ this.hall.name }}</h5>
        <p class="hall-info__desc">
          {{ this.hall.description }}
        </p>
        <h5 class="hall-info__title text-center">Карта зала</h5>
        <div class="hall-info__scheme">
          <img :src="this.hall.imgSchemeSRC" alt="" />
        </div>
        <h5 class="hall-info__title text-center">ФОТОГАЛЕРЕЯ</h5>
        <div class="hall-info__gallery">
          <SwiperSlider
            :dataImg="this.hall.gallery"
            :name="'hall'"
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
    this.hall = this.cinema.halls[+this.$attrs.idHall];

    this.loading = false;
  },
};
</script>

<style scoped>
.hall-info__img {
  width: 100%;
  height: 500px;
}
.hall-info__wrap {
  position: relative;
}
.hall-info__sidebar {
  position: absolute;
  top: 30px;
  left: 10px;
}
.hall-info__session a {
  border: 2px solid #000000;
  border-bottom: 0px;
  font-weight: 700;
  color: #2c3e50;
  display: block;
  text-decoration: none;
  padding: 5px;
  text-align: center;
}
.hall-info__session:last-child {
  border-bottom: 2px solid #000000;
}
.hall-info__btn {
  margin-top: 20px;
}
.hall-info__block {
  padding: 20px;
  padding-left: 200px;
  text-align: center;
}
.hall-info__scheme img {
  width: 100%;
  height: 570px;
}
.hall-info__logo {
  width: 200px;
  height: 200px;
  margin: 30px;
}
.hall-info__gallery {
  max-width: 70%;
  margin: 0 auto;
  cursor: pointer;
}
.hall-info__gallery .swiper-container {
  height: 560px;
}
</style>
