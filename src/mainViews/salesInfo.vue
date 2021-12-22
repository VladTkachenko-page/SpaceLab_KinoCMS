<template>
  <Loader v-if="loading" />
  <div v-else class="sales-info">
    <h4 class="sales-info__title">{{ this.stock.name }}</h4>
    <div class="sales-info__wrap">
      <div class="sales-info__img">
        <img :src="this.stock.imgSRC" alt="" />
      </div>
      <div class="sales-info__desc">
        {{ this.stock.description }}
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
      stock: {},
      loading: true,
    };
  },
  components: {
    Loader,
  },
  computed: mapGetters(["allStocks"]),

  async mounted() {
    await this.$store.dispatch("fetchStocks");
    this.stock = await this.$store.getters.oneStock(+this.$attrs.id)[0];

    this.loading = false;
  },
};
</script>

<style scoped>
.sales-info {
  padding: 20px;
  background-color: #161e27;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: #fff;
}
.sales-info__wrap {
  display: flex;
}
.sales-info__img {
  border-radius: 10px;
}
.sales-info__img img{
  width: 350px;
  height: 350px;
} 
.sales-info__desc {
  margin-left: 15px;
  max-width: 650px;
}
</style>