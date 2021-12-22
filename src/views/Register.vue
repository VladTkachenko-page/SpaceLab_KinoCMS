<template>
  <div class="register-page">
    <div class="register-box">
      <div class="register-logo">
        <span><b>Kino</b>CMS</span>
      </div>

      <div class="card">
        <div class="card-body register-card-body">
          <p class="login-box-msg">Зарегистрироваться</p>
          <RegisterForm @send-form="register"></RegisterForm>
          <router-link to="/login">У меня есть аккаунт</router-link>
        </div>
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/app/registerForm.vue";

export default {
  components: {
    RegisterForm,
  },
  methods: {
    async register(formData) {
      try {
        await this.$store.dispatch("register", formData);
        alert("Вы успешно зарегистрировались");
        this.$router.push("/");
      } catch (e) {
        const eMessage = e.message;
        alert(eMessage);
      }
    },
  },
};
</script>

<style scoped>
.register-box {
  width: auto;
}
</style>
