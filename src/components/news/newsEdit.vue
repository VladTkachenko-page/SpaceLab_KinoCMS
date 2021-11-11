<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="news-edit__header">
      <LangEdit :linkRu="'newsEditRu'" :linkUa="'newsEditUa'" />
      <div
        class="
          custom-control
          custom-switch
          custom-switch-off-danger
          custom-switch-on-success
          news__switch
        "
      >
        <input
          type="checkbox"
          class="custom-control-input"
          id="newsCheck"
          v-model="status"
          @change="pushStatus"
          :checked="this.news.status"
        />
        <label
          v-if="this.news.status"
          class="custom-control-label"
          for="newsCheck"
          >ВКЛ</label
        >
        <label v-else class="custom-control-label" for="newsCheck">ВЫКЛ</label>
      </div>
    </div>
    <form id="newsEdit" action="">
      <div class="newsEdit__input-wrap">
        <setName
          v-if="this.$attrs.lang === 'ru'"
          :objName="this.news.name"
          :name="'Название новости'"
          @push-data="pushName"
        />
        <setName
          v-else
          :key="1"
          :objName="this.news.nameUa"
          :name="'Назва новини'"
          @push-data="pushNameUa"
        />
        <setDate
          :objDate="this.news.datePublic"
          :nameDate="'Дата публикации'"
          @push-data="pushDate"
        />
      </div>
      <setDescription
        v-if="this.$attrs.lang === 'ru'"
        :objDescription="this.news.description"
        :description="'Описание'"
        @push-data="pushDescription"
      />
      <setDescription
        v-else
        :key="2"
        :objDescription="this.news.descriptionUa"
        :description="'Опис'"
        @push-data="pushDescriptionUa"
      />
      <setMainImg
        :objMainImgText="'Главная картинка'"
        :objMainImg="this.news.imgSRC"
        :id="'mainImg'"
        @remove-main-obj-img="removeNewsImg"
        @push-main-obj-img="pushNewsImg"
      />
      <setImgGallery
        :objId="+this.$attrs.id"
        :objImgGallery="this.news.gallery"
        @push-img-gallery="pushGalleryNewsImg"
        @remove-img-gallery="removeGalleryImg"
        @add-img-gallery="addImgNewsGallery"
      />
      <setVideo
        v-if="this.$attrs.lang === 'ru'"
        :nameUrl="'Ссылка на видео'"
        :objVideo="this.news.videoURL"
        @push-data="pushVideo"
      />
      <setVideo
        v-else
        :key="3"
        :nameUrl="'Посилання на відео'"
        :objVideo="this.news.videoURLUa"
        @push-data="pushVideoUa"
      />
      <setSEO
        v-if="this.$attrs.lang === 'ru'"
        @push-data="pushSEO"
        :objSEOURL="this.news.seo.seoURL"
        :objSEOTitle="this.news.seo.seoTitle"
        :objSEOWords="this.news.seo.seoWords"
        :objSEODescription="this.news.seo.seoDescription"
      />
      <setSEO
        v-else
        :key="4"
        @push-data="pushSEOUa"
        :objSEOURL="this.news.seoUa.seoURL"
        :objSEOTitle="this.news.seoUa.seoTitle"
        :objSEOWords="this.news.seoUa.seoWords"
        :objSEODescription="this.news.seoUa.seoDescription"
      />
      <div class="edit-buttons">
        <button
          type="submit"
          form="newsEdit"
          class="btn-success banner-up__btn"
          @click.prevent="sendNewsData"
          :disabled="this.disabled"
        >
          Сохранить
        </button>
        <router-link
          tag="button"
          class="btn-primary"
          :to="{
            name: 'news',
          }"
        >
          Вернуться
        </router-link>
      </div>
    </form>
    <Toast :sending="this.sending" :text="'Новость успешно сохранена'"></Toast>
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
      news: {},
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
    LangEdit,
  },
  methods: {
    ...mapMutations([
      "pushNewsMainImg",
      "pushNewsGalleryImg",
      "removeNewsImgGallery",
    ]),
    pushStatus() {
      this.news.status = this.status;
      this.disabled = false;
    },
    pushName(name) {
      this.news.name = name;
      this.disabled = false;
    },
    pushNameUa(name) {
      this.news.nameUa = name;
      this.disabled = false;
    },
    pushDate(date) {
      this.news.datePublic = date;
      this.disabled = false;
    },
    pushDescription(description) {
      this.news.description = description;
      this.disabled = false;
    },
    pushVideo(url) {
      this.news.videoURL = url;
      this.disabled = false;
    },
    pushSEO(seo) {
      this.news.seo = seo;
      this.disabled = false;
    },
    pushDescriptionUa(description) {
      this.news.descriptionUa = description;
      this.disabled = false;
    },
    pushVideoUa(url) {
      this.news.videoURLUa = url;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.news.seoUa = seo;
      this.disabled = false;
    },
    addImgNewsGallery(img) {
      this.news.gallery = img;
    },
    async sendNewsData() {
      try {
        if (this.allNews.findIndex((el) => el.id === this.news.id) === -1) {
          this.allNews.push(this.news);
        }
        await this.$store.dispatch("sendNews", this.news);
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
        }, 4000);
      } catch (e) {
        console.log(e);
      }
      if (this.galleryDelete.length !== 0) {
        this.removeNewsImgGallery(this.galleryDelete);
        this.galleryDelete = [];
      }
    },
    removeNewsImg() {
      this.news.imgSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      this.disabled = false;
    },
    pushNewsImg(img) {
      this.news.mainImg = img;
      this.disabled = false;
    },
    pushGalleryNewsImg(imgNewsData) {
      if (this.news.gallery.length === 0) {
        this.news.gallery.push({ file: imgNewsData.file, id: imgNewsData.id });
      } else {
        this.news.gallery.splice(imgNewsData.index, 1, {
          file: imgNewsData.file,
          id: imgNewsData.id,
          newsId: imgNewsData.objId,
        });
      }
      this.disabled = false;
    },
    removeGalleryImg(id) {
      const index = this.news.gallery.findIndex((el) => id.imgId === el.id);
      this.galleryDelete.push(
        this.news.gallery.filter((el) => el.id === id.imgId)[0]
      );
      this.news.gallery.splice(index, 1);
      this.disabled = false;
    },
  },
  computed: mapGetters(["allNews"]),
  async mounted() {
    await this.$store.dispatch("fetchNews", this.allNews);
    const oneNews = await this.$store.getters.oneNews(+this.$attrs.id)[0];
    this.news = oneNews;
    if (!this.news) {
      this.news = {
        id: +this.$attrs.id,
        date: `${new Date().getDate()}.${
          new Date().getMonth() + 1
        }.${new Date().getFullYear()}`,
        status: true,
      };
    }
    if (!this.news.seo) {
      this.news.seo = {};
    }
    if (!this.news.seoUa) {
      this.news.seoUa = {};
    }
    if (!this.status) {
      this.status = this.news.status;
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.news-edit__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#newsEdit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.news__switch {
  display: flex;
  justify-content: flex-end;
}
.newsEdit__input-wrap {
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
