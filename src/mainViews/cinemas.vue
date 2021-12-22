<template>
  <Loader v-if="loading" />
  <div v-else class="cinemas">
    <h2 class="cinemas__title text-center">Наши кинотеатры</h2>
    <div class="cinemas__items">
      <div
        class="cinemas__item"
        v-for="cinema in this.allCinemas"
        :key="cinema.id"
      >
        <router-link
          :to="{
            name: 'cinemasInfo',
            params: { id: cinema.id },
          }"
          class=""
        >
          <img :src="cinema.imgLogoSRC" alt="" />
          <p class="cinemas__name">{{ cinema.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "@/components/app/loader.vue";

export default {
  data() {
    return {
      loading: true,
    };
  },

  components: {
    Loader,
  },

  computed: mapGetters(["allCinemas"]),

  async mounted() {
    await this.$store.dispatch("fetchCinemas");
    this.loading = false;
  },
};
</script>

<style scoped>
.cinemas__items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 auto;
}
.cinemas__item img {
  height: 250px;
  width: 340px;
}
.cinemas__name {
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 5px;
}
</style>
