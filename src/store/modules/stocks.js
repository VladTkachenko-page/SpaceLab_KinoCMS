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
    allStocks: [],
  },
  actions: {
    async sendStock({ commit }, stock) {
      const index = this.state.stocks.allStocks.findIndex(
        (el) => stock.id === el.id
      );
      try {
        setDb(refDb(db, "stocks/" + index), {
          ...stock,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      if (stock.mainImg) {
        const storageRef = ref(storage, `stocks/${stock.id}/ru/` + stock.id);
        uploadBytes(storageRef, stock.mainImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "stocks/" + index), { imgSRC: result });
            }
          );
        });
      }
      if (stock.mainImgUa) {
        const storageRef = ref(storage, `stocks/${stock.id}/ua/` + stock.id);
        uploadBytes(storageRef, stock.mainImgUa).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "stocks/" + index), { imgSRCUa: result });
            }
          );
        });
      }
      if (stock.gallery) {
        stock.gallery.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `stocks/${stock.id}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `stocks/${index}/gallery/` + i), {
                    id: el.id,
                    imgSRC: result,
                  });
                }
              );
            });
          }
        });
      }
      if (stock.galleryUa) {
        stock.galleryUa.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `stocks/${stock.id}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `stocks/${index}/galleryUa/` + i), {
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
    async fetchStocks(stock) {
      const dbRef = refDb(db);
      await getDb(childDb(dbRef, `stocks/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.val().forEach((element, index) => {
              stock.getters.allStocks[index] = element;
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
    error(state, error) {
      console.log(error);
    },
    async removeStockImgGallery(state, deleteObj) {
      if (deleteObj.gallery.length !== 0) {
        deleteObj.gallery.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(
            storage,
            `stocks/${deleteObj.id}/gallery/${el.id}`
          );
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    async removeStock({ commit }, data) {
      try {
        setDb(refDb(db, "stocks/"), {
          ...data.stocks,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const desertRef = ref(
        storage,
        `stocks/${data.stock.id}/${data.stock.id}`
      );
      if (data.stock.gallery !== undefined) {
        data.stock.gallery.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `stocks/${data.stock.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.stock.galleryUa !== undefined) {
        data.stock.galleryUa.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `stocks/${data.stock.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.stock.imgSRC) {
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      if (data.stock.imgSRCUa) {
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    },
  },
  getters: {
    allStocks(state) {
      return state.allStocks;
    },
    oneStock: (state) => (id) => {
      return state.allStocks.filter((stock) => stock.id === id);
    },
  },
};
