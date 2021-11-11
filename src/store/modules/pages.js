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
    allPages: [],
  },
  actions: {
    sendMainPages({ commit }, page) {
      const index = this.state.pages.allPages.findIndex((el) => page.id === el.id);
      try {
        setDb(refDb(db, "pages/" + index), {
          ...page,
        });
      } catch (e) {
        commit("error", e);
      }
      
    },
    async sendContactPage({ commit }, page) {
      console.log('page: ', page);
      const index = this.state.pages.allPages.findIndex((el) => page.id === el.id);
      try {
        await setDb(refDb(db, "pages/" + index), {
          ...page,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      page.cinema.forEach((el, i) => {
        const storageRefGallery = ref(storage, `pages/${page.id}/` + el.id);
        if (el.img) {
          uploadBytes(storageRefGallery, el.img).then((snapshot) => {
            getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
              (result) => {
                updateDb(refDb(db, `pages/${index}/cinema/` + i), {
                  imgSRC: result,
                });
              }
            );
          });
        }
      });
    },
    sendPage({ commit }, page) {
      const index = this.state.pages.allPages.findIndex((el) => page.id === el.id);
      try {
        setDb(refDb(db, "pages/" + index), {
          ...page,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const storageRef = ref(storage, `pages/${page.id}/` + page.id);
      if (page.mainImg) {
        uploadBytes(storageRef, page.mainImg).then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (result) => {
              updateDb(refDb(db, "pages/" + index), { imgSRC: result });
            }
          );
        });
      }
      if (page.gallery) {
        page.gallery.forEach((el, i) => {
          const storageRefGallery = ref(
            storage,
            `pages/${el.pageId}/gallery/` + el.id
          );
          if (el.file) {
            uploadBytes(storageRefGallery, el.file).then((snapshot) => {
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (result) => {
                  updateDb(refDb(db, `pages/${index}/gallery/` + i), {
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
    async fetchPages(page) {
      const dbRef = refDb(db);
      await getDb(childDb(dbRef, `pages/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.val().forEach((element, index) => {
              page.getters.allPages[index] = element;
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
    async removePageImgGallery(state, deleteObj) {
      if (deleteObj.length !== 0) {
        deleteObj.forEach((el) => {
          const storage = getStorage();
          const desertRef = ref(storage, `pages/${el.pageId}/gallery/${el.id}`);
          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
    },
    async removePage({ commit }, data) {
      try {
        setDb(refDb(db, "pages/"), {
          ...data.pages,
        });
      } catch (e) {
        commit("error", e);
      }
      const storage = getStorage();
      const desertRef = ref(storage, `pages/${data.page.id}/${data.page.id}`);
      if (data.page.gallery !== undefined) {
        data.page.gallery.forEach((el) => {
          const storage = getStorage();
          const galleryRef = ref(
            storage,
            `pages/${data.page.id}/gallery/${el.id}`
          );
          deleteObject(galleryRef)
            .then(() => {})
            .catch((error) => {
              console.log("error: ", error);
            });
        });
      }
      if (data.page.imgSRC) {
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    },
  },
  getters: {
    allPages(state) {
      return state.allPages;
    },
    onePage: (state) => (id) => {
      return state.allPages.filter((page) => page.id === id);
    },
  },
};
