<template>
  <Loader v-if="loading" />
  <div v-else class="main">
    <SwiperSlider
      :dataImg="this.allFilms[0].gallery"
      :name="'film'"
      :swiperOptions="{
        loop: true,
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
      }"
    />
    <div class="films mt-4 mb-4">
      <h3 class="films__title title text-center">
        Смотрите сегодня,
        <span>{{
          new Date().getDate() + " " + this.monthRU[new Date().getMonth()]
        }}</span>
      </h3>
      <div class="films__items">
        <div class="films__item" v-for="film in this.allFilms" :key="film.id">
          <router-link
            tag="a"
            :to="{
              name: 'filmInfo',
              params: {
                id: film.id,
              },
            }"
          >
            <img :src="film.imgSRC" alt="" />
            <p class="films__name text-center">{{ film.name }}</p>
          </router-link>
          <button class="films__btn btn-success">Купить билет</button>
        </div>
      </div>
    </div>
    <div class="films mt-4 mb-4">
      <h3 class="films__title title text-center">Смотрите скоро</h3>
      <div class="films__items">
        <div
          class="films__item"
          v-for="film in this.allFilmsComming"
          :key="film.id"
        >
          <router-link
            tag="a"
            :to="{
              name: 'filmInfo',
              params: {
                id: film.id,
              },
            }"
          >
            <img :src="film.imgSRC" alt="" />
            <p class="films__name text-center">{{ film.name }}</p>
          </router-link>
          <p class="films__date">
            {{ "C " + new Date().getDate() + " " + monthRU[nextMonth] }}
          </p>
        </div>
      </div>
    </div>
    <div class="banner-news">
      <h3 class="banner-news__title title text-center">Новости и акции</h3>

      <SwiperSlider
        v-if="this.allDownCards.status"
        :dataImg="this.allDownCards"
        :name="'news'"
        :swiperOptions="{
          loop: true,
          autoplay: {
            delay: this.allDownCards.speed * 1000 || 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          },
        }"
      />
    </div>
    <div class="seo">
      <h4 class="seo__title title text-center">SEO текст</h4>
      <p class="seo__text text-center">
        {{ this.allPages[0].description }}
      </p>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/app/loader.vue";
import { mapGetters } from "vuex";
import SwiperSlider from "@/components/mainApp/SwiperSlider.vue";

export default {
  data() {
    return {
      monthRU: [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ],
      nextMonth: new Date().getMonth(),
      loading: true,
    };
  },
  components: {
    SwiperSlider,
    Loader,
  },
  computed: mapGetters([
    "allUpCards",
    "allFilms",
    "allFilmsComming",
    "allPages",
    "allDownCards",
  ]),
  async mounted() {
    await this.$store.dispatch("fetchFilms");
    await this.$store.dispatch("fetchFilmsComming");
    await this.$store.dispatch("fetchPages");
    await this.$store.dispatch("fetchDownCards");
    this.loading = false;
    if (this.nextMonth === 11) {
      let current = new Date(new Date().getFullYear() + 1, 0, 1);
      this.nextMonth = current.getMonth();
    } else {
      let current = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        1
      );
      this.nextMonth = current.getMonth();
    }
  },
};
</script>
<style scoped>
.films__items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.films__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
}
.films__item img {
  width: 250px;
  height: 350px;
}
.films__name {
  font-weight: 700;
  color: black;
}
.films__btn {
  border-radius: 10px;
  padding: 5px 20px;
}
.films__date {
  font-size: 30px;
  font-weight: 500;
  color: #00d824;
}
.main .swiper-container >>> img {
  cursor: pointer;
  height: 600px;
}
</style>
