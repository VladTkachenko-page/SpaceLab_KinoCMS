<template>
  <Loader v-if="loading" />
  <div v-else>
    <LangEdit :linkRu="'cinemaEditRu'" :linkUa="'cinemaEditUa'" />
    <form id="cinemaEdit" action="">
      <setName
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objName="this.cinema.name"
        :name="'Название кинотеатра'"
        @push-data="pushName"
      />
      <setName
        v-else
        :objName="this.cinema.nameUa"
        :name="'Назва кінотеатру'"
        :key="1"
        @push-data="pushNameUa"
      />
      <setDescription
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objDescription="this.cinema.description"
        :description="'Описание'"
        @push-data="pushDescription"
      />
      <setDescription
        v-else
        :objDescription="this.cinema.descriptionUa"
        :key="2"
        :description="'Опис'"
        @push-data="pushDescriptionUa"
      />
      <setDescription
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objDescription="this.cinema.circs"
        :description="'Условия'"
        @push-data="pushCircs"
      />
      <setDescription
        v-else
        :objDescription="this.cinema.circsUa"
        :key="3"
        :description="'Умови'"
        @push-data="pushCircsUa"
      />
      <setMainImg
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objMainImgText="'Логотип'"
        :objMainImg="this.cinema.imgLogoSRC"
        :id="'logo'"
        @remove-main-obj-img="removeCinemaLogoImg"
        @push-main-obj-img="pushCinemaLogoImg"
      />
      <setMainImg
        v-else
        :key="5"
        :objMainImgText="'Логотип'"
        :objMainImg="this.cinema.imgLogoSRCUa"
        :id="'logo'"
        @remove-main-obj-img="removeCinemaLogoImgUa"
        @push-main-obj-img="pushCinemaLogoImgUa"
      />
      <setMainImg
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objMainImgText="'Фото верхнего баннера'"
        :objMainImg="this.cinema.imgBannerSRC"
        :id="'banner'"
        @remove-main-obj-img="removeCinemaBannerImg"
        @push-main-obj-img="pushCinemaBannerImg"
      />
      <setMainImg
        v-else
        :key="6"
        :objMainImgText="'Фото верхнього банера'"
        :objMainImg="this.cinema.imgBannerSRCUa"
        :id="'banner'"
        @remove-main-obj-img="removeCinemaBannerImgUa"
        @push-main-obj-img="pushCinemaBannerImgUa"
      />
      <setImgGallery
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objId="+this.$attrs.id"
        :objImgGallery="this.cinema.gallery"
        @push-img-gallery="pushGalleryCinemaImg"
        @remove-img-gallery="removeGalleryImg"
        @add-img-gallery="addImgCinemaGallery"
      />
      <setImgGallery
        v-else
        :key="7"
        :objId="+this.$attrs.id"
        :objImgGallery="this.cinema.galleryUa"
        @push-img-gallery="pushGalleryCinemaImgUa"
        @remove-img-gallery="removeGalleryImgUa"
        @add-img-gallery="addImgCinemaGalleryUa"
      />
      <div class="card-body table-responsive">
        <table class="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Название</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            <hallTable
              v-for="hall in this.cinema.halls"
              :key="hall.id"
              :hall="hall"
              :cinema="cinema"
              :lang="$attrs.lang"
              @showModal="showModalDelete"
            />
          </tbody>
        </table>
      </div>
      <div class="add-buttons">
        <router-link
          tag="button"
          :to="{
            name: 'hallEditRu',
            params: {
              id: +this.$attrs.id,
              idHall: new Date().getTime(),
              cinema: this.cinema,
              lang: 'ru',
            },
          }"
          class="btn-success"
        >
          Добавить зал
        </router-link>
      </div>
      <setSEO
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        @push-data="pushSEO"
        :objSEOURL="this.cinema.seo.seoURL"
        :objSEOTitle="this.cinema.seo.seoTitle"
        :objSEOWords="this.cinema.seo.seoWords"
        :objSEODescription="this.cinema.seo.seoDescription"
      />
      <setSEO
        v-else
        :key="4"
        @push-data="pushSEOUa"
        :objSEOURL="this.cinema.seoUa.seoURL"
        :objSEOTitle="this.cinema.seoUa.seoTitle"
        :objSEOWords="this.cinema.seoUa.seoWords"
        :objSEODescription="this.cinema.seoUa.seoDescription"
      />
      <div class="edit-buttons">
        <button
          type="submit"
          form="cinemaEdit"
          class="btn-success banner-up__btn"
          @click.prevent="sendCinemaData"
          :disabled="disabled"
        >
          Сохранить
        </button>
        <router-link
          tag="button"
          class="btn-primary"
          :to="{
            name: 'cinemas',
          }"
        >
          Вернуться
        </router-link>
      </div>
    </form>
    <modal
      :obj="this.hallDelete"
      v-if="showModal"
      @close="showModal = false"
      @delete="deleteHall"
    >
      <h3 slot="header">Удаление {{ this.hallDelete.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить зал {{ this.hallDelete.name }}?
      </p>
    </modal>
    <Toast :sending="this.sending" :text="'Кинотеатр успешно сохранен'"></Toast>
    <Toast :sending="this.deleting" :text="'Зал успешно удален'"></Toast>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import LangEdit from "@/components/app/langEdit.vue";
import Toast from "@/components/app/toast.vue";
import modal from "@/components/app/modal.vue";
import setName from "@/components/edit/setName.vue";
import setDescription from "@/components/edit/setDescription.vue";
import setMainImg from "@/components/edit/setMainImg.vue";
import setImgGallery from "@/components/edit/setImgGallery.vue";
import setSEO from "@/components/edit/setSEO.vue";
import hallTable from "@/components/cinemas/hallTable.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showModal: false,
      sending: false,
      deleting: false,
      disabled: true,
      cinema: {},
      galleryDelete: [],
      hallDelete: {},
    };
  },
  components: {
    Loader,
    LangEdit,
    setName,
    setDescription,
    setMainImg,
    setImgGallery,
    setSEO,
    hallTable,
    Toast,
    modal,
  },
  methods: {
    ...mapMutations([
      "removeMainCinemaImg",
      "pushCinemaMainImg",
      "pushCinemaGalleryImg",
      "removeCinemaImgGallery",
      "removeHall",
      "removeHallImgGallery"
    ]),
    showModalDelete(hall) {
      this.showModal = true;
      this.hallDelete = hall;
    },
    pushName(name) {
      this.cinema.name = name;
      this.disabled = false;
    },
    pushNameUa(name) {
      this.cinema.nameUa = name;
      this.disabled = false;
    },
    pushDescription(description) {
      this.cinema.description = description;
      this.disabled = false;
    },
    pushCircs(circs) {
      this.cinema.circs = circs;
      this.disabled = false;
    },
    pushSEO(seo) {
      this.cinema.seo = seo;
      this.disabled = false;
    },
    pushDescriptionUa(description) {
      this.cinema.descriptionUa = description;
      this.disabled = false;
    },
    pushCircsUa(circs) {
      this.cinema.circsUa = circs;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.cinema.seoUa = seo;
      this.disabled = false;
    },
    addImgCinemaGallery(img) {
      this.cinema.gallery = img;
      this.disabled = false;
    },
    addImgCinemaGalleryUa(img) {
      this.cinema.galleryUa = img;
      this.disabled = false;
    },
    async sendCinemaData() {
      try {
        if (
          this.allCinemas.findIndex((el) => el.id === this.cinema.id) === -1
        ) {
          this.allCinemas.push(this.cinema);
        }
        await this.$store.dispatch("sendCinema", this.cinema);
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
          this.$router.push("/cinemasAdd");
        }, 1000);
        this.disabled = true;
      } catch (e) {
        console.log(e);
      }
      if (this.galleryDelete.length !== 0) {
        this.removeCinemaImgGallery({
          gallery: this.galleryDelete,
          id: this.cinema.id,
        });
        this.galleryDelete = [];
      }
      if (this.$attrs.delete && this.$attrs.delete.length !== 0) {
        this.removeHallImgGallery({
          gallery: this.$attrs.delete,
          id: this.cinema.id,
        });
      }
    },
    removeCinemaLogoImg() {
      this.cinema.imgLogoSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    removeCinemaBannerImg() {
      this.cinema.imgBannerSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    removeCinemaLogoImgUa() {
      this.cinema.imgLogoSRCUa =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    removeCinemaBannerImgUa() {
      this.cinema.imgBannerSRCUa =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    pushCinemaLogoImg(img) {
      this.cinema.logoImg = img;
      this.cinema.imgLogoSRC = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushCinemaBannerImg(img) {
      this.cinema.bannerImg = img;
      this.cinema.imgBannerSRC = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushCinemaLogoImgUa(img) {
      this.cinema.logoImgUa = img;
      this.cinema.imgLogoSRCUa = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushCinemaBannerImgUa(img) {
      this.cinema.bannerImgUa = img;
      this.cinema.imgBannerSRCUa = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushGalleryCinemaImg(imgCinemaData) {
      if (this.cinema.gallery.length === 0) {
        this.cinema.gallery.push({
          file: imgCinemaData.file,
          id: imgCinemaData.id,
          imgSRC: imgCinemaData.imgSRC,
        });
      } else {
        this.cinema.gallery.splice(imgCinemaData.index, 1, {
          file: imgCinemaData.file,
          id: imgCinemaData.id,
          cinemaId: imgCinemaData.objId,
          imgSRC: imgCinemaData.imgSRC,
        });
      }
      this.disabled = false;
    },
    pushGalleryCinemaImgUa(imgCinemaData) {
      if (this.cinema.galleryUa.length === 0) {
        this.cinema.galleryUa.push({
          file: imgCinemaData.file,
          id: imgCinemaData.id,
          imgSRC: imgCinemaData.imgSRC,
        });
      } else {
        this.cinema.galleryUa.splice(imgCinemaData.index, 1, {
          file: imgCinemaData.file,
          id: imgCinemaData.id,
          cinemaId: imgCinemaData.objId,
          imgSRC: imgCinemaData.imgSRC,
        });
      }
      this.disabled = false;
    },
    removeGalleryImg(id) {
      const index = this.cinema.gallery.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.cinema.gallery.filter((el) => el.id === id.imgId)[0]
      );
      this.cinema.gallery.splice(index, 1);
      this.disabled = false;
    },
    removeGalleryImgUa(id) {
      const index = this.cinema.galleryUa.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.cinema.galleryUa.filter((el) => el.id === id.imgId)[0]
      );
      this.cinema.galleryUa.splice(index, 1);
      this.disabled = false;
    },
    async deleteHall(hall) {
      delete this.cinema.halls[hall.id];
      await this.removeHall(hall);
      this.showModal = false;
      this.deleting = true;
      setTimeout(() => {
        this.deleting = false;
      }, 4000);
    },
  },
  computed: mapGetters(["allCinemas"]),
  async mounted() {
    await this.$store.dispatch("fetchCinemas", this.allCinemas);
    this.cinema = await this.$store.getters.oneCinema(+this.$attrs.id)[0];
    if (!this.cinema) {
      this.cinema = { id: +this.$attrs.id };
    }
    if (!this.cinema.seo) {
      this.cinema.seo = {};
    }
    if (!this.cinema.seoUa) {
      this.cinema.seoUa = {};
    }
    if (this.$attrs.allHalls) {
      this.cinema.halls = this.$attrs.allHalls;
    }
    if (this.$attrs.cinema) {
      this.cinema = await this.$attrs.cinema;
    }
    if (this.$attrs.hall) {
      this.cinema.halls[this.$attrs.hall.id] = this.$attrs.hall;
    }
    if (this.$attrs.disabled === false) {
      this.disabled = false;
    }
    if (!this.cinema.halls) {
      this.cinema.halls = {};
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
.edit-buttons,
.add-buttons {
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
