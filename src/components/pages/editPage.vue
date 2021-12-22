<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="page-edit__header">
      <LangEdit :linkRu="'editPageRu'" :linkUa="'editPageUa'" />
      <div
        class="
          custom-control
          custom-switch
          custom-switch-off-danger
          custom-switch-on-success
          page__switch
        "
      >
        <input
          type="checkbox"
          class="custom-control-input"
          id="pageCheck"
          v-model="status"
          @change="pushStatus"
          :checked="this.page.status"
        />
        <label
          v-if="this.page.status"
          class="custom-control-label"
          for="pageCheck"
          >ВКЛ</label
        >
        <label v-else class="custom-control-label" for="pageCheck">ВЫКЛ</label>
      </div>
    </div>
    <form id="pageEdit" action="">
      <div class="pageEdit__input-wrap">
        <setName
          v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
          :objName="this.page.name"
          :name="'Название'"
          @push-data="pushName"
        />
        <setName
          v-else
          :key="1"
          :objName="this.page.nameUa"
          :name="'Назва'"
          @push-data="pushNameUa"
        />
      </div>
      <setDescription
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objDescription="this.page.description"
        :description="'Описание'"
        @push-data="pushDescription"
      />
      <setDescription
        v-else
        :key="2"
        :objDescription="this.page.descriptionUa"
        :description="'Опис'"
        @push-data="pushDescriptionUa"
      />
      <setMainImg
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objMainImgText="'Главная картинка'"
        :objMainImg="this.page.imgSRC"
        :id="'mainImg'"
        @remove-main-obj-img="removePageImg"
        @push-main-obj-img="pushPageImg"
      />
      <setMainImg
        v-else
        :key="3"
        :objMainImgText="'Главная картинка'"
        :objMainImg="this.page.imgSRCUa"
        :id="'mainImg'"
        @remove-main-obj-img="removePageImgUa"
        @push-main-obj-img="pushPageImgUa"
      />
      <setImgGallery
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objId="+this.$attrs.id"
        :objImgGallery="this.page.gallery"
        @push-img-gallery="pushGalleryPageImg"
        @remove-img-gallery="removeGalleryImg"
        @add-img-gallery="addImgPageGallery"
      />
      <setImgGallery
        v-else
        :key="4"
        :objId="+this.$attrs.id"
        :objImgGallery="this.page.galleryUa"
        @push-img-gallery="pushGalleryPageImgUa"
        @remove-img-gallery="removeGalleryImgUa"
        @add-img-gallery="addImgPageGalleryUa"
      />
      <setSEO
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        @push-data="pushSEO"
        :objSEOURL="this.page.seo.seoURL"
        :objSEOTitle="this.page.seo.seoTitle"
        :objSEOWords="this.page.seo.seoWords"
        :objSEODescription="this.page.seo.seoDescription"
      />
      <setSEO
        v-else
        :key="5"
        @push-data="pushSEOUa"
        :objSEOURL="this.page.seoUa.seoURL"
        :objSEOTitle="this.page.seoUa.seoTitle"
        :objSEOWords="this.page.seoUa.seoWords"
        :objSEODescription="this.page.seoUa.seoDescription"
      />
      <div class="edit-buttons">
        <button
          type="submit"
          form="pageEdit"
          class="btn-success banner-up__btn"
          @click.prevent="sendPageData"
          :disabled="this.disabled"
        >
          Сохранить
        </button>
        <router-link
          tag="button"
          class="btn-primary"
          :to="{
            name: 'pages',
          }"
        >
          Вернуться
        </router-link>
      </div>
    </form>
    <Toast :sending="this.sending" :text="'Страница успешно сохранена'"></Toast>
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
      sending: false,
      disabled: true,
      status: this.status,
      page: {},
      galleryDelete: [],
    };
  },
  components: {
    Loader,
    Toast,
    setName,
    setDescription,
    setMainImg,
    setImgGallery,
    setSEO,
    LangEdit,
  },
  methods: {
    ...mapMutations([
      "pushPageMainImg",
      "pushPageGalleryImg",
      "removePageImgGallery",
    ]),
    pushStatus() {
      this.page.status = this.status;
      this.disabled = false;
    },
    pushName(name) {
      this.page.name = name;
      this.disabled = false;
    },
    pushDescription(description) {
      this.stock.description = description;
      this.disabled = false;
    },
    pushSEO(seo) {
      this.page.seo = seo;
      this.disabled = false;
    },
    pushNameUa(name) {
      this.page.nameUa = name;
      this.disabled = false;
    },
    pushDescriptionUa(description) {
      this.stock.descriptionUa = description;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.page.seoUa = seo;
      this.disabled = false;
    },
    addImgPageGallery(img) {
      this.page.gallery = img;
    },
    addImgPageGalleryUa(img) {
      this.page.galleryUa = img;
    },
    async sendPageData() {
      try {
        if (this.allPages.findIndex((el) => el.id === this.page.id) === -1) {
          this.allPages.push(this.page);
        }
        await this.$store.dispatch("sendPage", this.page);
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
          this.$router.push("/pages");
        }, 1000);
      } catch (e) {
        console.log(e);
      }
      if (this.galleryDelete.length !== 0) {
        this.removePageImgGallery({
          gallery: this.galleryDelete,
          id: this.page.id,
        });
        this.galleryDelete = [];
      }
    },
    removePageImg() {
      this.page.imgSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    pushPageImg(img) {
      this.page.mainImg = img;
      this.page.imgSRC = URL.createObjectURL(img);
      this.disabled = false;
    },
    removePageImgUa() {
      this.page.imgSRCUa =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    pushPageImgUa(img) {
      this.page.mainImgUa = img;
      this.page.imgSRCUa = URL.createObjectURL(img);
      this.disabled = false;
    },
    pushGalleryPageImg(imgPageData) {
      if (this.page.gallery.length === 0) {
        this.page.gallery.push({
          file: imgPageData.file,
          id: imgPageData.id,
          imgSRC: URL.createObjectURL(imgPageData.file),
        });
      } else {
        this.page.gallery.splice(imgPageData.index, 1, {
          file: imgPageData.file,
          id: imgPageData.id,
          pageId: imgPageData.objId,
          imgSRC: URL.createObjectURL(imgPageData.file),
        });
      }
      this.disabled = false;
    },
    pushGalleryPageImgUa(imgPageData) {
      if (this.page.galleryUa.length === 0) {
        this.page.galleryUa.push({
          file: imgPageData.file,
          id: imgPageData.id,
          imgSRC: URL.createObjectURL(imgPageData.file),
        });
      } else {
        this.page.galleryUa.splice(imgPageData.index, 1, {
          file: imgPageData.file,
          id: imgPageData.id,
          pageId: imgPageData.objId,
          imgSRC: URL.createObjectURL(imgPageData.file),
        });
      }
      this.disabled = false;
    },
    removeGalleryImg(id) {
      const index = this.page.gallery.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.page.gallery.filter((el) => el.id === id.imgId)[0]
      );
      this.page.gallery.splice(index, 1);
      this.disabled = false;
    },
    removeGalleryImgUa(id) {
      const index = this.page.galleryUa.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.page.galleryUa.filter((el) => el.id === id.imgId)[0]
      );
      this.page.galleryUa.splice(index, 1);
      this.disabled = false;
    },
  },
  computed: mapGetters(["allPages"]),
  async mounted() {
    await this.$store.dispatch("fetchPages", this.allPages);
    const onePage = await this.$store.getters.onePage(+this.$attrs.id)[0];
    this.page = onePage;
    if (!this.page) {
      this.page = {
        id: +this.$attrs.id,
        date: `${new Date().getDate()}.${
          new Date().getMonth() + 1
        }.${new Date().getFullYear()}`,
        status: false,
        delete: true,
      };
    }
    if (!this.page.seo) {
      this.page.seo = {};
    }
    if (!this.page.seoUa) {
      this.page.seoUa = {};
    }
    if (!this.status) {
      this.status = this.page.status;
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.page-edit__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#pageEdit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.page__switch {
  display: flex;
  justify-content: flex-end;
}
.pageEdit__input-wrap {
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
