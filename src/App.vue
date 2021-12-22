<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import MainLayout from "@/layout/MainLayout.vue";
import EmptyLayout from "@/layout/EmptyLayout";
import MainSiteLayout from "@/layout/MainSiteLayout.vue";
import SiteLayout from "@/layout/SiteLayout.vue";

export default {
  name: "app",
  components: {
    MainLayout,
    EmptyLayout,
    MainSiteLayout,
    SiteLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
};
</script>
<style>
@import "~admin-lte/dist/css/adminlte.min.css";
</style>
