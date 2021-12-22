<template>
  <Loader v-if="loading" />
  <div v-else class="user-edit">
    <RegisterForm :text="'Сохранить'" :user="this.user" @send-form="sendUser" />
  </div>
</template>
<script>
import RegisterForm from "@/components/app/registerForm.vue";
import Loader from "@/components/app/loader.vue";

export default {
  data() {
    return {
      loading: true,
      user: {},
    };
  },
  components: {
    RegisterForm,
    Loader,
  },
  methods: {
    async sendUser(user){
      await this.$store.dispatch("sendUser", user);
      this.$router.push("/users");
    } 
  },
  async mounted(){
    await this.$store.dispatch("fetchUsers", this.allUsers);
    const oneUser = await this.$store.getters.oneUser(this.$attrs.id);
    this.user = oneUser;
    this.loading = false;
  }
};
</script>
<style scoped>
.user-edit {
  padding: 20px;
}
</style>