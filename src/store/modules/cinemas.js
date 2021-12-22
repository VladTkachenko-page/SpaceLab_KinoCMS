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
          `cinemas/${cinema.id}/logo/ru/${cinema.id}`
        );
        await uploadBytes(storageRef, cinema.logoImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "cinemas/" + index), { imgLogoSRC: result });
            }
          );
        });
      }
      if (cinema.logoImgUa) {
        const storageRef = ref(
          storage,
          `cinemas/${cinema.id}/logo/ua/` + cinema.id
        );
        uploadBytes(storageRef, cinema.logoImgUa).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "cinemas/" + index), { imgLogoSRCUa: result });
            }
          );
        });
      }
      if (cinema.bannerImg) {
        const storageRef = ref(
          storage,
          `cinemas/${cinema.id}/banner/ru/` + cinema.id
        );
        uploadBytes(storageRef, cinema.bannerImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "cinemas/" + index), { imgBannerSRC: result });
            }
          );
        });
      }
      if (cinema.bannerImgUa) {
        const storageRef = ref(
          storage,
          `cinemas/${cinema.id}/banner/ua/` + cinema.id
        );
        uploadBytes(storageRef, cinema.bannerImgUa).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "cinemas/" + index), { imgBannerSRCUa: result });
            }
          );
        });
      }
      if (cinema.gallery) {
        cinema.gallery.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `cinemas/${cinema.id}/gallery/` + el.id
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
      if (cinema.galleryUa) {
        cinema.galleryUa.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `cinemas/${cinema.id}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `cinemas/${index}/galleryUa/` + i), {
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
              `cinemas/${cinema.halls[key].cinemaId}/halls/${cinema.halls[key].id}/scheme/ru/` +
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
          if (cinema.halls[key].schemeImgUa) {
            const storageRef = ref(
              storage,
              `cinemas/${cinema.halls[key].cinemaId}/halls/${cinema.halls[key].id}/scheme/ua/` +
                cinema.halls[key].id
            );
            uploadBytes(storageRef, cinema.halls[key].schemeImgUa).then(
              (snapshot) => {
                getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                  (result) => {
                    updateDb(
                      refDb(
                        db,
                        `cinemas/${index}/halls/${cinema.halls[key].id}`
                      ),
                      {
                        imgSchemeSRCUa: result,
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
              `cinemas/${cinema.halls[key].cinemaId}/halls/${cinema.halls[key].id}/banner/ru/` +
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
          if (cinema.halls[key].bannerImgUa) {
            const storageRef = ref(
              storage,
              `cinemas/${cinema.halls[key].cinemaId}/halls/${cinema.halls[key].id}/banner/ua/` +
                cinema.halls[key].id
            );
            uploadBytes(storageRef, cinema.halls[key].bannerImgUa).then(
              (snapshot) => {
                getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                  (result) => {
                    updateDb(
                      refDb(
                        db,
                        `cinemas/${index}/halls/${cinema.halls[key].id}`
                      ),
                      {
                        imgBannerSRCUa: result,
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
                `cinemas/${cinema.id}/halls/${cinema.halls[key].id}/gallery/` +
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
          if (cinema.halls[key].galleryUa) {
            cinema.halls[key].galleryUa.forEach((el, i) => {
              const storageRefGallery = ref(
                storage,
                `cinemas/${cinema.id}/halls/${cinema.halls[key].id}/gallery/` +
                  el.id
              );
              if (el.file) {
                uploadBytes(storageRefGallery, el.file).then((snapshot) => {
                  getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                    (result) => {
                      updateDb(
                        refDb(
                          db,
                          `cinemas/${index}/halls/${cinema.halls[key].id}/galleryUa/` +
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
    async removeCinemaImgGallery(state, deleteObj) {
      if (deleteObj.gallery.length !== 0) {
        deleteObj.gallery.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(
            storage,
            `cinemas/${deleteObj.id}/gallery/${el.id}`
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
      if (deleteObj.gallery.length !== 0) {
        deleteObj.gallery.forEach((el) => {
          const storage = getStorage();
          let desertRef = ref(
            storage,
            `cinemas/${deleteObj.id}/halls/${el.hallId}/gallery/${el.id}`
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
        `cinemas/${data.cinema.id}/logo/ru/${data.cinema.id}`
      );
      const logoRefUa = ref(
        storage,
        `cinemas/${data.cinema.id}/logo/ua/${data.cinema.id}`
      );
      const bannerRef = ref(
        storage,
        `cinemas/${data.cinema.id}/banner/ru/${data.cinema.id}`
      );
      const bannerRefUa = ref(
        storage,
        `cinemas/${data.cinema.id}/banner/ua/${data.cinema.id}`
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
      if (data.cinema.galleryUa !== undefined) {
        data.cinema.galleryUa.forEach((el) => {
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
      if (data.cinema.imgLogoSRCUa) {
        deleteObject(logoRefUa)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      if (data.cinema.imgBannerSRCUa) {
        deleteObject(bannerRefUa)
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
        if (data.cinema.halls[key].galleryUa !== undefined) {
          data.cinema.halls[key].galleryUa.forEach((el) => {
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
        if (data.cinema.halls[key].imgSchemeSRCUa) {
          deleteObject(schemeHallRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        }
        if (data.cinema.halls[key].imgBannerSRCUa) {
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
