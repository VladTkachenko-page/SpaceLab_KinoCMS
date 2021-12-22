<template>
  <Loader v-if="loading" />
  <div v-else>
    <LangEdit :linkRu="'filmsEditRu'" :linkUa="'filmsEditUa'" />
    <form id="filmEdit" action="">
      <setName
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objName="this.film.name"
        :name="'Название фильма'"
        @push-data="pushName"
      />
      <setName
        v-else
        :objName="this.film.nameUa"
        :name="'Назва фільму'"
        :key="1"
        @push-data="pushNameUa"
      />
      <setDescription
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objDescription="this.film.description"
        :description="'Описание'"
        @push-data="pushDescription"
      />
      <setDescription
        v-else
        :objDescription="this.film.descriptionUa"
        :description="'Опис'"
        :key="2"
        @push-data="pushDescriptionUa"
      />
      <setMainImg
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objMainImgText="'Главная картинка'"
        :objMainImg="this.film.imgSRC"
        :id="'mainImg'"
        @remove-main-obj-img="removeFilmImg"
        @push-main-obj-img="pushFilmImg"
      />
      <setMainImg
        v-else
        :objMainImgText="'Головна картинка'"
        :objMainImg="this.film.imgSRCUa"
        :key="3"
        :id="'mainImgUa'"
        @remove-main-obj-img="removeFilmImgUa"
        @push-main-obj-img="pushFilmImgUa"
      />
      <setImgGallery
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objId="+this.$attrs.id"
        :objImgGallery="this.film.gallery"
        @push-img-gallery="pushGalleryFilmImg"
        @remove-img-gallery="removeGalleryImg"
        @add-img-gallery="addImgFilmGallery"
      />
      <setImgGallery
        v-else
        :key="6"
        :objId="+this.$attrs.id"
        :objImgGallery="this.film.galleryUa"
        @push-img-gallery="pushGalleryFilmImgUa"
        @remove-img-gallery="removeGalleryImgUa"
        @add-img-gallery="addImgFilmGalleryUa"
      />
      <setVideo
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :nameUrl="'Ссылка на трейлер'"
        :objVideo="this.film.videoURL"
        @push-data="pushVideo"
      />
      <setVideo
        v-else
        :nameUrl="'Посилання на трейлер'"
        :objVideo="this.film.videoURLUa"
        :key="4"
        @push-data="pushVideoUa"
      />
      <div class="film-type">
        <strong>Тип кино</strong>
        <div class="film-type__checkbox custom-control custom-checkbox">
          <input
            class="custom-control-input"
            type="checkbox"
            v-model="checkedType"
            id="3d"
            value="3d"
            @change="pushChecked"
          />
          <label for="3d" class="custom-control-label">3D</label>
        </div>
        <div class="film-type__checkbox custom-control custom-checkbox">
          <input
            class="custom-control-input"
            type="checkbox"
            v-model="checkedType"
            id="2d"
            value="2d"
            @change="pushChecked"
          />
          <label for="2d" class="custom-control-label">2D</label>
        </div>
        <div class="film-type__checkbox custom-control custom-checkbox">
          <input
            class="custom-control-input"
            type="checkbox"
            v-model="checkedType"
            id="IMAX"
            value="IMAX"
            @change="pushChecked"
          />
          <label for="IMAX" class="custom-control-label">IMAX</label>
        </div>
      </div>
      <setSEO
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objSEOURL="this.film.seo.seoURL"
        :objSEOTitle="this.film.seo.seoTitle"
        :objSEOWords="this.film.seo.seoWords"
        :objSEODescription="this.film.seo.seoDescription"
        @push-data="pushSEO"
      />
      <setSEO
        v-else
        :objSEOURL="this.film.seoUa.seoURL"
        :objSEOTitle="this.film.seoUa.seoTitle"
        :objSEOWords="this.film.seoUa.seoWords"
        :objSEODescription="this.film.seoUa.seoDescription"
        :key="5"
        @push-data="pushSEOUa"
      />
      <div class="edit-buttons">
        <button
          type="submit"
          form="filmEdit"
          class="btn-success banner-up__btn"
          @click.prevent="sendFilmData"
          :disabled="this.disabled"
        >
          Сохранить
        </button>
        <button
          type="submit"
          form="filmEdit"
          class="btn-secondary banner-up__btn"
          @click.prevent="returnFilmData"
        >
          Вернуть базовую версию
        </button>
        <router-link
          tag="button"
          class="btn-primary"
          :to="{
            name: 'films',
          }"
        >
          Вернуться
        </router-link>
      </div>
    </form>
    <Toast :sending="this.sending" :text="'Фильм успешно сохранен'"></Toast>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import LangEdit from "@/components/app/langEdit.vue";
import Toast from "@/components/app/toast.vue";
import setName from "@/components/edit/setName.vue";
import setDescription from "@/components/edit/setDescription.vue";
import setMainImg from "@/components/edit/setMainImg.vue";
import setImgGallery from "@/components/edit/setImgGallery.vue";
import setVideo from "@/components/edit/setVideo.vue";
import setSEO from "@/components/edit/setSEO.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    console.log();
    return {
      loading: true,
      sending: false,
      disabled: true,
      film: {},
      filmCopy: {},
      galleryDelete: [],
      checkedType: [],
    };
  },
  components: {
    Loader,
    LangEdit,
    Toast,
    setName,
    setDescription,
    setMainImg,
    setImgGallery,
    setVideo,
    setSEO,
  },
  methods: {
    ...mapMutations([
      "pushFilmMainImg",
      "pushFilmGalleryImg",
      "removeFilmImgGallery",
    ]),
    pushName(name) {
      this.film.name = name;
      this.disabled = false;
    },
    pushNameUa(name) {
      this.film.nameUa = name;
      this.disabled = false;
    },
    pushDescription(description) {
      this.film.description = description;
      this.disabled = false;
    },
    pushDescriptionUa(description) {
      this.film.descriptionUa = description;
      this.disabled = false;
    },
    pushVideo(url) {
      this.film.videoURL = url;
      this.disabled = false;
    },
    pushVideoUa(url) {
      this.film.videoURLUa = url;
      this.disabled = false;
    },
    pushChecked() {
      this.film.typeFilm = this.checkedType;
      this.disabled = false;
    },
    pushSEO(seo) {
      this.film.seo = seo;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.film.seoUa = seo;
      this.disabled = false;
    },
    addImgFilmGallery(img) {
      this.film.gallery = img;
      this.disabled = false;
    },
    addImgFilmGalleryUa(img) {
      this.film.galleryUa = img;
      this.disabled = false;
    },
    async sendFilmData() {
      if (this.film.comming) {
        try {
          if (
            this.allFilmsComming.findIndex((el) => el.id === this.film.id) ===
            -1
          ) {
            this.allFilmsComming.push(this.film);
          }
          await this.$store.dispatch("sendFilmComming", this.film);
          this.sending = true;
          setTimeout(() => {
            this.sending = false;
            this.$router.push("/films");
          }, 1000);
          this.disabled = true;
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          if (this.allFilms.findIndex((el) => el.id === this.film.id) === -1) {
            this.allFilms.push(this.film);
          }
          await this.$store.dispatch("sendFilm", this.film);
          this.sending = true;
          setTimeout(() => {
            this.sending = false;
            this.$router.push("/films");
          }, 1000);
        } catch (e) {
          console.log(e);
        }
      }
      if (this.galleryDelete.length !== 0) {
        this.removeFilmImgGallery({
          gallery: this.galleryDelete,
          id: this.film.id,
        });
        this.galleryDelete = [];
      }
    },
    removeFilmImg() {
      this.film.imgSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    removeFilmImgUa() {
      this.film.imgSRCUa =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    pushFilmImg(img) {
      this.film.mainImg = img;
      this.film.imgSRC = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushFilmImgUa(img) {
      this.film.mainImgUa = img;
      this.film.imgSRCUa = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushGalleryFilmImg(imgFilmData) {
      if (this.film.gallery.length === 0) {
        this.film.gallery.push({
          file: imgFilmData.file,
          id: imgFilmData.id,
          imgSRC: URL.createObjectURL(imgFilmData.file),
        });
      } else {
        this.film.gallery.splice(imgFilmData.index, 1, {
          file: imgFilmData.file,
          id: imgFilmData.id,
          filmId: imgFilmData.objId,
          imgSRC: URL.createObjectURL(imgFilmData.file),
        });
      }
      this.disabled = false;
    },
    pushGalleryFilmImgUa(imgFilmData) {
      if (this.film.galleryUa.length === 0) {
        this.film.galleryUa.push({
          file: imgFilmData.file,
          id: imgFilmData.id,
          imgSRC: URL.createObjectURL(imgFilmData.file),
        });
      } else {
        this.film.galleryUa.splice(imgFilmData.index, 1, {
          file: imgFilmData.file,
          id: imgFilmData.id,
          filmId: imgFilmData.objId,
          imgSRC: URL.createObjectURL(imgFilmData.file),
        });
      }
      this.disabled = false;
    },
    removeGalleryImg(id) {
      const index = this.film.gallery.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.film.gallery.filter((el) => el.id === id.imgId)[0]
      );
      this.film.gallery.splice(index, 1);
      this.disabled = false;
    },
    removeGalleryImgUa(id) {
      const index = this.film.galleryUa.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.film.galleryUa.filter((el) => el.id === id.imgId)[0]
      );
      this.film.galleryUa.splice(index, 1);
      this.disabled = false;
    },
    async returnFilmData() {
      this.loading = true;
      this.film = JSON.parse(JSON.stringify(this.filmCopy));
      await this.$forceUpdate();
      this.checkedType = this.film.typeFilm;
      this.galleryDelete = [];
      this.loading = false;
      this.disabled = false;
    },
  },
  computed: mapGetters(["allFilms", "allFilmsComming"]),

  async mounted() {
    await this.$store.dispatch("fetchFilms", this.allFilms);
    await this.$store.dispatch("fetchFilmsComming", this.allFilmsComming);

    if (this.$attrs.comming) {
      const oneFilmComming = await this.$store.getters.oneFilmComming(
        +this.$attrs.id
      )[0];
      this.film = oneFilmComming;
      if (!this.film) {
        this.film = { id: +this.$attrs.id, comming: true };
      }
      if (oneFilmComming) {
        this.filmCopy = JSON.parse(JSON.stringify(oneFilmComming));
      }
    } else {
      const oneFilm = await this.$store.getters.oneFilm(+this.$attrs.id)[0];
      this.film = oneFilm;
      if (!this.film) {
        this.film = { id: +this.$attrs.id, comming: false };
      }
      if (oneFilm) {
        this.filmCopy = JSON.parse(JSON.stringify(oneFilm));
      }
    }

    if (this.film.typeFilm) {
      this.checkedType = this.film.typeFilm;
    }
    if (!this.film.seo) {
      this.film.seo = {};
    }
    if (!this.film.seoUa) {
      this.film.seoUa = {};
    }
    if (!this.filmCopy.seo) {
      this.filmCopy.seo = {};
    }
    if (!this.filmCopy.typeFilm) {
      this.filmCopy.typeFilm = this.checkedType;
    }
    this.loading = false;
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.film-type {
  display: flex;
  margin-top: 30px;
}
.film-type__checkbox {
  margin: 0 20px;
}
.edit-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
}
.edit-buttons button {
  margin-right: 50px;
}
</style>
