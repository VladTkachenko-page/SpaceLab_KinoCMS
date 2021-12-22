import Vue from "vue";
import Vuex from "vuex";
import banners from "./modules/banners";
import films from "./modules/films";
import cinemas from "./modules/cinemas";
import news from "./modules/news";
import stocks from "./modules/stocks";
import pages from "./modules/pages";
import users from "./modules/users";
import auth from "./modules/auth";
import send from "./modules/send";
import timetable from "./modules/timetable";

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
    users,
    auth,
    send,
    timetable,
  },
});
