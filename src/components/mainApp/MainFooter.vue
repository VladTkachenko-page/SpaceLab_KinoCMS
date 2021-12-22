<template>
  <footer class="footer container">
    <div class="footer__wrap">
      <div class="apps">
        <h4 class="apps__title">Мобильные приложения</h4>
        <div class="apps__items">
          <div class="apps__item">
            <a href="#"><i class="fab fa-google-play"></i></a>
          </div>
          <div class="apps__item">
            <a href="#"><i class="fab fa-app-store-ios"></i></a>
          </div>
        </div>
      </div>
      <ul class="footer__list">
        <li v-for="link in links" :key="link.url">
          <router-link :to="link.url">
            <p>{{ link.title }}</p>
          </router-link>
        </li>
      </ul>
      <ul class="footer__list">
        <li v-for="link in links2" :key="link.url">
          <router-link :to="link.url">
            <p>{{ link.title }}</p>
          </router-link>
        </li>
      </ul>
      <ul class="social">
        <li>
          <a href="#"><i class="fab fa-facebook"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-twitter-square"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-google-plus-square"></i></a>
        </li>
      </ul>
    </div>
    <p class="footer__copyright">@KinoCMS 2021, all rights reserved</p>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    links: [
      { title: "Афиша", url: "/poster" },
      { title: "Расписание", url: "/timetable" },
      { title: "Скоро в прокате", url: "/poster/comingSoon" },
      { title: "Кинонеатры", url: "/cinemas" },
      { title: "Акции", url: "/stocks" },
    ],
    links2: [
      { title: "О кинотеатре", url: "/pages" },
      { title: "Новости", url: "/news" },
      { title: "Реклама", url: "/ad" },
      { title: "Кафе-Бар", url: "/cafe" },
      { title: "Контакты", url: "/contacts" },
    ],
  }),
  computed: mapGetters(["allPages"]),
  async mounted() {
    await this.$store.dispatch("fetchPages", this.allPages);
    this.mainPage = this.allPages[0];
  },
};
</script>

<style scoped>
.footer {
  margin-top: 30px;
  padding: 30px;
  border-top: 3px solid #000;
}
.footer__wrap {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 40px;
}
.footer__list li {
  list-style: none;
}
.footer__list li:first-child {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
}
.footer__list a{
  color: #000;
}
.footer__copyright {
  text-align: center;
}
.apps__items {
  display: flex;
  font-size: 80px;
}
.apps__item:last-child {
  margin-left: 15px;
}
.social {
  display: flex;
  margin: 0;
}
.social li {
  list-style: none;
  font-size: 30px;
  margin-left: 10px;
}
</style>
