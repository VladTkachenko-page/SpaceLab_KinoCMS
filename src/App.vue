<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script>
import MainLayout from "@/layout/MainLayout.vue";

export default {
  name: "app",
  components: {
    MainLayout
  },
};
</script>
<style>
@import '~admin-lte/dist/css/adminlte.min.css';
</style>
