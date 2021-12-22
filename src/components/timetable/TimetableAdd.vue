<template>
  <Loader v-if="loading" />
  <div class="timetable" v-else>
    <div class="timetable-selected">
      <select class="timetable-select" @change="addFilm" v-model="film">
        <option disabled value="0">Выберите фильм</option>
        <option
          v-for="film in this.allFilms"
          :key="film.id"
          :value="{
            filmId: film.id,
            filmName: film.name,
            filmImg: film.imgSRC,
            filmNameUa: film.nameUa,
            filmImgUa: film.imgSRCUa,
          }"
        >
          {{ film.name }}
        </option>
      </select>
      <select
        class="timetable-select timetable-item"
        v-model="cinema"
        @change="addCinema"
        v-if="this.film !== '0'"
      >
        <option disabled value="0">Выберите кинотеатр</option>
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
      <select
        class="timetable-select timetable-item"
        v-model="hall"
        @change="addHall"
        v-if="this.cinema !== '0'"
      >
        <option disabled value="0">Выберите зал</option>
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
    <div v-if="this.hall !== '0'" class="timetable-price">
      <label class="timetable-label" for="price">Цена за билет:</label>
      <input
        class="timetable-price__input"
        type="text"
        id="price"
        @change="addPrice"
        placeholder="Цена"
        v-model="price"
      />
    </div>
    <div v-if="this.price !== ''" class="timetable-date">
      <label class="timetable-label" for="timetable">Выберите время:</label>
      <input
        type="time"
        id="timetable"
        name="timetable"
        @change="addTime"
        v-model="time"
        :min="this.today"
      />
    </div>
    <div class="timetable__btn">
      <router-link
        v-if="this.time !== ''"
        tag="button"
        class="btn-success"
        :to="{
          name: 'timetableList',
          params: {
            id: +this.$attrs.id,
            idSession: +this.$attrs.idSession,
            session: this.session,
            timetable: this.$attrs.timetable || this.timetable,
          },
        }"
      >
        Сохранить
      </router-link>
      <router-link
        tag="button"
        class="btn-primary"
        :to="{
          name: 'timetableList',
          params: {
            id: +this.$attrs.id,
            idSession: +this.$attrs.idSession,
            allSessions: this.sessionsCopy,
          },
        }"
      >
        Вернуться
      </router-link>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/app/loader.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      session: {},
      film: "0",
      cinema: "0",
      hall: "0",
      today: "",
      loading: true,
      time: "",
      price: "",
      sessionsCopy: {},
    };
  },
  components: {
    Loader,
  },
  methods: {
    addFilm() {
      this.session = Object.assign(this.session, this.film);
    },
    addCinema() {
      this.session = Object.assign(this.session, this.cinema);
    },
    addHall() {
      this.session = Object.assign(this.session, this.hall);
    },
    addPrice() {
      this.session.price = this.price;
    },
    addTime() {
      this.session.time = this.time;
    },
  },
  computed: mapGetters(["allFilms", "allCinemas", "allTimetable"]),
  async mounted() {
    await this.$store.dispatch("fetchFilms");
    await this.$store.dispatch("fetchCinemas");
    await this.$store.dispatch("fetchTimetable");
    this.today =
      new Date().toISOString().split(":")[0] +
      ":" +
      new Date().toISOString().split(":")[1];
    let oneTimetable = this.$attrs.timetable;
    this.timetable = oneTimetable;
    if (!this.$attrs.timetable) {
      this.timetable = this.allTimetable.filter(
        (el) => el.id === +this.$attrs.id
      )[0];
    }
    if (oneTimetable) {
      this.sessionsCopy = JSON.parse(JSON.stringify(this.timetable.sessions));
    }
    if (oneTimetable.sessions){
      const index = oneTimetable.sessions.findIndex((el) => el.id === +this.$attrs.idSession);
      this.session = this.timetable.sessions[index];
    }
    if (!this.session) {
      this.session = {
        id: +this.$attrs.idSession,
        day: this.$attrs.timetable.day,
      };
    }
    if (this.session.filmId) {
      this.film = {
        filmId: this.session.filmId,
        filmName: this.session.filmName,
        filmImg: this.session.filmImg,
        filmNameUa: this.session.filmNameUa,
        filmImgUa: this.session.filmImgUa,
      };
      this.cinema = {
        cinemaId: this.session.cinemaId,
        cinemaName: this.session.cinemaName,
        cinemaHall: this.session.cinemaHall,
        cinemaNameUa: this.session.cinemaNameUa,
      };
      this.hall = {
        hallId: this.session.hallId,
        hallName: this.session.hallName,
        hallNameUa: this.session.hallNameUa,
      };
      this.price = this.session.price;
      this.time = this.session.time;
    }
    this.loading = false;
  },
};
</script>
<style scoped>
.timetable-selected {
  padding-top: 50px;
  display: flex;
  justify-content: center;
}
.timetable-price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.timetable-label {
  margin-bottom: 0;
  margin-right: 15px;
}
.timetable-select {
  margin-left: 15px;
}
.timetable-date,
.timetable__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
