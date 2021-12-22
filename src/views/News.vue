<template>
  <Loader v-if="loading" />
  <div v-else>
    <h2 class="main__title text-center news__header-title">Список новостей</h2>
    <div class="news__header-btn">
      <router-link
        tag="button"
        :to="{
          name: 'newsEditRu',
          params: { id: new Date().getTime(), lang: 'ru' },
        }"
        class="btn-success"
      >
        Создать новость
      </router-link>
    </div>
    <div class="news__wrap" >
      <div class="table-responsive">
        <table class="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Название</th>
              <th>Дата создания</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <newsTable
              v-for="news in this.allNews"
              :key="news.id"
              :news="news"
              @showModal="showModalDelete"
            />
          </tbody>
        </table>
      </div>
    </div>
    <modal
      :obj="this.newsDelete"
      v-if="showModal"
      @close="showModal = false"
      @delete="deleteNews"
    >
      <h3 slot="header">Удаление {{ this.newsDelete.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить новость {{ this.newsDelete.name }}?
      </p>
    </modal>
    <Toast :sending="this.sending" :text="'Новость успешно удалена'"></Toast>
  </div>
</template>

<script>
import Toast from "@/components/app/toast.vue";
import Loader from "@/components/app/loader.vue";
import modal from "@/components/app/modal.vue";
import newsTable from "@/components/news/newsTable.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showModal: false,
      sending: false,
      newsDelete: {},
    };
  },
  components: {
    Loader,
    Toast,
    modal,
    newsTable,
  },
  methods: {
    ...mapMutations(["removeNews"]),
    showModalDelete(news) {
      this.showModal = true;
      this.newsDelete = news;
    },
    async deleteNews(news) {
      let newss = this.allNews.filter((el) => news.id !== el.id);
      await this.removeNews({ newss, news });
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
      this.showModal = false;
      let index = this.allNews.findIndex((el) => news.id === el.id);
      this.allNews.splice(index, 1);
    },
  },
  computed: mapGetters(["allNews"]),
  async mounted() {
    await this.$store.dispatch("fetchNews", this.allNews);
    this.loading = false;
  },
};
</script>

<style scoped>
.news__header-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
