import { db, refDb, setDb, childDb, getDb, updateDb, removeDb } from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  state: {
    cinemas: [],
  },
  actions: {
    async sendCinema({ commit }, cinema) {
      const index = this.state.cinemas.cinemas.findIndex(
        (el) => cinema.id === el.id
      );
      try {
        setDb(refDb(db, "cinemas/" + index), {
          ...cinema,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      if (cinema.logoImg) {
        const storageRef = ref(
          storage,
          `cinemas/${cinema.id}/logo/` + cinema.id
        );
        uploadBytes(storageRef, cinema.logoImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "cinemas/" + index), { imgLogoSRC: result });
            }
          );
        });
      }
      if (cinema.bannerImg) {
        const storageRef = ref(
          storage,
          `cinemas/${cinema.id}/banner/` + cinema.id
        );
        uploadBytes(storageRef, cinema.bannerImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "cinemas/" + index), { imgBannerSRC: result });
            }
          );
        });
      }
      if (cinema.gallery) {
        cinema.gallery.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `cinemas/${el.cinemaId}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `cinemas/${index}/gallery/` + i), {
                    id: el.id,
                    imgSRC: result,
                  });
                }
              );
            });
          }
        });
      }
      if (cinema.halls) {
        for (let key in cinema.halls) {
          if (cinema.halls[key].schemeImg) {
            const storageRef = ref(
              storage,
              `cinemas/${cinema.halls[key].cinemaId}/halls/${cinema.halls[key].id}/scheme/` +
                cinema.halls[key].id
            );
            uploadBytes(storageRef, cinema.halls[key].schemeImg).then(
              (snapshot) => {
                getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                  (result) => {
                    updateDb(
                      refDb(
                        db,
                        `cinemas/${index}/halls/${cinema.halls[key].id}`
                      ),
                      {
                        imgSchemeSRC: result,
                      }
                    );
                  }
                );
              }
            );
          }
          if (cinema.halls[key].bannerImg) {
            const storageRef = ref(
              storage,
              `cinemas/${cinema.halls[key].cinemaId}/halls/${cinema.halls[key].id}/banner/` +
                cinema.halls[key].id
            );
            uploadBytes(storageRef, cinema.halls[key].bannerImg).then(
              (snapshot) => {
                getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                  (result) => {
                    updateDb(
                      refDb(
                        db,
                        `cinemas/${index}/halls/${cinema.halls[key].id}`
                      ),
                      {
                        imgBannerSRC: result,
                      }
                    );
                  }
                );
              }
            );
          }
          if (cinema.halls[key].gallery) {
            cinema.halls[key].gallery.forEach((el, i) => {
              const storageRefGallery = ref(
                storage,
                `cinemas/${cinema.halls[key].cinemaId}/halls/${cinema.halls[key].id}/gallery/` +
                  el.id
              );
              if (el.file) {
                uploadBytes(storageRefGallery, el.file).then((snapshot) => {
                  getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                    (result) => {
                      updateDb(
                        refDb(
                          db,
                          `cinemas/${index}/halls/${cinema.halls[key].id}/gallery/` +
                            i
                        ),
                        {
                          id: el.id,
                          imgSRC: result,
                        }
                      );
                    }
                  );
                });
              }
            });
          }
        }
      }
    },
    async fetchCinemas(cinemas) {
      const dbRef = refDb(db);
      await getDb(childDb(dbRef, `cinemas/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.val().forEach((element, index) => {
              cinemas.getters.allCinemas[index] = element;
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
    addCinema(state, newCinema) {
      state.cinemas.push(newCinema);
    },
    error(state, error) {
      console.log(error);
    },
    async removeMainCinemaImg(state, id) {
      const storage = getStorage();
      const desertRef = ref(storage, `cinemas/${id}/` + id);
      deleteObject(desertRef)
        .then(() => {
          const index = state.cinemas.findIndex((el) => id === el.id);
          updateDb(refDb(db, "cinemas/" + index), {
            imgSRC:
              "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeCinemaImgGallery(state, deleteObj) {
      if (deleteObj.length !== 0) {
        deleteObj.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(
            storage,
            `cinemas/${el.cinemaId}/gallery/${el.id}`
          );
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    async removeHallImgGallery(state, deleteObj) {
      if (deleteObj.length !== 0) {
        deleteObj.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(
            storage,
            `cinemas/${el.cinemaId}/halls/${el.hallId}/gallery/${el.id}`
          );
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    async removeCinema({ commit }, data) {
      try {
        setDb(refDb(db, "cinemas/"), {
          ...data.cinemas,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const logoRef = ref(
        storage,
        `cinemas/${data.cinema.id}/logo/${data.cinema.id}`
      );
      const bannerRef = ref(
        storage,
        `cinemas/${data.cinema.id}/banner/${data.cinema.id}`
      );
      if (data.cinema.gallery !== undefined) {
        data.cinema.gallery.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `cinemas/${data.cinema.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.cinema.imgLogoSRC) {
        deleteObject(logoRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      if (data.cinema.imgBannerSRC) {
        deleteObject(bannerRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      for (let key in data.cinema.halls) {
        const schemeHallRef = ref(
          storage,
          `cinemas/${data.cinema.id}/halls/${key}/scheme/${key}`
        );
        const bannerHallRef = ref(
          storage,
          `cinemas/${data.cinema.id}/halls/${key}/banner/${key}`
        );

        if (data.cinema.halls[key].gallery !== undefined) {
          data.cinema.halls[key].gallery.forEach((el) => {
            const storage = getStorage();
            const desertRef = ref(
              storage,
              `cinemas/${el.cinemaId}/halls/${el.hallId}/gallery/${el.id}`
            );
            deleteObject(desertRef)
              .then(() => {})
              .catch((error) => {
                console.log("error: ", error);
              });
          });
        }
        if (data.cinema.halls[key].imgSchemeSRC) {
          deleteObject(schemeHallRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        }
        if (data.cinema.halls[key].imgBannerSRC) {
          deleteObject(bannerHallRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        }
      }
    },
    async removeHall({ commit }, data) {
      const index = this.state.cinemas.cinemas.findIndex(
        (el) => data.cinemaId === el.id
      );
      try {
        removeDb(refDb(db, `cinemas/${index}/halls/${data.id}`));
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const schemeHallRef = ref(
        storage,
        `cinemas/${data.cinemaId}/halls/${data.id}/scheme/${data.id}`
      );
      const bannerHallRef = ref(
        storage,
        `cinemas/${data.cinemaId}/halls/${data.id}/banner/${data.id}`
      );

      if (data.gallery !== undefined) {
        data.gallery.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(
            storage,
            `cinemas/${el.cinemaId}/halls/${el.hallId}/gallery/${el.id}`
          );
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.imgSchemeSRC) {
        deleteObject(schemeHallRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      if (data.imgBannerSRC) {
        deleteObject(bannerHallRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    },
  },
  getters: {
    allCinemas(state) {
      return state.cinemas;
    },
    oneCinema: (state) => (id) => {
      return state.cinemas.filter((cinema) => cinema.id === id);
    },
  },
};
