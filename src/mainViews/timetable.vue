<template>
  <Loader v-if="loading" />
  <div v-else class="timetable container">
    <div class="timetable__top">
      <div class="timetable__select">
        <select class="form-control" v-model="cinema">
          <option value="all">Выберите кинотеатр</option>
          <option
            v-for="cinema in this.allCinemas"
            :key="cinema.id"
            :value="{
              cinemaId: cinema.id,
              cinemaName: cinema.name,
              cinemaHall: cinema.halls,
              cinemaNameUa: cinema.nameUa,
            }"
          >
            {{ cinema.name }}
          </option>
        </select>
      </div>
      <div class="timetable__select">
        <DatePicker
          v-model="date"
          :masks="masks"
          :min-date="new Date()"
          @input="dateFormatter"
          :attributes="attrs"
        >
          <template #default="{ inputValue, inputEvents }">
            <input
              class="px-3 py-1 border rounded"
              :value="inputValue"
              v-on="inputEvents"
              placeholder="Выберите дату"
            />
          </template>
        </DatePicker>
      </div>
      <div class="timetable__select">
        <select class="form-control" v-model="film">
          <option value="all">Выберите фильм</option>
          <option
            v-for="film in this.allFilms"
            :key="film.id"
            :value="{
              filmId: film.id,
              filmName: film.name,
              filmNameUa: film.nameUa,
            }"
          >
            {{ film.name }}
          </option>
        </select>
      </div>
      <div class="timetable__select">
        <select class="form-control" v-model="hall">
          <option value="all">Выберите зал</option>
          <option
            v-for="hall in this.cinema.cinemaHall"
            :key="hall.id"
            :value="{
              hallId: hall.id,
              hallName: hall.name,
              hallNameUa: hall.nameUa,
            }"
          >
            {{ hall.name }}
          </option>
        </select>
      </div>
    </div>
    <div
      class="timetable__items table-responsive"
      v-for="timetable in this.allTimetables"
      :key="timetable.id"
    >
      <div v-if="timetable.sessions.length !== 0">
        {{ timetable.day }}
        <table class="timetable__item table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Время</th>
              <th>Фильм</th>
              <th>Зал</th>
              <th>Цена</th>
              <th>Бронировать</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="session in timetable.sessions" :key="session.id">
              <td>{{ session.time }}</td>
              <td>
                <router-link
                  tag="a"
                  :to="{
                    name: 'filmInfo',
                    params: {
                      id: session.filmId,
                    },
                  }"
                >
                  <span class="poster-films__name">
                    {{ session.filmName }}
                  </span>
                </router-link>
              </td>
              <td>{{ session.hallName }}</td>
              <td>{{ session.price }}</td>
              <td>
                <router-link
                  tag="div"
                  class="timetable__item-ticket"
                  :to="{
                    name: 'session',
                    params: {
                      id: session.id,
                      session: session,
                    },
                  }"
                >
                  <i class="fas fa-ticket-alt"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="
        this.allTimetables.length === 0 ||
        this.allTimetables[0].sessions.length === 0
      "
      class="search-none"
    >
      <h3 class="text-center mt-4 mb-4">Сеансов не найдено</h3>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
// import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      film: "all",
      cinema: "all",
      hall: "all",
      loading: true,
      date: "",
      allTimetables: [],
      masks: {
        input: "DD.MM.YYYY",
      },
      attrs: [
        {
          bar: "red",
          dates: [],
        },
      ],
    };
  },
  computed: mapGetters(["allFilms", "allCinemas", "allTimetable"]),
  components: {
    Loader,
    // Calendar,
    DatePicker,
  },
  watch: {
    async cinema() {
      if (this.cinema === "all") {
        this.hall = "all";
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
      }
      if (this.cinema === "all" && this.film !== "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }
      if (this.cinema === "all" && this.date && this.film === "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
      }
      if (this.cinema === "all" && this.date && this.film !== "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }
    },

    async hall() {
      if (this.hall !== "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.hallName === this.hall.hallName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }

      if (this.hall !== "all" && this.date) {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.hallName === this.hall.hallName
          );
        });
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
      }
      if (this.hall !== "all" && this.film !== "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.hallName === this.hall.hallName
          );
        });
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }

      if (this.hall === "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.allTimetables.forEach((item) => {
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }
      if (this.film !== "all" && this.hall === "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }
      // if (this.film !== "all" && this.hall !== "all" && this.date) {
      //   await this.$store.dispatch("fetchTimetable");
      //   this.$forceUpdate();
      //   this.allTimetables = this.allTimetable;
      //   this.attrs[0].dates = [];
      //   this.allTimetables = this.allTimetable.filter(
      //     (item) => item.day === this.date
      //   );
      //   this.allTimetables.forEach((item) => {
      //     item.sessions = item.sessions.filter(
      //       (item) => item.filmName === this.film.filmName
      //     );
      //     let year = item.date.split("-")[0],
      //       month = item.date.split("-")[1],
      //       day = item.date.split("-")[2];
      //     if (item.sessions.length !== 0) {
      //       this.attrs[0].dates.push(new Date(year, month - 1, day));
      //     }
      //   });
      // }
    },

    async film() {
      if (this.film !== "all" && !this.date) {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }

      if (this.film !== "all" && this.date) {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.attrs[0].dates = [];
        this.allTimetables = this.allTimetable;
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
      }

      if (this.hall !== "all" && this.film !== "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.hallName === this.hall.hallName
          );
        });
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }

      if (this.film === "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.allTimetables.forEach((item) => {
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          this.attrs[0].dates.push(new Date(year, month - 1, day));
        });
      }
      if (this.date && this.film === "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
      }

      if (this.hall !== "all" && this.film === "all") {
        await this.$store.dispatch("fetchTimetable");
        this.allTimetables = this.allTimetable;
        this.$forceUpdate();
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.hallName === this.hall.hallName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }
    },
    async date() {
      if (this.date !== "all") {
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
      }

      if (!this.date) {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
      }
      if (this.hall !== "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.hallName === this.hall.hallName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }
      if (this.film !== "all" && !this.date) {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          if (item.sessions.length !== 0) {
            this.attrs[0].dates.push(new Date(year, month - 1, day));
          }
        });
      }
      if (this.film !== "all" && this.date) {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item1) => item1.filmName === this.film.filmName
          );
        });
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
      }
      if (this.hall !== "all" && this.date && this.film !== "all") {
        await this.$store.dispatch("fetchTimetable");
        this.$forceUpdate();
        this.allTimetables = this.allTimetable;
        this.attrs[0].dates = [];
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.filmName === this.film.filmName
          );
        });
        this.allTimetables.forEach((item) => {
          item.sessions = item.sessions.filter(
            (item) => item.hallName === this.hall.hallName
          );
        });
        this.allTimetables = this.allTimetable.filter(
          (item) => item.day === this.date
        );
        this.allTimetables.forEach((item) => {
          let year = item.date.split("-")[0],
            month = item.date.split("-")[1],
            day = item.date.split("-")[2];
          this.attrs[0].dates.push(new Date(year, month - 1, day));
        });
      }
    },
  },
  methods: {
    dateFormatter() {
      let monthRU = [
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
      ];
      if (this.date) {
        this.date = this.date.getDate() + " " + monthRU[this.date.getMonth()];
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchFilms");
    await this.$store.dispatch("fetchCinemas");
    await this.$store.dispatch("fetchTimetable");
    this.allTimetables = this.allTimetables.concat(this.allTimetable);
    this.allTimetables.forEach((item) => {
      let year = item.date.split("-")[0],
        month = item.date.split("-")[1],
        day = item.date.split("-")[2];
      this.attrs[0].dates.push(new Date(year, month - 1, day));
    });
    this.loading = false;
  },
};
</script>

<style scoped>
.timetable__top {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
.timetable__select {
  margin-left: 10px;
}
.timetable__item-ticket {
  max-width: 100px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.timetable__item-ticket i {
  transform: rotate(135deg);
}
</style>
