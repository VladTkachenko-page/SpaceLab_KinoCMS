import Vue from "vue";
import Vuex from "vuex";
import banners from "./modules/banners";
import films from "./modules/films";
import cinemas from "./modules/cinemas";
import news from "./modules/news";
import stocks from "./modules/stocks";
import pages from "./modules/pages";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    banners,
    cinemas,
    films,
    news,
    stocks,
    pages,
  },
});
