import { db, refDb, setDb, childDb, getDb, updateDb } from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  state: {
    films: [],
    filmsComming: [],
  },
  actions: {
    async sendFilm({ commit }, film) {
      const index = this.state.films.films.findIndex((el) => film.id === el.id);
      try {
        setDb(refDb(db, "films/" + index), {
          ...film,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      if (film.mainImg) {
        const storageRef = ref(storage, `films/${film.id}/ru/` + film.id);
        uploadBytes(storageRef, film.mainImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "films/" + index), { imgSRC: result });
            }
          );
        });
      }
      if (film.mainImgUa) {
        const storageRef = ref(storage, `films/${film.id}/ua/` + film.id);
        uploadBytes(storageRef, film.mainImgUa).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "films/" + index), { imgSRCUa: result });
            }
          );
        });
      }
      film.gallery.forEach((el, i) => {
        const storageRefGallery = ref(
          storage,
          `films/${el.filmId}/gallery/` + el.id
        );
        if (el.file) {
          uploadBytes(storageRefGallery, el.file).then((snapshot) => {
            getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
              (result) => {
                updateDb(refDb(db, `films/${index}/gallery/` + i), {
                  id: el.id,
                  imgSRC: result,
                });
              }
            );
          });
        }
      });
    },
    async sendFilmComming({ commit }, film) {
      const index = this.state.films.filmsComming.findIndex(
        (el) => film.id === el.id
      );
      try {
        setDb(refDb(db, "filmsComming/" + index), {
          ...film,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      if (film.mainImg) {
        const storageRef = ref(storage, `films/${film.id}/ru/` + film.id);
        uploadBytes(storageRef, film.mainImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "films/" + index), { imgSRC: result });
            }
          );
        });
      }
      if (film.mainImgUa) {
        const storageRef = ref(storage, `films/${film.id}/ua/` + film.id);
        uploadBytes(storageRef, film.mainImgUa).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "films/" + index), { imgSRCUa: result });
            }
          );
        });
      }
      if (film.gallery) {
        film.gallery.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `films/${el.filmId}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `filmsComming/${index}/gallery/` + i), {
                    id: el.id,
                    imgSRC: result,
                  });
                }
              );
            });
          }
        });
      }
    },
    async fetchFilms(films) {
      const dbRef = refDb(db);
      await getDb(childDb(dbRef, `films/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.val().forEach((element, index) => {
              films.getters.allFilms[index] = element;
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchFilmsComming(films) {
      const dbRef = refDb(db);
      await getDb(childDb(dbRef, `filmsComming/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.val().forEach((element, index) => {
              films.getters.allFilmsComming[index] = element;
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mutations: {
    addFilm(state, newFilm) {
      state.films.push(newFilm);
    },
    error(state, error) {
      console.log(error);
    },
    removeFilmImgGallery(state, deleteObj) {
      if (deleteObj.length !== 0) {
        deleteObj.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(storage, `films/${el.filmId}/gallery/${el.id}`);
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    removeFilm({ commit }, data) {
      try {
        setDb(refDb(db, "films/"), {
          ...data.films,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      if (data.film.gallery !== undefined) {
        data.film.gallery.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `films/${data.film.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.film.imgSRC) {
        const desertRef = ref(
          storage,
          `films/${data.film.id}/ru/${data.film.id}`
        );
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      if (data.film.imgSRCUa) {
        const desertRef = ref(
          storage,
          `films/${data.film.id}/ua/${data.film.id}`
        );
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    },
    removeFilmComming({ commit }, data) {
      try {
        setDb(refDb(db, "filmsComming/"), {
          ...data.films,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      if (data.film.gallery !== undefined) {
        data.film.gallery.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `films/${data.film.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.film.imgSRC) {
        const desertRef = ref(
          storage,
          `films/${data.film.id}/ru/${data.film.id}`
        );
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      if (data.film.imgSRCUa) {
        const desertRef = ref(
          storage,
          `films/${data.film.id}/ua/${data.film.id}`
        );
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    },
  },
  getters: {
    allFilms(state) {
      return state.films;
    },
    allFilmsComming(state) {
      return state.filmsComming;
    },
    oneFilm: (state) => (id) => {
      return state.films.filter((film) => film.id === id);
    },
    oneFilmComming: (state) => (id) => {
      return state.filmsComming.filter((film) => film.id === id);
    },
  },
};
