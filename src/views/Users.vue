<template>
  <Loader v-if="loading" />
  <div v-else>
    <h2 class="main__title text-center user__header-title">Пользователи</h2>
    <div class="user__wrap">
      <div class="table-responsive">
        <table class="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата регистрации</th>
              <th>День рождения</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>ФИО</th>
              <th>Псевдоним</th>
              <th>Город</th>
            </tr>
          </thead>
          <tbody>
            <userTable
              v-for="user in this.allUsers"
              :key="user.id"
              :user="user"
              :admin="admin"
              @showModal="showModalDelete"
            />
          </tbody>
        </table>
      </div>
    </div>
    <modal
      :obj="this.userDelete"
      v-if="showModal"
      @close="showModal = false"
      @delete="deleteUser"
    >
      <h3 slot="header">Удаление {{ this.userDelete.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить пользователя {{ this.userDelete.name }}?
      </p>
    </modal>
    <Toast
      :sending="this.sending"
      :text="'Пользователь успешно удален'"
    ></Toast>
  </div>
</template>

<script>
import Toast from "@/components/app/toast.vue";
import Loader from "@/components/app/loader.vue";
import modal from "@/components/app/modal.vue";
import userTable from "@/components/users/userTable.vue";
import { mapGetters } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      loading: true,
      showModal: false,
      sending: false,
      userDelete: {},
      admin: false,
    };
  },
  components: {
    Loader,
    Toast,
    modal,
    userTable,
  },
  methods: {
    showModalDelete(user) {
      this.showModal = true;
      this.userDelete = user;
    },
    async deleteUser(user) {
      this.$store.dispatch("removeUser", user);
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
      this.showModal = false;
      delete this.allUsers[user.uid];
    },
  },
  computed: mapGetters(["allUsers"]),
  async mounted() {
    await this.$store.dispatch("fetchUsers", this.allUsers);
    this.loading = false;
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid === "nUjR1ZIe3xWsNNKuvQaN2FW0JmL2") {
          this.admin = true;
        }
      }
    });
  },
};
</script>

<style scoped></style>
