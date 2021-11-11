<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="stock-edit__header">
      <LangEdit :linkRu="'stockEditRu'" :linkUa="'stockEditUa'" />
      <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success stock__switch">
        <input type="checkbox" class="custom-control-input" id="stockCheck" v-model="status" @change="pushStatus" :checked="this.stock.status">
        <label v-if="this.stock.status" class="custom-control-label" for="stockCheck">ВКЛ</label>
        <label v-else class="custom-control-label" for="stockCheck">ВЫКЛ</label>
      </div>
    </div>
    <form id="stockEdit" action="">
      <div class="stockEdit__input-wrap">
        <setName
          v-if="this.$attrs.lang === 'ru'"
          :objName="this.stock.name"
          :name="'Название акции'"
          @push-data="pushName"
        />
        <setName
          v-else
          :key="1"
          :objName="this.stock.nameUa"
          :name="'Назва акції'"
          @push-data="pushNameUa"
        />
        <setDate
          :objDate="this.stock.datePublic"
          :nameDate="'Дата публикации'"
          @push-data="pushDate"
        />
      </div>
      <setDescription
        v-if="this.$attrs.lang === 'ru'"
        :objDescription="this.stock.description"
        :description="'Описание'"
        @push-data="pushDescription"
      />
      <setDescription
        v-else
        :key="2"
        :objDescription="this.stock.descriptionUa"
        :description="'Опис'"
        @push-data="pushDescriptionUa"
      />
      <setMainImg
        :objMainImgText="'Главная картинка'"
        :objMainImg="this.stock.imgSRC"
        :id="'mainImg'"
        @remove-main-obj-img="removeStockImg"
        @push-main-obj-img="pushStockImg"
      />
      <setImgGallery
        :objId="+this.$attrs.id"
        :objImgGallery="this.stock.gallery"
        @push-img-gallery="pushGalleryStockImg"
        @remove-img-gallery="removeGalleryImg"
        @add-img-gallery="addImgStockGallery"
      />
      <setVideo
        v-if="this.$attrs.lang === 'ru'"
        :nameUrl="'Ссылка на видео'"
        :objVideo="this.stock.videoURL"
        @push-data="pushVideo"
      />
      <setVideo
        v-else
        :key="3"
        :nameUrl="'Посилання на відео'"
        :objVideo="this.stock.videoURLUa"
        @push-data="pushVideoUa"
      />
      <setSEO
        v-if="this.$attrs.lang === 'ru'"
        @push-data="pushSEO"
        :objSEOURL="this.stock.seo.seoURL"
        :objSEOTitle="this.stock.seo.seoTitle"
        :objSEOWords="this.stock.seo.seoWords"
        :objSEODescription="this.stock.seo.seoDescription"
      />
      <setSEO
        v-else
        :key="4"
        @push-data="pushSEOUa"
        :objSEOURL="this.stock.seoUa.seoURL"
        :objSEOTitle="this.stock.seoUa.seoTitle"
        :objSEOWords="this.stock.seoUa.seoWords"
        :objSEODescription="this.stock.seoUa.seoDescription"
      />
      <div class="edit-buttons">
        <button
          type="submit"
          form="stockEdit"
          class="btn-success banner-up__btn"
          @click.prevent="sendStockData"
          :disabled="this.disabled"
        >
          Сохранить
        </button>
        <router-link
          tag="button"
          class="btn-primary"
          :to="{
            name: 'stocks',
          }"
        >
          Вернуться
        </router-link>
      </div>
    </form>
    <Toast :sending="this.sending" :text="'Акция успешно сохранена'"></Toast>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import LangEdit from "@/components/app/langEdit.vue";
import Toast from "@/components/app/toast.vue";
import setName from "@/components/edit/setName.vue";
import setDate from "@/components/edit/setDate.vue";
import setDescription from "@/components/edit/setDescription.vue";
import setMainImg from "@/components/edit/setMainImg.vue";
import setImgGallery from "@/components/edit/setImgGallery.vue";
import setVideo from "@/components/edit/setVideo.vue";
import setSEO from "@/components/edit/setSEO.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
      sending: false,
      disabled: true,
      status: this.status,
      stock: {},
      galleryDelete: [],
    };
  },
  components: {
    Loader,
    Toast,
    setName,
    setDate,
    setDescription,
    setMainImg,
    setImgGallery,
    setVideo,
    setSEO,
    LangEdit
  },
  methods: {
    ...mapMutations([
      "pushStockMainImg",
      "pushStockGalleryImg",
      "removeStockImgGallery",
    ]),
    pushStatus() {
      this.stock.status = this.status
      this.disabled = false;
    },
    pushName(name) {
      this.stock.name = name;
      this.disabled = false;
    },
    pushNameUa(name) {
      this.stock.nameUa = name;
      this.disabled = false;
    },
    pushDate(date) {
      this.stock.datePublic = date;
      this.disabled = false;
    },
    pushDescription(description) {
      this.stock.description = description;
      this.disabled = false;
    },
    pushVideo(url) {
      this.stock.videoURL = url;
      this.disabled = false;
    },
    pushSEO(seo) {
      this.stock.seo = seo;
      this.disabled = false;
    },
    pushDescriptionUa(description) {
      this.stock.descriptionUa = description;
      this.disabled = false;
    },
    pushVideoUa(url) {
      this.stock.videoURLUa = url;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.stock.seoUa = seo;
      this.disabled = false;
    },
    addImgStockGallery(img) {
      this.stock.gallery = img;
    },
    async sendStockData() {
      try {
        if (this.allStocks.findIndex((el) => el.id === this.stock.id) === -1) {
          this.allStocks.push(this.stock);
        }
        await this.$store.dispatch("sendStock", this.stock);
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
        }, 4000);
      } catch (e) {
        console.log(e);
      }
      if (this.galleryDelete.length !== 0) {
        this.removeStockImgGallery(this.galleryDelete);
        this.galleryDelete = [];
      }
    },
    removeStockImg() {
      this.stock.imgSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    pushStockImg(img) {
      this.stock.mainImg = img;
      this.disabled = false;
    },
    pushGalleryStockImg(imgStockData) {
      if (this.stock.gallery.length === 0) {
        this.stock.gallery.push({ file: imgStockData.file, id: imgStockData.id });
      } else {
        this.stock.gallery.splice(imgStockData.index, 1, {
          file: imgStockData.file,
          id: imgStockData.id,
          stockId: imgStockData.objId,
        });
      }
      this.disabled = false;
    },
    removeGalleryImg(id) {
      const index = this.stock.gallery.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.stock.gallery.filter((el) => el.id === id.imgId)[0]
      );
      this.stock.gallery.splice(index, 1);
      this.disabled = false;
    },
  },
  computed: mapGetters(["allStocks"]),
  async mounted() {
    await this.$store.dispatch("fetchStocks", this.allStocks);
    const oneStock = await this.$store.getters.oneStock(+this.$attrs.id)[0];
    this.stock = oneStock;
    if (!this.stock) {
      this.stock = {
        id: +this.$attrs.id,
        date: `${new Date().getDate()}.${
          new Date().getMonth() + 1
        }.${new Date().getFullYear()}`,
        status: true,
      };
    }
    if (!this.stock.seo) {
      this.stock.seo = {};
    }
    if (!this.stock.seoUa) {
      this.stock.seoUa = {};
    }
    if (!this.status) {
      this.status = this.stock.status
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.stock-edit__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#stockEdit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.stock__switch {
  display: flex;
  justify-content: flex-end;
}
.stockEdit__input-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
