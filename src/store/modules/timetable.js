import {
  db,
  refDb,
  setDb,
  childDb,
  getDb,
  removeDb,
  updateDb,
} from "../../firebase.js";

export default {
  state: {
    allTimetable: [],
  },
  actions: {
    async sendTimetable({ commit }, data) {
      const index = this.state.timetable.allTimetable.findIndex(
        (el) => data.id === el.id
      );
      try {
        setDb(refDb(db, "timetable/" + index), {
          ...data,
        });
      } catch (e) {
        commit("error", e);
      }
    },
    async sendTickets({ commit }, data) {
      const index = this.state.timetable.allTimetable.findIndex(
        (el) => data.day === el.day
      );
      const indexSession = this.state.timetable.allTimetable[
        index
      ].sessions.findIndex((item) => item.id === data.id);
      try {
        updateDb(refDb(db, `timetable/${index}/sessions/${indexSession}`), {
          ...data,
        });
      } catch (e) {
        commit("error", e);
      }
    },
    async fetchTimetable(timetable) {
      const dbRef = refDb(db);
      await getDb(childDb(dbRef, `timetable/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.val().forEach((element, index) => {
              timetable.getters.allTimetable[index] = element;
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async removeTimetable({ commit }, data) {
      try {
        await removeDb(refDb(db, "timetable/" + data.id), {});
        delete this.state.timetable.allTimetable[data.id];
      } catch (e) {
        commit("error", e);
      }
    },
  },
  mutations: {
    error(state, error) {
      console.log(error);
    },
  },
  getters: {
    allTimetable(state) {
      return state.allTimetable;
    },
    oneTimetable: (state) => (id) => {
      return state.allTimetable.filter((timetable) => timetable.id === id);
    },
  },
};
