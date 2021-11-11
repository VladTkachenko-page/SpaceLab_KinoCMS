<template>
  <div>
    <h2 class="main__title text-center stock__header-title">Список акций</h2>
    <div class="stock__header-btn">
      <router-link
        tag="button"
        :to="{
          name: 'stockEditRu',
          params: { id: new Date().getTime(), lang: 'ru' },
        }"
        class="btn-success"
      >
        Создать акцию
      </router-link>
    </div>
    <Loader v-if="loading" />
    <div class="stock__wrap" v-else>
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
            <stockTable
              v-for="stock in this.allStocks"
              :key="stock.id"
              :stock="stock"
              @showModal="showModalDelete"
            />
          </tbody>
        </table>
      </div>
    </div>
    <modal
      :obj="this.stockDelete"
      v-if="showModal"
      @close="showModal = false"
      @delete="deleteStock"
    >
      <h3 slot="header">Удаление {{ this.stockDelete.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить акцию {{ this.stockDelete.name }}?
      </p>
    </modal>
    <Toast :sending="this.sending" :text="'Акция успешно удалена'"></Toast>
  </div>
</template>

<script>
import Toast from "@/components/app/toast.vue";
import Loader from "@/components/app/loader.vue";
import modal from "@/components/app/modal.vue";
import stockTable from "@/components/stocks/stockTable.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showModal: false,
      sending: false,
      stockDelete: {},
    };
  },
  components: {
    Loader,
    Toast,
    modal,
    stockTable,
  },
  methods: {
    ...mapMutations(["removeStock"]),
    showModalDelete(stock) {
      this.showModal = true;
      this.stockDelete = stock;
    },
    async deleteStock(stock) {
      let stocks = this.allStocks.filter((el) => stock.id !== el.id);
      await this.removeStock({ stocks, stock });
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
      this.showModal = false;
      let index = this.allStocks.findIndex((el) => stock.id === el.id);
      this.allStocks.splice(index, 1);
    },
  },
  computed: mapGetters(["allStocks"]),
  async mounted() {
    await this.$store.dispatch("fetchStocks", this.allStocks);
    this.loading = false;
  },
};
</script>

<style scoped>
.stock__header-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
