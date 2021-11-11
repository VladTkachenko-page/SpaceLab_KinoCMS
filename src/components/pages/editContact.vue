<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="page-edit__header">
      <LangEdit :linkRu="'editContactRu'" :linkUa="'editContactUa'" />
      <div
        class="
          custom-control
          custom-switch
          custom-switch-off-danger
          custom-switch-on-success
          pageContact__switch
        "
      >
        <input
          type="checkbox"
          class="custom-control-input"
          id="pageContactCheck"
          v-model="status"
          @change="pushStatus"
          :checked="this.page.status"
        />
        <label
          v-if="this.page.status"
          class="custom-control-label"
          for="pageContactCheck"
          >ВКЛ</label
        >
        <label v-else class="custom-control-label" for="pageContactCheck">ВЫКЛ</label>
      </div>
    </div>
    <form id="pageEdit" action="">
      <addCinema
        v-for="cinema of this.cinema"
        :key="cinema.id"
        :cinema="cinema"
        :lang="$attrs.lang"
        @push-name="pushNameCinema"
        @push-name-ua="pushNameCinemaUa"
        @push-address="pushAddress"
        @push-address-ua="pushAddressUa"
        @push-map="pushMap"
        @push-page-img="pushPageImg"
      />
      <button class="btn-success" @click.prevent="addCinema">
        Добавить еще кинотеатр
      </button>
      <setSEO
        v-if="this.$attrs.lang === 'ru'"
        @push-data="pushSEO"
        :objSEOURL="this.page.seo.seoURL"
        :objSEOTitle="this.page.seo.seoTitle"
        :objSEOWords="this.page.seo.seoWords"
        :objSEODescription="this.page.seo.seoDescription"
      />
      <setSEO
        v-else
        :key="1"
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
import addCinema from "@/components/pages/addCinema.vue";
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
      cinema: [],
      galleryDelete: [],
    };
  },
  components: {
    Loader,
    Toast,
    addCinema,
    setSEO,
    LangEdit,
  },
  methods: {
    ...mapMutations([
      "pushPageMainImg",
      "pushPageGalleryImg",
      "removePageImgGallery",
    ]),
    addCinema() {
      this.cinema.push({id: new Date().getTime()});
      this.page.cinema = this.cinema;
    },
    pushNameCinema(val) {
      const index = this.page.cinema.findIndex((el) => val.id === el.id);
      this.page.cinema[index].name = val.name 
      this.disabled = false;
    },
    pushNameCinemaUa(val) {
      const index = this.page.cinema.findIndex((el) => val.id === el.id);
      this.page.cinema[index].nameUa = val.name 
      this.disabled = false;
    },
    pushAddress(val) {
      const index = this.page.cinema.findIndex((el) => val.id === el.id);
      this.page.cinema[index].address = val.address 
      this.disabled = false;
    },
    pushAddressUa(val) {
      const index = this.page.cinema.findIndex((el) => val.id === el.id);
      this.page.cinema[index].addressUa = val.address 
      this.disabled = false;
    },
    pushMap(val) {
      const index = this.page.cinema.findIndex((el) => val.id === el.id);
      this.page.cinema[index].mapCoor = val.mapCoor 
      this.disabled = false;
    },
    pushPageImg(val) {
      const index = this.page.cinema.findIndex((el) => val.id === el.id);
      this.page.cinema[index].img = val.img 
      this.page.cinema[index].imgSRC = val.imgSRC 
      this.disabled = false;
    },
    pushStatus() {
      this.page.status = this.status
      this.disabled = false;
    },
    pushSEO(seo) {
      this.page.seo = seo;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.page.seoUa = seo;
      this.disabled = false;
    },
    async sendPageData() {
      try {
        if (this.allPages.findIndex((el) => el.id === this.page.id) === -1) {
          this.allPages.push(this.page);
        }
        await this.$store.dispatch("sendContactPage", this.page);
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
        }, 4000);
      } catch (e) {
        console.log(e);
      }
      if (this.galleryDelete.length !== 0) {
        this.removePageImgGallery(this.galleryDelete);
        this.galleryDelete = [];
      }
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
    if (this.page.cinema) {
      this.cinema = this.page.cinema;
    }
    if (!this.page.seo) {
      this.page.seo = {};
    }
    if (!this.page.seoUa) {
      this.page.seoUa = {};
    }
    if (!this.status) {
      this.status = this.page.status
    }
    this.loading = false;
  },
};
</script>

<style scoped>
#pageEdit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.pageContact__switch {
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
