<template>
  <div class="">
    <MainHeader />
    <router-view />
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from "@/components/mainApp/MainHeader.vue";
import MainFooter from "@/components/mainApp/MainFooter.vue";

export default {
  name: "Site",
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>
<style scoped>
</style>
