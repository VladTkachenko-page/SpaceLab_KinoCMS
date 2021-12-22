import { db, refDb, setDb, childDb, getDb, removeDb } from "../../firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  deleteUser,
  updateEmail,
  updatePassword,
} from "firebase/auth";

export default {
  state: {
    allUsers: {},
  },
  actions: {
    async sendUser({ commit }, user) {
      const oldDateUser = this.state.users.allUsers[user.uid]
      const auth = getAuth();
     
      if (oldDateUser.email !== user.email) {
        try {
          await signInWithEmailAndPassword(auth, oldDateUser.email, oldDateUser.password);
        } catch (e) {
          commit("error", e);
          throw e;
        }
        await updateEmail(auth.currentUser, user.email)
          .then(() => {})
          .catch((error) => {
            commit("error", error);
          });
      }

      if (oldDateUser.password !== user.password) {
        try {
          await signInWithEmailAndPassword(auth, oldDateUser.email, oldDateUser.password);
        } catch (e) {
          commit("error", e);
          throw e;
        }
        await updatePassword(auth.currentUser, user.password)
          .then(() => {})
          .catch((error) => {
            commit("error", error);
          });
      }

      try {
        await signInWithEmailAndPassword(auth, "admin@gmail.com", "123456");
      } catch (e) {
        commit("error", e);
        throw e;
      }

      try {
        setDb(refDb(db, "users/" + user.uid), {
          ...user,
        });
      } catch (e) {
        commit("error", e);
      }
    },

    async fetchUsers(users) {
      const dbRef = refDb(db);

      await getDb(childDb(dbRef, `users/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (let key in snapshot.val()) {
              users.getters.allUsers[key] = snapshot.val()[key];
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async removeUser({ commit }, data) {
      const auth = getAuth();

      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (e) {
        commit("error", e);
        throw e;
      }

      await deleteUser(auth.currentUser)
        .then(() => {})
        .catch((error) => {
          commit("error", error);
        });
      
        try {
        await signInWithEmailAndPassword(auth, "admin@gmail.com", "123456");
      } catch (e) {
        commit("error", e);
        throw e;
      }
      
      try {
        await removeDb(refDb(db, "users/" + data.uid), {});
        delete this.state.users.allUsers[data.uid];
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
    allUsers(state) {
      return state.allUsers;
    },
    oneUser: (state) => (uid) => {
      return state.allUsers[uid];
    },
  },
};
