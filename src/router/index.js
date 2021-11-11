import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import('@/views/Statistics.vue')
  },
  {
    path: "/banners",
    name: "banners",
    component: () => import('@/views/Banners.vue')
  },
  {
    path: "/films",
    name: "films",
    component: () => import('@/views/Films.vue'),
  },
  {
    path: "/film/:id/ru",
    name: "filmsEditRu",
    props: true,
    component: () => import('@/components/films/filmEdit.vue')
  },
  {
    path: "/film/:id/ua",
    name: "filmsEditUa",
    props: true,
    component: () => import('@/components/films/filmEdit.vue')
  },
  {
    path: "/cinemas",
    name: "cinemas",
    component: () => import('@/views/Cinemas.vue')
  },
  {
    path: "/cinema/:id/ru",
    name: "cinemaEditRu",
    props: true,
    component: () => import('@/components/cinemas/cinemaEdit.vue')
  },
  {
    path: "/cinema/:id/ua",
    name: "cinemaEditUa",
    props: true,
    component: () => import('@/components/cinemas/cinemaEdit.vue')
  },
  {
    path: "/cinema/:id/hall/:idHall/ru",
    name: "hallEditRu",
    props: true,
    component: () => import('@/components/cinemas/hallEdit.vue')
  },
  {
    path: "/cinema/:id/hall/:idHall/ua",
    name: "hallEditUa",
    props: true,
    component: () => import('@/components/cinemas/hallEdit.vue')
  },
  {
    path: "/news",
    name: "news",
    component: () => import('@/views/News.vue')
  },
  {
    path: "/news/:id/ru",
    name: "newsEditRu",
    props: true,
    component: () => import('@/components/news/newsEdit.vue')
  },
  {
    path: "/news/:id/ua",
    name: "newsEditUa",
    props: true,
    component: () => import('@/components/news/newsEdit.vue')
  },
  {
    path: "/stocks",
    name: "stocks",
    component: () => import('@/views/Stocks.vue')
  },
  {
    path: "/stocks/:id/ru",
    name: "stockEditRu",
    props: true,
    component: () => import('@/components/stocks/stockEdit.vue')
  },
  {
    path: "/stocks/:id/ua",
    name: "stockEditUa",
    props: true,
    component: () => import('@/components/stocks/stockEdit.vue')
  },
  {
    path: "/pages",
    name: "pages",
    component: () => import('@/views/Pages.vue')
  },
  {
    path: "/pages/:id/ru",
    name: "mainPagesRu",
    props: true,
    component: () => import('@/components/pages/mainEdit.vue')
  },
  {
    path: "/pages/:id/ua",
    name: "mainPagesUa",
    props: true,
    component: () => import('@/components/pages/mainEdit.vue')
  },
  {
    path: "/pages/:id/ua",
    name: "editPageUa",
    props: true,
    component: () => import('@/components/pages/editPage.vue')
  },
  {
    path: "/pages/:id/ru",
    name: "editPageRu",
    props: true,
    component: () => import('@/components/pages/editPage.vue')
  },
  {
    path: "/pages/:id/ru",
    name: "editContactRu",
    props: true,
    component: () => import('@/components/pages/editContact.vue')
  },
  {
    path: "/pages/:id/ua",
    name: "editContactUa",
    props: true,
    component: () => import('@/components/pages/editContact.vue')
  },
  {
    path: "/users",
    name: "users",
    component: () => import('@/views/Users.vue')
  },
  {
    path: "/sending",
    name: "sending",
    component: () => import('@/views/Sending.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
