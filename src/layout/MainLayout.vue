<template>
  <div class="wrapper">
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/navbar.vue";
import Sidebar from "@/components/app/sidebar.vue";

export default {
  name: "Home",
  components: {
    Navbar, Sidebar
  },
};
</script>