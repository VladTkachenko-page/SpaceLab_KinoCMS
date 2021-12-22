<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <span><b>Kino</b>CMS</span>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Войти</p>
          <form @submit.prevent="submitHandler">
            <div class="input-group mb-3">
              <input
                id="email"
                v-model.trim="email"
                type="email"
                class="form-control"
                placeholder="Email"
              />

              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                id="password"
                v-model.trim="password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block ">
                  Войти
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
          <p class="mb-0">
            <span>Нет аккаунта? </span>
            <router-link to="/register">Зарегистрироваться</router-link>
          </p>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async submitHandler() {
      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push('/')
      } catch (e) {
        const eMessage = e.message;
        alert(eMessage);
      }
    },
  },
};
</script>
