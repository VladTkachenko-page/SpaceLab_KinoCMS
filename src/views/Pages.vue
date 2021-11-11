<template>
  <div>
    <h2 class="main__title text-center news__header-title">Список страниц</h2>
    <div class="pages__header-btn">
      <router-link
        tag="button"
        :to="{
          name: 'editPageRu',
          params: { id: new Date().getTime(), lang: 'ru' },
        }"
        class="btn-success"
      >
        Создать новую
      </router-link>
    </div>
    <Loader v-if="loading" />
    <div class="news__wrap" v-else>
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
            <pageTable
              v-for="page in this.allPages"
              :key="page.id"
              :page="page"
              @showModal="showModalDelete"
            />
          </tbody>
        </table>
      </div>
    </div>
    <modal
      :obj="this.pageDelete"
      v-if="showModal"
      @close="showModal = false"
      @delete="deletePage"
    >
      <h3 slot="header">Удаление {{ this.pageDelete.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить страницу {{ this.pageDelete.name }}?
      </p>
    </modal>
    <Toast :sending="this.sending" :text="'Страница успешно удалена'"></Toast>
  </div>
</template>

<script>
import Toast from "@/components/app/toast.vue";
import Loader from "@/components/app/loader.vue";
import modal from "@/components/app/modal.vue";
import pageTable from "@/components/pages/pageTable.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showModal: false,
      sending: false,
      pageDelete: {},
    };
  },
  components: {
    Loader,
    Toast,
    modal,
    pageTable,
  },
  methods: {
    ...mapMutations(["removePage"]),
    showModalDelete(news) {
      this.showModal = true;
      this.pageDelete = news;
    },
    async deletePage(page) {
      let pages = this.allPages.filter((el) => page.id !== el.id);
      await this.removePage({ pages, page });
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
      this.showModal = false;
      let index = this.allPages.findIndex((el) => page.id === el.id);
      this.allPages.splice(index, 1);
    },
  },
  computed: mapGetters(["allPages"]),
  async mounted() {
    await this.$store.dispatch("fetchPages", this.allPages);
    this.loading = false;
  },
};
</script>

<style scoped>
.pages__header-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
