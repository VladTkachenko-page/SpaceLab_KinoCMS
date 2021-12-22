import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { db, refDb, setDb} from "../../firebase.js";

export default {
  actions: {

    async login({ commit }, { email, password }) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        commit("error", e);
        throw e
      }
    },

    async register({dispatch, commit}, formData) {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        const uid = await dispatch('getUid');
        try {
          setDb(refDb(db, `/users/${uid}/`), {
            ...formData,
            uid
          });
        } catch (e) {
          commit("error", e);
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    getUid() {
      const auth = getAuth();
      const user = auth.currentUser
      return user ? user.uid : null
    },
    
    async logout() {
      const auth = getAuth();
      await auth.signOut()
    }
  }
}