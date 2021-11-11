<template>
  <div>
    <aside class="main-sidebar elevation-2">
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
          >
            <li v-for="link in links" :key="link.url" class="nav-item">
              <router-link
                class="nav-link"
                tag="a"
                :to="link.url"
                active-class="active"
                :exact="link.exact"
              >
                <p>{{ link.title }}</p>
              </router-link>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Статистика", url: "/", exact: true },
      { title: "Баннера/Слайдеры", url: "/banners" },
      { title: "Фильмы", url: "/films" },
      { title: "Кинонеатры", url: "/cinemas" },
      { title: "Новости", url: "/news" },
      { title: "Акции", url: "/stocks" },
      { title: "Страницы", url: "/pages" },
      { title: "Пользователи", url: "/users" },
      { title: "Рассылка", url: "/sending" },
    ],
  }),
};
</script>

<style scoped>
.main-sidebar {
  top: 57px !important;
}
</style>
