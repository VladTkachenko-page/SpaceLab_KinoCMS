<template>
  <Loader v-if="loading" />
  <div v-else class="film">
    <iframe
      width="100%"
      height="750px"
      :src="this.film.videoURL"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen=""
    ></iframe>
    <div class="film__timetable">
      <div class="film__timetable-top">
        <h3 class="film__timetable-title">Расписание сеансов в кинотеатре:</h3>
        <select class="form-control film__timetable-select">
          <option value="all">Все кинотеатры</option>
        </select>
        <span class="film__timetable-filter">Все</span>
        <span class="film__timetable-filter">3D</span>
        <span class="film__timetable-filter">2D</span>
      </div>
      <div class="film__timetable-items">
        <router-link
          class="film__timetable-item"
          v-for="session in this.session"
          :key="session.id"
          :to="{
            name: 'session',
            params: {
              id: session.id,
              session: session,
            },
          }"
        >
          <div class="film__timetable-item-date">
            <strong>{{ session.day }}</strong>
          </div>
          <div class="film__timetable-item-day">Пятница</div>
          <div class="film__timetable-item-cinema">
            Кинотеатр: {{ session.cinemaName }}
          </div>
          <div class="film__timetable-item-bottom">
            <div class="film__timetable-item-time">{{ session.time }}</div>
            <div class="film__timetable-item-hall">{{ session.hallName }}</div>
          </div>
        </router-link>
      </div>
      <!---->
    </div>
    <div class="film__wrap mt-4">
      <img class="film__img" :src="this.film.imgSRC" alt="" />
      <div class="film__info">
        <button
          v-if="!this.film.comming"
          class="btn-success film__btn"
          @click.prevent="$router.push('/timetable')"
        >
          Купить билет
        </button>
        <h4 class="film__title mb-4">{{ this.film.name }}</h4>
        <p class="film__desc text-left mb-4">
          {{ this.film.description }}
        </p>
        <h4 class="film__title">Кадры и постеры</h4>
        <div class="film__gallery">
          <SwiperSlider :dataImg="this.film.gallery" :name="this.film.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SwiperSlider from "@/components/mainApp/SwiperSlider.vue";
import Loader from "@/components/app/loader.vue";

export default {
  data() {
    return {
      loading: true,
      film: {},
      session: [],
    };
  },
  components: {
    SwiperSlider,
    Loader,
  },
  watch: {
    async "$route.path"() {
      this.film = await this.$store.getters.oneFilm(+this.$attrs.id)[0];
      if (!this.film) {
        await this.$store.dispatch("fetchFilmsComming");
        this.film = await this.$store.getters.oneFilmComming(
          +this.$attrs.id
        )[0];
      }
    },
  },
  computed: mapGetters(["oneFilm", "oneFilmComming", "allTimetable"]),

  async mounted() {
    await this.$store.dispatch("fetchFilms");
    await this.$store.dispatch("fetchTimetable");
    this.film = await this.$store.getters.oneFilm(+this.$attrs.id)[0];
    if (!this.film) {
      await this.$store.dispatch("fetchFilmsComming");
      this.film = await this.$store.getters.oneFilmComming(+this.$attrs.id)[0];
    }
    this.allTimetable.forEach((item) => {
      this.session = this.session.concat(
        item.sessions.filter((item) => item.filmName === this.film.name)
      );
    });
    this.loading = false;
  },
};
</script>
<style scoped>
.film iframe {
  height: 600px;
}
.film__timetable-top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.film__timetable-items {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.film__timetable-item {
  color: #000000;
  border: 1px solid black;
  padding: 16px;
  cursor: pointer;
  margin-left: 15px;
}
.film__timetable-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.film__timetable-select {
  max-width: 200px;
  margin-left: 15px;
}
.film__timetable-filter {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid black;
  margin-left: 20px;
}
.film__wrap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.film__img {
  max-width: 800px;
  height: 500px;
}
.film__info {
  max-width: 600px;
  text-align: center;
}
.film__btn {
  padding: 5px 25px;
  margin: 0 auto;
  margin-bottom: 10px;
}
.film__gallery {
  display: flex;
  justify-content: center;
  align-items: center;
}
.film__gallery .swiper-container {
  cursor: pointer;
  width: 500px;
  height: 300px;
}
.film__gallery .swiper-container >>> img {
  height: 300px;
}
</style>
