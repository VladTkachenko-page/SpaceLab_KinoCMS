<template>
  <Loader v-if="loading" />
  <div v-else class="poster">
    <div class="poster__nav main-sidebar">
      <!-- Sidebar -->
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
        >
          <li v-for="link in links" :key="link.url" class="nav-item">
            <router-link
              class="nav-link"
              tag="a"
              :to="link.url"
              active-class="active"
              :exact="link.exact"
            >
              <p>{{ link.title }}</p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
      <!-- /.sidebar -->
    </div>
    <div class="poster-films__items">
      <div
        class="poster-films__item"
        v-for="film in this.allFilms"
        :key="film.id"
      >
        <div class="poster-films__types">
          <span
            class="badge bg-primary poster-films__type"
            v-for="type in film.typeFilm"
            :key="type.index"
            >{{ type }}</span
          >
        </div>
        <p class="poster-films__date">Сейчас в кино</p>
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
          <p class="poster-films__name text-center">{{ film.name }}</p>
        </router-link>
        <button class="poster-films__btn btn-warning">
          <i class="fas fa-ticket-alt"></i>Купить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      links: [
        { title: "Афиша", url: "/poster", exact: true },
        { title: "Скоро", url: "/poster/comingSoon" },
      ],

      loading: true,
    };
  },
  components: {
    Loader,
  },
  computed: mapGetters(["allFilms"]),
  async mounted() {
    await this.$store.dispatch("fetchFilms");
    this.loading = false;
  },
};
</script>

<style scoped>
.poster__nav {
  background-color: #fff;
  top: 150px;
  height: 100px;
  max-width: 170px;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
}
.poster-films__items {
  background-color: #161e27;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #fff;
}
.poster-films__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  margin-bottom: 10px;
  position: relative;
}
.poster-films__item img {
  width: 250px;
  height: 350px;
}
.poster-films__types {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -25px;
  top: 60px;
}
.poster-films__type {
  margin-bottom: 20px;
  padding: 5px 15px;
}
.poster-films__btn {
  padding: 5px 10px;
  color: #fff;
  border-radius: 15px;
  font-weight: 600;
  text-transform: uppercase;
}
.poster-films__btn i {
  transform: rotate(135deg);
  margin-right: 10px;
}
.nav-link {
  max-width: 150px;
}
</style>
