<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="main-edit__header">
      <LangEdit :linkRu="'mainPagesRu'" :linkUa="'mainPagesUa'" />
      <div
        class="
          custom-control
          custom-switch
          custom-switch-off-danger
          custom-switch-on-success
          mainPages__switch
        "
      >
        <input
          type="checkbox"
          class="custom-control-input"
          id="mainPagesCheck"
          v-model="status"
          @change="pushStatus"
          :checked="this.mainPages.status"
        />
        <label
          v-if="this.mainPages.status"
          class="custom-control-label"
          for="mainPagesCheck"
          >ВКЛ</label
        >
        <label v-else class="custom-control-label" for="mainPagesCheck"
          >ВЫКЛ</label
        >
      </div>
    </div>
    <form id="mainPagesEdit" action="">
      <div class="mainPagesEdit__phone">
        <div class="mainPagesEdit__phone-label">
          <label for="phone">Телефон</label>
        </div>
        <div 
          class="mainPagesEdit__phone-input" 
          v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        >
          <input
            type="text"
            id="phone"
            placeholder="1234 5678"
            v-model="inputPhone1"
            @input="pushPhone"
          />
          <input
            type="text"
            id="phone"
            placeholder="1234 5678"
            v-model="inputPhone2"
            @input="pushPhone"
          />
        </div>
        <div class="mainPagesEdit__phone-input" v-else>
          <input
            type="text"
            id="phone"
            placeholder="1234 5678"
            v-model="inputPhoneUa1"
            @input="pushPhoneUa"
          />
          <input
            type="text"
            id="phone"
            placeholder="1234 5678"
            v-model="inputPhoneUa2"
            @input="pushPhoneUa"
          />
        </div>
      </div>
      <setDescription
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        :objDescription="this.mainPages.description"
        :description="'SEO текст'"
        @push-data="pushDescription"
      />
      <setDescription
        v-else
        :key="1"
        :objDescription="this.mainPages.descriptionUa"
        :description="'SEO текст'"
        @push-data="pushDescriptionUa"
      />
      <setSEO
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        @push-data="pushSEO"
        :objSEOURL="this.mainPages.seo.seoURL"
        :objSEOTitle="this.mainPages.seo.seoTitle"
        :objSEOWords="this.mainPages.seo.seoWords"
        :objSEODescription="this.mainPages.seo.seoDescription"
      />
      <setSEO
        v-else
        :key="2"
        @push-data="pushSEOUa"
        :objSEOURL="this.mainPages.seoUa.seoURL"
        :objSEOTitle="this.mainPages.seoUa.seoTitle"
        :objSEOWords="this.mainPages.seoUa.seoWords"
        :objSEODescription="this.mainPages.seoUa.seoDescription"
      />
      <div class="edit-buttons">
        <button
          type="submit"
          form="mainPagesEdit"
          class="btn-success banner-up__btn"
          @click.prevent="sendMainPagesData"
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
    <Toast :sending="this.sending" :text="'Данные успешно сохранены'"></Toast>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import Toast from "@/components/app/toast.vue";
import LangEdit from "@/components/app/langEdit.vue";
import setDescription from "@/components/edit/setDescription.vue";
import setSEO from "@/components/edit/setSEO.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      sending: false,
      disabled: true,
      status: this.status,
      mainPages: {},
      inputPhone1: "",
      inputPhone2: "",
      inputPhoneUa1: "",
      inputPhoneUa2: "",
    };
  },
  components: {
    Loader,
    Toast,
    setDescription,
    setSEO,
    LangEdit
  },
  methods: {
    pushStatus() {
      this.mainPages.status = this.status;
      this.disabled = false;
    },
    pushPhone() {
      this.mainPages.phone1 = this.inputPhone1;
      this.mainPages.phone2 = this.inputPhone2;
      this.disabled = false;
    },
    pushDescription(description) {
      this.mainPages.description = description;
      this.disabled = false;
    },
    pushSEO(seo) {
      this.mainPages.seo = seo;
      this.disabled = false;
    },
    pushPhoneUa() {
      this.mainPages.phoneUa1 = this.inputPhoneUa1;
      this.mainPages.phoneUa2 = this.inputPhoneUa2;
      this.disabled = false;
    },
    pushDescriptionUa(description) {
      this.mainPages.descriptionUa = description;
      this.disabled = false;
    },
    pushSEOUa(seo) {
      this.mainPages.seoUa = seo;
      this.disabled = false;
    },
    async sendMainPagesData() {
      try {
        if (
          this.allPages.findIndex((el) => el.id === this.mainPages.id) === -1
        ) {
          this.allPages.push(this.mainPages);
        }
        await this.$store.dispatch("sendMainPages", this.mainPages);
        this.sending = true;
        setTimeout(() => {
          this.sending = false;
          this.$router.push('/pages');
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: mapGetters(["allPages"]),
  async mounted() {
    await this.$store.dispatch("fetchPages", this.allPages);
    const onePage = await this.$store.getters.onePage(+this.$attrs.id)[0];
    this.mainPages = onePage;
    if (this.mainPages.phone1) {
      this.inputPhone1 = this.mainPages.phone1;
    }
    if (this.mainPages.phone2) {
      this.inputPhone2 = this.mainPages.phone2;
    }
    if (this.mainPages.phoneUa1) {
      this.inputPhoneUa1 = this.mainPages.phoneUa1;
    }
    if (this.mainPages.phoneUa2) {
      this.inputPhoneUa2 = this.mainPages.phoneUa2;
    }
    if (!this.mainPages.seo) {
      this.mainPages.seo = {};
    }
    if (!this.mainPages.seoUa) {
      this.mainPages.seoUa = {};
    }
    if (!this.status) {
      this.status = this.mainPages.status;
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.main-edit__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#mainPages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.mainPages__switch {
  display: flex;
  justify-content: flex-end;
}
.mainPages__input-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.mainPagesEdit__phone {
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
}
.mainPagesEdit__phone-label {
  margin-right: 20px;
}
.mainPagesEdit__phone-input {
  display: flex;
  flex-direction: column;
}
.mainPagesEdit__phone-input input:first-child {
  margin-bottom: 10px;
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
