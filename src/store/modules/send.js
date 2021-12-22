import { db, refDb, setDb, updateDb, getDb, childDb } from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  state: {
    allTemplates: [],
  },
  actions: {
    async sendSMS({ commit }, sms) {
      try {
        setDb(
          refDb(
            db,
            "sending/sms/" +
              `${new Date().getDate()}-${
                new Date().getMonth() + 1
              }-${new Date().getFullYear()}-${new Date().getHours()}:${new Date().getMinutes()}`
          ),
          {
            ...sms,
          }
        );
      } catch (e) {
        commit("error", e);
      }
    },

    async sendEmail({ commit }, email) {
      try {
        setDb(
          refDb(
            db,
            "sending/email/" +
              `${new Date().getDate()}-${
                new Date().getMonth() + 1
              }-${new Date().getFullYear()}-${new Date().getHours()}:${new Date().getMinutes()}`
          ),
          {
            ...email,
          }
        );
      } catch (e) {
        commit("error", e);
      }
    },

    async sendHTMLTemplate({ state, commit }, html) {
      const storage = getStorage();
      const storageRef = ref(storage, `sending/${html.id}/`);
      if (state.allTemplates.length >= 5) {
        const desertRef = ref(storage, `sending/${state.allTemplates[0].id}/`);
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
        const template = state.allTemplates;
        template.splice(0, 1);
        try {
          setDb(refDb(db, "sending/template/"), {
            ...template,
          });
        } catch (e) {
          commit("error", e);
        }
      }
      await uploadBytes(storageRef, html.file).then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath))
          .then((result) => {
            updateDb(
              refDb(db, "sending/template/" + state.allTemplates.length),
              {
                fileSRC: result,
                name: html.name,
                id: html.id,
              }
            );
            const dbRef = refDb(db);
            let templates = {};
            getDb(childDb(dbRef, `sending/template/`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  state.allTemplates = snapshot.val();
                } else {
                  console.log("No data available");
                }
              })
              .catch((error) => {
                console.error(error);
              });
            commit("updateTemplate", templates);
          })
          .catch((e) => {
            commit("error", e);
          });
      });
    },

    async fetchTemplate(template) {
      const dbRef = refDb(db);
      let templates = {};
      await getDb(childDb(dbRef, `sending/template/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (let key in snapshot.val()) {
              templates[key] = snapshot.val()[key];
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      await template.commit("updateTemplate", templates);
    },

    async removeTemplate({ commit }, data) {
      try {
        setDb(refDb(db, "sending/template/"), {
          ...data.templates,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const desertRef = ref(storage, `sending/${data.template.id}`);
      deleteObject(desertRef)
        .then(() => {})
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },

  mutations: {
    error(state, error) {
      console.log(error);
    },
    updateTemplate(state, template) {
      for (let key in template) {
        state.allTemplates[key] = template[key];
      }
    },
  },
  
  getters: {
    allTemplates(state) {
      return state.allTemplates;
    },
  },
};
