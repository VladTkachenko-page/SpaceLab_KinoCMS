<template>
  <header class="header container">
    <div class="header__top">
      <router-link class="navbar-brand" to="/">
        <span class="brand-text font-weight-light">KinoCMS</span>
      </router-link>
      <form class="form-inline ml-3">
        <div class="input-group input-group-sm find">
          <input
            class="form-control form-control-navbar find__input"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
            v-model="find"
          />
          <div v-if="this.findArray.length !== 0" class="find__items">
            <router-link
              v-for="film in this.findArray"
              :key="film.id"
              tag="a"
              :to="{
                name: 'filmInfo',
                params: {
                  id: film.id,
                },
              }"
            >
              {{ film.name }}
            </router-link>
          </div>
          <div v-else-if="this.checkFind" class="find__items">
            <p>Hичего не найдено</p>
          </div>
          <!-- <div class="input-group-append">
            <button class="btn btn-navbar" type="submit" @click.prevent>
              <i class="fas fa-search"></i>
            </button>
          </div> -->
        </div>
      </form>
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
        <li>
          <a href="#"><i class="fas fa-pen-square"></i></a>
        </li>
        <li>
          <a href="#"><i class="fas fa-plus-square"></i></a>
        </li>
      </ul>
      <div class="numbers">
        <a :href="'tel:' + this.mainPage.phone1">{{ this.mainPage.phone1 }}</a>
        <a :href="'tel:' + this.mainPage.phone2">{{ this.mainPage.phone2 }}</a>
      </div>
      <div class="header__btns">
        <router-link to="/login"
          ><button class="btn-success border-button">Логин</button></router-link
        >
        <router-link to="/register"
          ><button class="btn-success border-button">
            Регистрация
          </button></router-link
        >
      </div>
    </div>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li v-for="link in links" :key="link.url" class="nav-item">
          <router-link class="nav-link" tag="a" :to="link.url">
            <p>{{ link.title }}</p>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <router-link class="nav-link" tag="a" :to="'/pages'">
            О кинотеатре
          </router-link>
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            href="/pages"
          >
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link
              v-for="link in links2"
              :key="link.url"
              class="nav-link"
              tag="a"
              :to="link.url"
            >
              {{ link.title }}
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    mainPage: {},
    find: "",
    findArray: [],
    checkFind: false,
    links: [
      { title: "Афиша", url: "/poster" },
      { title: "Расписание", url: "/timetable" },
      { title: "Скоро", url: "/poster/comingSoon" },
      { title: "Кинонеатры", url: "/cinemas" },
      { title: "Акции", url: "/sales" },
    ],
    links2: [
      { title: "Новости", url: "/news" },
      { title: "Реклама", url: "/ad" },
      { title: "Кафе-Бар", url: "/cafe" },
      { title: "Контакты", url: "/contacts" },
    ],
  }),
  computed: mapGetters(["allPages", "allFilms", "allFilmsComming"]),
  watch: {
    find() {
      let val = this.find.toLowerCase();
      let findArr = [];
      let arr = this.allFilms.concat(this.allFilmsComming);
      let check = false;
      arr.forEach(function (item) {
        if (item.name.toLowerCase().includes(val)) {
          findArr.push(
            arr.filter(
              (el) => el.name.toLowerCase() === item.name.toLowerCase()
            )[0]
          );
          check = false;
        } else {
          check = true;
        }
      });
      this.checkFind = check;
      this.findArray = findArr;
      if (val === "") {
        this.findArray = [];
      }
    },
    "$route.path"() {
      this.find = "";
    },
  },
  methods: {},

  async mounted() {
    await this.$store.dispatch("fetchPages", this.allPages);
    await this.$store.dispatch("fetchFilms");
    await this.$store.dispatch("fetchFilmsComming");
    this.mainPage = this.allPages[0];
  },
};
</script>

<style scoped>
.header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main-header {
  /* margin: 0 !important; */
}
.menu__list {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
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
.numbers {
  display: flex;
  flex-direction: column;
}
.numbers a {
  color: #000;
  font-size: 20px;
  font-weight: 500;
}
.header__btns {
  display: flex;
  align-items: center;
}
.header__btns a:last-child {
  margin-left: 15px;
}
.dropdown {
  display: flex;
}
.dropdown a {
  padding-left: 10px !important;
  padding-right: 0 !important;
}
.form-control-navbar {
  border-right-width: 1px;
}
.find {
  position: relative;
}
.find__input {
  min-width: 230px !important;
}
.find__items {
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 10000;
  top: 30px;
  display: flex;
  flex-direction: column;
}
.find__items a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 14px;
}
.find__items a:hover {
  background-color: #ddd;
}
</style>
