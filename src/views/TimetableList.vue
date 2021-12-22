<template>
  <Loader v-if="loading" />
  <div v-else>
    <h2 class="main__title text-center timetable-title">Расписание</h2>
    <div class="timetable__header">
      <div class="timetable-date">
        <label class="timetable-label" for="timetable"
          >Выберите дату сеансов</label
        >
        <input
          type="date"
          id="timetable"
          name="timetable"
          v-model="date"
          :min="this.today"
        />
      </div>
      <router-link
        v-if="this.date"
        tag="button"
        :to="{
          name: 'timetableAdd',
          params: {
            id: +this.$attrs.id,
            idSession: new Date().getTime(),
            timetable: this.timetable,
          },
        }"
        class="btn-success"
      >
        Добавить сеанс
      </router-link>
    </div>
    <div class="timetable__wrap">
      <div class="table-responsive">
        <table class="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Фильм</th>
              <th>Кинотеатр</th>
              <th>Зал</th>
              <th>Цена</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>
            <timetableTable
              v-for="session in this.timetable.sessions"
              :key="session.id"
              :timetable="timetable"
              :session="session"
              @showModal="showModalDelete"
            />
          </tbody>
        </table>
      </div>
    </div>
    <div class="edit-buttons">
      <button type="submit" class="btn-success" @click.prevent="sendTimetable">
        Сохранить
      </button>
      <router-link
        tag="button"
        class="btn-primary"
        :to="{
          name: 'timetableDay',
        }"
      >
        Вернуться
      </router-link>
    </div>
    <modal
      :obj="this.sessionDelete"
      v-if="showModal"
      @close="showModal = false"
      @delete="deleteSession"
    >
      <h3 slot="header">
        Удаление
        {{ this.timetableDelete.day + " " + this.timetableDelete.time }}
      </h3>
      <p slot="body">
        Вы уверены что хотите удалить сеанс
        {{ this.timetableDelete.day + " " + this.timetableDelete.time }}?
      </p>
    </modal>
    <Toast :sending="this.sending" :text="'Сеансы успешно сохранены'"></Toast>
  </div>
</template>

<script>
import Toast from "@/components/app/toast.vue";
import Loader from "@/components/app/loader.vue";
import modal from "@/components/app/modal.vue";
import timetableTable from "@/components/timetable/timetableTable.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showModal: false,
      sending: false,
      timetable: {},
      sessionDelete: {},
      today: "",
      date: "",
    };
  },
  components: {
    Loader,
    Toast,
    modal,
    timetableTable,
  },
  watch: {
    date() {
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
        let day =
          this.date.split("-")[2].split("T")[0] +
          " " +
          monthRU[+this.date.split("-")[1] - 1];
        this.timetable["day"] = day;
        this.timetable["date"] = this.date;
      }
    },
  },
  methods: {
    showModalDelete(timetable) {
      this.showModal = true;
      this.timetableDelete = timetable;
    },
    async deleteSession(session) {
      this.$store.dispatch("removeTimetable", session);
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
      this.showModal = false;
      delete this.timetable.session[session.id];
    },
    async sendTimetable() {
      try {
        if (
          this.allTimetable.findIndex((el) => el.id === this.timetable.id) ===
          -1
        ) {
          this.allTimetable.push(this.timetable);
        }
        await this.$store.dispatch("sendTimetable", this.timetable);
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
          this.$router.push("/timetableDay");
        }, 1000);
        this.disabled = true;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: mapGetters(["allTimetable"]),
  async mounted() {
    await this.$store.dispatch("fetchTimetable", this.allTimetable);
    this.timetable = await this.$store.getters.oneTimetable(+this.$attrs.id)[0];
    if (!this.timetable) {
      this.timetable = { id: +this.$attrs.id };
    }
    if (!this.timetable.sessions) {
      this.timetable.sessions = [];
    }
    if (this.$attrs.allSessions) {
      this.timetable.sessions = this.$attrs.allSessions;
    }
    if (this.$attrs.timetable) {
      this.timetable = await this.$attrs.timetable;
    }
    if (this.$attrs.session) {
      const index = this.timetable.sessions.findIndex((el) => el.id === +this.$attrs.idSession);
      if (index !== -1) {
        this.timetable.sessions.splice(index, 1, this.$attrs.session)
      } else {
        this.timetable.sessions.push(this.$attrs.session);
      }
    }
    if (this.timetable.date) {
      this.date = this.timetable.date;
    }
    this.today = new Date().toISOString().split("T")[0];
    this.loading = false;
  },
};
</script>

<style scoped>
.timetable__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.timetable-label {
  margin-right: 10px;
}
.edit-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
}
.edit-buttons button {
  margin-right: 50px;
}
</style>
