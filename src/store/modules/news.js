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
    allNews: [],
  },
  actions: {
    async sendNews({ commit }, news) {
      const index = this.state.news.allNews.findIndex((el) => news.id === el.id);
      try {
        setDb(refDb(db, "news/" + index), {
          ...news,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      if (news.mainImg) {
        const storageRef = ref(storage, `news/${news.id}/ru/` + news.id);
        uploadBytes(storageRef, news.mainImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "news/" + index), { imgSRC: result });
            }
          );
        });
      }
      if (news.mainImgUa) {
        const storageRef = ref(storage, `news/${news.id}/ua/` + news.id);
        uploadBytes(storageRef, news.mainImgUa).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "news/" + index), { imgSRCUa: result });
            }
          );
        });
      }
      if (news.gallery) {
        news.gallery.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `news/${news.id}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `news/${index}/gallery/` + i), {
                    id: el.id,
                    imgSRC: result,
                  });
                }
              );
            });
          }
        });
      }
      if (news.galleryUa) {
        news.galleryUa.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `news/${news.id}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `news/${index}/galleryUa/` + i), {
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
    async fetchNews(news) {
      const dbRef = refDb(db);
      await getDb(childDb(dbRef, `news/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.val().forEach((element, index) => {
              news.getters.allNews[index] = element;
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
    async removeNewsImgGallery(state, deleteObj) {
      if (deleteObj.gallery.length !== 0) {
        deleteObj.gallery.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(storage, `news/${deleteObj.id}/gallery/${el.id}`);
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    async removeNews({ commit }, data) {
      try {
        setDb(refDb(db, "news/"), {
          ...data.newss,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const desertRef = ref(storage, `news/${data.news.id}/${data.news.id}`);
      if (data.news.gallery !== undefined) {
        data.news.gallery.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `news/${data.news.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.news.galleryUa !== undefined) {
        data.news.galleryUa.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `news/${data.news.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.news.imgSRC) {
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
      if (data.news.imgSRCUa) {
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    },
  },
  getters: {
    allNews(state) {
      return state.allNews;
    },
    oneNews: (state) => (id) => {
      return state.allNews.filter((news) => news.id === id);
    },
  },
};
