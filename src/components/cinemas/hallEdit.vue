<template>
  <Loader v-if="loading" />
  <div v-else>
    <LangEdit :linkRu="'hallEditRu'" :linkUa="'hallEditUa'" />
    <form id="hallEdit" action="">
      <setName
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objName="this.hall.name"
        :name="'Номер зала'"
        @push-data="pushName"
      />
      <setName
        v-else
        :key="1"
        :objName="this.hall.nameUa"
        :name="'Номер залу'"
        @push-data="pushNameUa"
      />
      <setDescription
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objDescription="this.hall.description"
        :description="'Описание зала'"
        @push-data="pushDescription"
      />
      <setDescription
        v-else
        :key="2"
        :objDescription="this.hall.descriptionUa"
        :description="'Опис залу'"
        @push-data="pushDescriptionUa"
      />
      <setMainImg
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objMainImgText="'Схема зала'"
        :objMainImg="this.hall.imgSchemeSRC"
        :id="'scheme'"
        @remove-main-obj-img="removeHallSchemeImg"
        @push-main-obj-img="pushHallSchemeImg"
      />
      <setMainImg
        v-else
        :key="4"
        :objMainImgText="'Схема зала'"
        :objMainImg="this.hall.imgSchemeSRCUa"
        :id="'scheme'"
        @remove-main-obj-img="removeHallSchemeImgUa"
        @push-main-obj-img="pushHallSchemeImgUa"
      />
      <setMainImg
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objMainImgText="'Верхний баннер'"
        :objMainImg="this.hall.imgBannerSRC"
        :id="'banner'"
        @remove-main-obj-img="removeHallBannerImg"
        @push-main-obj-img="pushHallBannerImg"
      />
      <setMainImg
        v-else
        :key="5"
        :objMainImgText="'Верхний баннер'"
        :objMainImg="this.hall.imgBannerSRCUa"
        :id="'banner'"
        @remove-main-obj-img="removeHallBannerImgUa"
        @push-main-obj-img="pushHallBannerImgUa"
      />
      <setImgGallery
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objId="+this.$attrs.id"
        :objImgGallery="this.hall.gallery"
        @push-img-gallery="pushGalleryHallImg"
        @remove-img-gallery="removeGalleryImg"
        @add-img-gallery="addImgHallGallery"
      />
      <setImgGallery
        v-else
        :key="6"
        :objId="+this.$attrs.id"
        :objImgGallery="this.hall.galleryUa"
        @push-img-gallery="pushGalleryHallImgUa"
        @remove-img-gallery="removeGalleryImgUa"
        @add-img-gallery="addImgHallGalleryUa"
      />
      <setSEO
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        @push-data="pushSEO"
        :objSEOURL="this.hall.seo.seoURL"
        :objSEOTitle="this.hall.seo.seoTitle"
        :objSEOWords="this.hall.seo.seoWords"
        :objSEODescription="this.hall.seo.seoDescription"
      />
      <setSEO
        v-else
        :key="3"
        @push-data="pushSEOUa"
        :objSEOURL="this.hall.seoUa.seoURL"
        :objSEOTitle="this.hall.seoUa.seoTitle"
        :objSEOWords="this.hall.seoUa.seoWords"
        :objSEODescription="this.hall.seoUa.seoDescription"
      />
      <div class="edit-buttons">
        <router-link
          v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
          tag="button"
          class="btn-success"
          :disabled="this.disabled"
          :to="{
            name: 'cinemaEditRu',
            params: {
              id: +this.$attrs.id,
              idHall: +this.$attrs.idHall,
              hall: this.hall,
              delete: this.galleryDelete,
              cinema: this.$attrs.cinema || this.cinema,
              disabled: false,
              lang: 'ru',
            },
          }"
        >
          Сохранить
        </router-link>
        <router-link
          v-else
          tag="button"
          class="btn-success"
          :disabled="this.disabled"
          :to="{
            name: 'cinemaEditUa',
            params: {
              id: +this.$attrs.id,
              idHall: +this.$attrs.idHall,
              delete: this.galleryDelete,
              hall: this.hall,
              cinema: this.$attrs.cinema || this.cinema,
              disabled: false,
              lang: 'ua',
            },
          }"
        >
          Сохранить
        </router-link>
        <router-link
          v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
          tag="button"
          class="btn-primary"
          :to="{
            name: 'cinemaEditRu',
            params: {
              id: +this.$attrs.id,
              idHall: +this.$attrs.idHall,
              allHalls: this.hallsCopy,
              disabled: false,
              lang: 'ru',
            },
          }"
        >
          Вернуться
        </router-link>
        <router-link
          v-else
          tag="button"
          class="btn-primary"
          :to="{
            name: 'cinemaEditUa',
            params: {
              id: +this.$attrs.id,
              idHall: +this.$attrs.idHall,
              allHalls: this.hallsCopy,
              disabled: false,
              lang: 'ua',
            },
          }"
        >
          Вернуться
        </router-link>
      </div>
    </form>
    <Toast :sending="this.sending" :text="'Зал успешно сохранен'"></Toast>
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
import setSEO from "@/components/edit/setSEO.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
      disabled: true,
      sending: false,
      hall: {},
      hallsCopy: {},
      galleryDelete: [],
    };
  },
  components: {
    Loader,
    setName,
    setDescription,
    setMainImg,
    setImgGallery,
    setSEO,
    Toast,
    LangEdit,
  },
  methods: {
    ...mapMutations([
      "removeMainHallImg",
      "pushHallMainImg",
      "pushHallGalleryImg",
      "removeHallImgGallery",
    ]),
    pushName(name) {
      this.hall.name = name;
      this.disabled = false;
    },
    pushDescription(description) {
      this.hall.description = description;
      this.disabled = false;
    },
    pushSEO(seo) {
      this.hall.seo = seo;
      this.disabled = false;
    },
    pushNameUa(name) {
      this.hall.nameUa = name;
      this.disabled = false;
    },
    pushDescriptionUa(description) {
      this.hall.descriptionUa = description;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.hall.seoUa = seo;
      this.disabled = false;
    },
    addImgHallGallery(img) {
      this.hall.gallery = img;
      this.disabled = false;
    },
    addImgHallGalleryUa(img) {
      this.hall.galleryUa = img;
      this.disabled = false;
    },
    removeHallSchemeImg() {
      this.hall.imgSchemeSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    removeHallBannerImg() {
      this.hall.imgBannerSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    removeHallSchemeImgUa() {
      this.hall.imgSchemeSRCUa =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    removeHallBannerImgUa() {
      this.hall.imgBannerSRCUa =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    pushHallSchemeImg(img) {
      this.hall.schemeImg = img;
      this.hall.imgSchemeSRC = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushHallBannerImg(img) {
      this.hall.bannerImg = img;
      this.hall.imgBannerSRC = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushHallSchemeImgUa(img) {
      this.hall.schemeImgUa = img;
      this.hall.imgSchemeSRCUa = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushHallBannerImgUa(img) {
      this.hall.bannerImgUa = img;
      this.hall.imgBannerSRCUa = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushGalleryHallImg(imgHallData) {
      if (this.hall.gallery.length === 0) {
        this.hall.gallery.push({
          file: imgHallData.file,
          id: imgHallData.id,
          cinemaId: imgHallData.objId,
          hallId: +this.$attrs.idHall,
        });
      } else {
        this.hall.gallery.splice(imgHallData.index, 1, {
          file: imgHallData.file,
          id: imgHallData.id,
          cinemaId: imgHallData.objId,
          hallId: +this.$attrs.idHall,
          imgSRC: imgHallData.imgSRC,
        });
      }
      this.disabled = false;
    },
    pushGalleryHallImgUa(imgHallData) {
      if (this.hall.galleryUa.length === 0) {
        this.hall.galleryUa.push({
          file: imgHallData.file,
          id: imgHallData.id,
          cinemaId: imgHallData.objId,
          hallId: +this.$attrs.idHall,
        });
      } else {
        this.hall.galleryUa.splice(imgHallData.index, 1, {
          file: imgHallData.file,
          id: imgHallData.id,
          cinemaId: imgHallData.objId,
          hallId: +this.$attrs.idHall,
          imgSRC: imgHallData.imgSRC,
        });
      }
      this.disabled = false;
    },
    removeGalleryImg(id) {
      const index = this.hall.gallery.findIndex((el) => id.imgId === el.id);
      let del = this.hall.gallery.filter((el) => el.id === id.imgId)[0];
      del["hallId"] = this.hall.id;
      this.galleryDelete.push(del);
      this.hall.gallery.splice(index, 1);
      this.disabled = false;
    },
    removeGalleryImgUa(id) {
      const index = this.hall.galleryUa.findIndex((el) => id.imgId === el.id);
      let del = this.hall.galleryUa.filter((el) => el.id === id.imgId)[0];
      del["hallId"] = this.hall.id;
      this.galleryDelete.push(del);
      this.hall.galleryUa.splice(index, 1);
      this.disabled = false;
    },
  },
  computed: mapGetters(["allCinemas"]),
  async mounted() {
    await this.$store.dispatch("fetchCinemas", this.allCinemas);
    let oneCinema = this.$attrs.cinema;
    this.cinema = oneCinema;
    if (!this.$attrs.cinema) {
      this.cinema = this.allCinemas.filter(
        (el) => el.id === +this.$attrs.id
      )[0];
      if (!this.cinema.halls) {
        this.cinema.halls = {};
      }
      if (!this.cinema.seo) {
        this.cinema.seo = {};
      }
    }
    if (oneCinema) {
      this.hallsCopy = JSON.parse(JSON.stringify(this.cinema.halls));
    }
    this.hall = this.cinema.halls[+this.$attrs.idHall];
    if (!this.hall) {
      this.hall = {
        id: +this.$attrs.idHall,
        cinemaId: +this.$attrs.id,
        date: `${new Date().getDate()}.${
          new Date().getMonth() + 1
        }.${new Date().getFullYear()}`,
      };
    }
    if (!this.hall.seo) {
      this.hall.seo = {};
    }
    if (!this.hall.seoUa) {
      this.hall.seoUa = {};
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
