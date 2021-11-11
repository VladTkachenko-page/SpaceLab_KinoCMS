<template>
  <div>
    <h2 class="main__title text-center cinemas__title">Список кинотеатров</h2>
    <Loader v-if="loading" />
    <div class="cinemas-wrap" v-else>
      <cinemasCard
        v-for="cinema in this.allCinemas"
        :key="cinema.id"
        :cinema="cinema"
        :cinemas="allCinemas"
        @delete="cinemaDelete"
      />
      <router-link
        tag="button"
        :to="{
          name: 'cinemaEditRu',
          params: { id: new Date().getTime(), lang: 'ru' },
        }"
        class="btn-success"
      >
        Добавить
      </router-link>
    </div>
    <Toast :sending="this.sending" :text="'Кинотеатр успешно удален'"></Toast>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import Toast from "@/components/app/toast.vue";
import cinemasCard from "@/components/cinemas/cinemasCard.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      sending: false,
      loading: true,
    };
  },
  components: {
    cinemasCard,
    Loader,
    Toast,
  },
  methods: {
    ...mapMutations(["removeCinema"]),
    async cinemaDelete(cinema) {
      let cinemas = this.allCinemas.filter((el) => cinema.id !== el.id);
      await this.removeCinema({ cinemas, cinema });
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
      let index = this.allCinemas.findIndex((el) => cinema.id === el.id);
      this.allCinemas.splice(index, 1);
    },
  },
  computed: mapGetters(["allCinemas"]),
  async mounted() {
    await this.$store.dispatch("fetchCinemas", this.allCinemas);
    this.loading = false;
  },
};
</script>

<style scoped>
.cinemas-wrap {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}
</style>
