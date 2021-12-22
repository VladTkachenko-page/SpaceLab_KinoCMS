<template>
  <Loader v-if="loading" />
  <div v-else class="sales">
    <h2 class="sales__title text-center">Акции и скидки</h2>
    <div class="sales__items">
      <div class="sales__item" v-for="stock in this.allStocks" :key="stock.id">
        <router-link
          v-if="stock.status"
          tag="a"
          :to="{
            name: 'salesInfo',
            params: { id: stock.id },
          }"
          class="sales__item__wrap"
        >
          <img class="sales__item-img" :src="stock.imgSRC" alt="" />
          <div class="sales__item-title">{{ stock.name }}</div>
          <div class="sales__item-date">{{ stock.date }}</div>
          <div class="sales__item-desc">
            {{ stock.description }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "@/components/app/loader.vue";

export default {
  data() {
    return {
      loading: true,
      film: {},
      session: [],
    };
  },
  components: {
    Loader,
  },
  computed: mapGetters(["allStocks"]),

  async mounted() {
    await this.$store.dispatch("fetchStocks");
    this.loading = false;
  },
};
</script>

<style scoped>
.sales__items {
  padding: 20px;
  background-color: #161e27;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.sales__item {
  max-width: 350px;
}
.sales__item-img {
  border-radius: 10px;
  width: 350px;
  height: 350px;
}
.sales__item-date {
  margin: 10px 0;
  padding: 0 10px;
  display: inline-block;
  border-radius: 10px;
  background-color: #13181d;
}
.sales__item-date, .sales__item-desc {
  color: #fff;
}
</style>
