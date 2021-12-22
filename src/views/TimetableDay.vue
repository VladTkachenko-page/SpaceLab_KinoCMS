<template>
  <Loader v-if="loading" />
  <div v-else>
    <h2 class="main__title text-center cinemas__title">Список дат</h2>
    <div class="cinemas-wrap">
      <div class="table-responsive">
        <table class="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Количество сеансов</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in allTimetable" :key="day.id">
              <td>{{ day.day }}</td>
              <td v-if="day.sessions">{{ Object.keys(day.sessions).length }}</td>
              <td v-else>{{ 0 }}</td>
              <td>
                <router-link
                  class="btn-success"
                  tag="button"
                  :to="{
                    name: 'timetableList',
                    params: { id: day.id },
                  }"
                >
                  Ред
                </router-link>
              </td>
              <td>
                <button
                  @click.prevent="$emit('showModal', day)"
                  class="btn-danger"
                >
                  Удал
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <router-link
        tag="button"
        :to="{
          name: 'timetableList',
          params: { id: new Date().getTime() },
        }"
        class="btn-success"
      >
        Добавить
      </router-link>
    </div>
    <Toast :sending="this.sending" :text="'Кинотеатр успешно удален'"></Toast>
    <modal
      :obj="this.cinema"
      v-if="showModal"
      @close="showModal = false"
      @delete="cinemaDelete"
    >
      <h3 slot="header">Удаление {{ this.cinema.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить кинотеатр {{ this.cinema.name }}?
      </p>
    </modal>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import Toast from "@/components/app/toast.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      sending: false,
      loading: true,
    };
  },
  components: {
    Loader,
    Toast,
  },
  methods: {
    // ...mapMutations(["removeCinema"]),
    // async cinemaDelete(cinema) {
    //   let cinemas = this.allCinemas.filter((el) => cinema.id !== el.id);
    //   await this.removeCinema({ cinemas, cinema });
    //   this.sending = true;
    //   setTimeout(() => {
    //     this.sending = false;
    //   }, 4000);
    //   let index = this.allCinemas.findIndex((el) => cinema.id === el.id);
    //   this.allCinemas.splice(index, 1);
    // },
  },
  computed: mapGetters(["allTimetable"]),
  async mounted() {
    await this.$store.dispatch("fetchTimetable", this.allTimetable);
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
