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
  },
  actions: {
    pushMainBannerCard({ commit }, upCards) {
      try {
        setDb(refDb(db, "banners/upCards"), {
          ...upCards.banner,
          speed: upCards.speed,
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
    pushNewsBannerCard({ commit }, downCards) {
      try {
        setDb(refDb(db, "banners/downCards"), {
          ...downCards.banner,
          speed: downCards.speed,
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
      await onValueDb(speedRef, (snapshot) => {
        if (+snapshot.val() !== 0) {
          let speedUp = +snapshot.val();
          ctx.commit("updateSpeedMainBanner", speedUp);
        }
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
    async fetchSpeedDown(ctx) {
      const speedRef = refDb(db, "banners/downCards/speed");
      await onValueDb(speedRef, (snapshot) => {
        if (+snapshot.val() !== 0) {
          let speedDown = +snapshot.val();
          ctx.commit("updateSpeedNewsBanner", speedDown);
        }
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
    updateSpeedMainBanner(state, speed) {
      state.speedUp = speed;
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
    speedUp(state) {
      return state.speedUp;
    },
    speedDown(state) {
      return state.speedDown;
    },
    allDownCards(state) {
      return state.downCards;
    },
  },
};
