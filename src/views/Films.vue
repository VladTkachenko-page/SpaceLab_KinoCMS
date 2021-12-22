<template>
  <Loader v-if="loading" />
  <div v-else>
    <h2 class="main__title text-center films__title">Список текущих фильмов</h2>
    <div class="films-wrap" >
      <filmsCard
        v-for="film in this.allFilms"
        :key="film.id"
        :films="allFilms"
        :film="film"
        @delete="filmDelete"
      />
      <router-link
        tag="button"
        :to="{
          name: 'filmsEditRu',
          params: { id: new Date().getTime(), comming: false, lang: 'ru' },
        }"
        class="btn-success"
      >
        Добавить фильм
      </router-link>
    </div>
    <h2 class="main__title text-center films__title">
      Список фильмов которые покажут скоро
    </h2>
    <div class="films-wrap">
      <filmsCard
        v-for="film in this.allFilmsComming"
        :key="film.id"
        :films="allFilmsComming"
        :film="film"
        @delete="filmDelete"
      />
      <router-link
        tag="button"
        :to="{
          name: 'filmsEditRu',
          params: { id: new Date().getTime(), comming: true, lang: 'ru' },
        }"
        class="btn-success"
      >
        Добавить фильм
      </router-link>
    </div>
    <Toast :sending="this.sending" :text="'Фильм успешно удален'"></Toast>
  </div>
</template>

<script>
import Toast from "@/components/app/toast.vue";
import Loader from "@/components/app/loader.vue";
import filmsCard from "@/components/films/filmsCard.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
      sending: false,
    };
  },
  components: {
    filmsCard,
    Loader,
    Toast,
  },
  methods: {
    ...mapMutations(["removeFilm", "removeFilmComming"]),
    async filmDelete(film) {
      if (film.comming) {
        let films = this.allFilmsComming.filter((el) => film.id !== el.id);
        await this.removeFilmComming({ films, film });
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
        }, 4000);
        let index = this.allFilmsComming.findIndex((el) => film.id === el.id);
        this.allFilmsComming.splice(index, 1);
      } else {
        let films = this.allFilms.filter((el) => film.id !== el.id);
        await this.removeFilm({ films, film });
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
        }, 4000);
        let index = this.allFilms.findIndex((el) => film.id === el.id);
        this.allFilms.splice(index, 1);
      }
    },
  },
  computed: mapGetters(["allFilms", "allFilmsComming"]),
  async mounted() {
    await this.$store.dispatch("fetchFilms", this.allFilms);
    await this.$store.dispatch("fetchFilmsComming", this.allFilmsComming);
    this.loading = false;
  },
};
</script>

<style scoped>
.films-wrap {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}
</style>
