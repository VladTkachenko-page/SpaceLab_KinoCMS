import {
  db,
  refDb,
  setDb,
  childDb,
  getDb,
  updateDb,
  onValueDb,
} from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  state: {
    upCards: [],
    downCards: [],
    speedUp: 1,
    speedDown: 1,
    backBanner:{},
    statusMain: true,
    statusNews: true
  },
  actions: {
    async pushMainBannerCard({ commit }, upCards) {
      try {
        await setDb(refDb(db, "banners/upCards"), {
          ...upCards.banner,
          speed: upCards.speed,
          status: upCards.status
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      upCards.banner.forEach((el, i) => {
        const storageRef = ref(storage, "banners/mainBanner/" + el.id);
        if (el.img) {
          uploadBytes(storageRef, el.img).then((snapshot) => {
            getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
              (result) => {
                updateDb(refDb(db, "banners/upCards/" + i), { imgSRC: result });
              }
            );
          });
        }
      });
    },
    removeMainBannerCard(ctx, deleteObj) {
      if (deleteObj.length !== 0) {
        deleteObj.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(storage, `banners/mainBanner/${el.id}`);
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    async pushNewsBannerCard({ commit }, downCards) {
      try {
        await setDb(refDb(db, "banners/downCards"), {
          ...downCards.banner,
          speed: downCards.speed,
          status: downCards.status,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      downCards.banner.forEach((el, i) => {
        const storageRef = ref(storage, "banners/newsBanner/" + el.id);
        if (el.img) {
          uploadBytes(storageRef, el.img).then((snapshot) => {
            getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
              (result) => {
                updateDb(refDb(db, "banners/downCards/" + i), {
                  imgSRC: result,
                });
              }
            );
          });
        }
      });
    },
    removeBackBannerCard({ commit }, backBanner) {
      const storage = getStorage();
      const desertRef = ref(storage, `banners/backBanner/${backBanner.id}`);
      deleteObject(desertRef)
        .then(() => {
          updateDb(refDb(db, "banners/backBanner/"), {
            imgSRC: "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
          });
        })
        .catch((error) => {
          commit("error", error);
        });
    },
    async pushBackBannerCard({ commit }, backBanner) {
      try {
        await setDb(refDb(db, "banners/backBanner"), {
          ...backBanner,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const storageRef = ref(storage, "banners/backBanner/" + backBanner.id);
      uploadBytes(storageRef, backBanner.bannerImg).then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
          (result) => {
            updateDb(refDb(db, "banners/backBanner/"), {
              imgSRC: result,
            });
          }
        );
      });
    },
    removeNewsBannerCard(state, deleteObj) {
      if (deleteObj.length !== 0) {
        deleteObj.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(storage, `banners/newsBanner/${el.id}`);
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    async fetchUpCards(ctx) {
      const dbRef = refDb(db);
      let mainBanner = [];
      await getDb(childDb(dbRef, `banners/upCards/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            mainBanner = snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      ctx.commit("updateMainBanner", mainBanner);
    },
    async fetchSpeedUp(ctx) {
      const speedRef = refDb(db, "banners/upCards/speed");
      const statusRef = refDb(db, "banners/upCards/status");
      await onValueDb(speedRef, (snapshot) => {
        if (+snapshot.val() !== 0) {
          let speedUp = +snapshot.val();
          ctx.commit("updateSpeedMainBanner", speedUp);
        }
      });
      await onValueDb(statusRef, (snapshot) => {
        let statusMain = snapshot.val();
        ctx.commit("updateStatusMainBanner", statusMain);
      });
    },
    async fetchDownCards(ctx) {
      const dbRef = refDb(db);
      let newsBanner = [];
      await getDb(childDb(dbRef, `banners/downCards/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            newsBanner = snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      ctx.commit("updateNewsBanner", newsBanner);

    },
    async fetchBackBanner(ctx) {
      const dbRef = refDb(db);
      let backBanner = [];
      await getDb(childDb(dbRef, `banners/backBanner/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            backBanner = snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      ctx.commit("updateBackBanner", backBanner);

    },
    async fetchSpeedDown(ctx) {
      const speedRef = refDb(db, "banners/downCards/speed");
      const statusRef = refDb(db, "banners/downCards/status");

      await onValueDb(speedRef, (snapshot) => {
        if (+snapshot.val() !== 0) {
          let speedDown = +snapshot.val();
          ctx.commit("updateSpeedNewsBanner", speedDown);
        }
      });
      await onValueDb(statusRef, (snapshot) => {
        let statusMain = snapshot.val();
        ctx.commit("updateStatusNewsBanner", statusMain);
      });

    },
  },
  mutations: {
    addBannerCardUp(state, newCard) {
      state.upCards.push(newCard);
    },
    addBannerCardDown(state, newCard) {
      state.downCards.push(newCard);
    },
    updateMainBanner(state, mainBanner) {
      for (let key in mainBanner) {
        state.upCards[key] = mainBanner[key];
      }
    },
    updateNewsBanner(state, newsBanner) {
      for (let key in newsBanner) {
        state.downCards[key] = newsBanner[key];
      }
    },
    updateBackBanner(state, backBanner) {
      state.backBanner = backBanner;
    },
    updateSpeedMainBanner(state, speed) {
      state.speedUp = speed;
    },
    updateStatusNewsBanner(state, status) {
      state.statusNews = status;
    },
    updateStatusMainBanner(state, status) {
      state.statusMain = status;
    },
    updateSpeedNewsBanner(state, speed) {
      state.speedDown = speed;
    },
    error(state, error) {
      console.log(error);
    },
  },
  getters: {
    allUpCards(state) {
      return state.upCards;
    },
    backBanner(state) {
      return state.backBanner;
    },
    speedUp(state) {
      return state.speedUp;
    },
    speedDown(state) {
      return state.speedDown;
    },
    statusNews(state) {
      return state.statusNews
    },
    statusMain(state) {
      return state.statusMain
    },
    allDownCards(state) {
      return state.downCards;
    },
  },
};
