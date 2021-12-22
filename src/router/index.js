import Vue from "vue";
import VueRouter from "vue-router";
import { getAuth } from "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/poster",
    name: "poster",
    props: true,
    meta: { layout: "site" },
    component: () => import("@/mainViews/poster.vue"),
  },
  {
    path: "/timetable",
    name: "timetable",
    meta: { layout: "site" },
    component: () => import("@/mainViews/timetable.vue"),
  },
  {
    path: "/filmInfo/:id",
    name: "filmInfo",
    props: true,
    meta: { layout: "site" },
    component: () => import("@/mainViews/film.vue"),
  },
  {
    path: "/session/:id",
    name: "session",
    props: true,
    meta: { layout: "site" },
    component: () => import("@/mainViews/session.vue"),
  },
  {
    path: "/poster/comingSoon",
    name: "comingSoon",
    props: true,
    meta: { layout: "site" },
    component: () => import("@/mainViews/comingSoon.vue"),
  },
  {
    path: "/",
    name: "mainSite",
    meta: { layout: "mainSite" },
    component: () => import("@/mainViews/main.vue"),
  },
  {
    path: "/cinemas",
    name: "cinemas",
    meta: { layout: "site" },
    component: () => import("@/mainViews/cinemas.vue"),
  },
  {
    path: "/sales",
    name: "sales",
    meta: { layout: "site" },
    component: () => import("@/mainViews/sales.vue"),
  },
  {
    path: "/sales/:id",
    name: "salesInfo",
    meta: { layout: "site" },
    props: true,
    component: () => import("@/mainViews/salesInfo.vue"),
  },
  {
    path: "/cinemas/:id",
    name: "cinemasInfo",
    meta: { layout: "site" },
    props: true,
    component: () => import("@/mainViews/cinemasInfo.vue"),
  },
  {
    path: "/cinemas/:id/hall/:idHall",
    name: "hallInfo",
    meta: { layout: "site" },
    props: true,
    component: () => import("@/mainViews/hallInfo.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/statistics",
    name: "statistics",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Statistics.vue"),
  },
  {
    path: "/banners",
    name: "banners",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Banners.vue"),
  },
  {
    path: "/films",
    name: "films",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Films.vue"),
  },
  {
    path: "/film/:id/ru",
    name: "filmsEditRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/films/filmEdit.vue"),
  },
  {
    path: "/film/:id/ua",
    name: "filmsEditUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/films/filmEdit.vue"),
  },
  {
    path: "/cinemasAdd",
    name: "cinemasAdd",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Cinemas.vue"),
  },
  {
    path: "/cinema/:id/ru",
    name: "cinemaEditRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/cinemas/cinemaEdit.vue"),
  },
  {
    path: "/cinema/:id/ua",
    name: "cinemaEditUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/cinemas/cinemaEdit.vue"),
  },
  {
    path: "/cinema/:id/hall/:idHall/ru",
    name: "hallEditRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/cinemas/hallEdit.vue"),
  },
  {
    path: "/cinema/:id/hall/:idHall/ua",
    name: "hallEditUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/cinemas/hallEdit.vue"),
  },
  {
    path: "/news",
    name: "news",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/News.vue"),
  },
  {
    path: "/news/:id/ru",
    name: "newsEditRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/news/newsEdit.vue"),
  },
  {
    path: "/news/:id/ua",
    name: "newsEditUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/news/newsEdit.vue"),
  },
  {
    path: "/stocks",
    name: "stocks",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Stocks.vue"),
  },
  {
    path: "/stocks/:id/ru",
    name: "stockEditRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/stocks/stockEdit.vue"),
  },
  {
    path: "/stocks/:id/ua",
    name: "stockEditUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/stocks/stockEdit.vue"),
  },
  {
    path: "/pages",
    name: "pages",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Pages.vue"),
  },
  {
    path: "/timetableDay",
    name: "timetableDay",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/views/TimetableDay.vue"),
  },
  {
    path: "/timetableList/:id",
    name: "timetableList",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/views/TimetableList.vue"),
  },
  {
    path: "/timetableAdd/:id/session/:idSession",
    name: "timetableAdd",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/timetable/TimetableAdd.vue"),
  },
  {
    path: "/pages/:id/main/ru",
    name: "mainPagesRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/pages/mainEdit.vue"),
  },
  {
    path: "/pages/:id/main/ua",
    name: "mainPagesUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/pages/mainEdit.vue"),
  },
  {
    path: "/pages/:id/ua",
    name: "editPageUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/pages/editPage.vue"),
  },
  {
    path: "/pages/:id/ru",
    name: "editPageRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/pages/editPage.vue"),
  },
  {
    path: "/pages/:id/contact/ru",
    name: "editContactRu",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/pages/editContact.vue"),
  },
  {
    path: "/pages/:id/contact/ua",
    name: "editContactUa",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/pages/editContact.vue"),
  },
  {
    path: "/users",
    name: "users",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Users.vue"),
  },
  {
    path: "/users/:id/",
    name: "userEdit",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/users/userEdit.vue"),
  },
  {
    path: "/sending",
    name: "sending",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Sending.vue"),
  },
  {
    path: "/sending/choiceUser",
    name: "choiceUser",
    props: true,
    meta: { layout: "main", auth: true },
    component: () => import("@/components/sending/choiceUser.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});
export default router;
