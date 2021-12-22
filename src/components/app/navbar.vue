<template>
  <div>
    <nav class="main-header navbar navbar-expand navbar-light navbar-white">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <span class="brand-text font-weight-light">KinoCMS</span>
        </router-link>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <p>Мой кабинет</p>
            </a>
          </li>
          <li class="nav-item logout" @click.prevent="logout">
            <i class="fas fa-power-off"></i>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
}
</script>
<style scoped>
.navbar {
  margin-left: 0 !important;
}
.logout {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
