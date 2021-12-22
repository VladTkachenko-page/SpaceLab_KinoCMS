<template>
  <Loader v-if="loading" />
  <div class="choice-user" v-else>
    <div class="table-responsive">
      <table class="table table-hover text-nowrap">
        <thead>
          <tr>
            <th></th>
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
          <tr v-for="user in this.allUsers" :key="user.id">
            <td>
              <div class="choice-user__checkbox custom-control custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  v-model="choiceUser"
                  :id="user.id"
                  :value="user.id"
                />
                <label
                  :for="user.id"
                  class="custom-control-label choice-user__label"
                ></label>
              </div>
            </td>
            <td>{{ user.id }}</td>
            <td>{{ user.createDate }}</td>
            <td>{{ user.date }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.name + " " + user.surname }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.city }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="choice-user__button">
      <router-link
        v-if="this.$attrs.choiceUsersEmail"
        tag="button"
        :to="{
          name: 'sending',
          params: {
            choiceUsersEmail: this.choiceUser,
            choiceSMS: this.$attrs.choiceSMS,
            choiceSMSUsers: this.$attrs.choiceSMSUsers,
          },
        }"
        class="btn-success"
        >Отправить выбранных</router-link
      >
      <router-link
        v-else
        tag="button"
        :to="{
          name: 'sending',
          params: {
            choiceUsersSMS: this.choiceUser,
            choiceEmail: this.$attrs.choiceEmail,
            choiceEmailUsers: this.$attrs.choiceEmailUsers,
          },
        }"
        class="btn-success"
        >Отправить выбранных</router-link
      >
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      sending: false,
      choiceUser: [],
    };
  },
  components: {
    Loader,
  },
  methods: {},
  computed: mapGetters(["allUsers"]),
  async mounted() {
    await this.$store.dispatch("fetchUsers", this.allUsers);
    this.loading = false;
  },
};
</script>
<style scoped>
.choice-user__button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
