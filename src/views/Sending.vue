<template>
  <Loader v-if="loading" />
  <div v-else class="send">
    <div class="send-sms">
      <h2 class="main__title text-center send-sms__title">SMS</h2>
      <div class="send-sms__user-button">
        <strong>Выбрать пользователей кому слать</strong>
        <div class="send-sms__checkbox">
          <input
            type="radio"
            id="allUser"
            value="allUser"
            v-model="userSMS"
            @change="addUsers"
          />
          <label for="allUser" class="send-sms__checkbox_label"
            >Все пользователи</label
          >
        </div>
        <div class="send-sms__checkbox">
          <input
            type="radio"
            value="choiceUser"
            id="choiceUser"
            v-model="userSMS"
            @change="addUsers"
          />
          <label for="choiceUser" class="send-sms__checkbox_label"
            >Выборочно</label
          >
        </div>
        <router-link
          v-if="this.userSMS === 'choiceUser'"
          :to="{
            name: 'choiceUser',
            params: {
              choiceEmail: this.userEmail,
              choiceEmailUsers: this.usersEmail,
            },
          }"
          tag="button"
          class="send-sms__choice-user btn-success"
        >
          Выбрать пользователей
        </router-link>
      </div>
      <span>{{ "Выбрано:" + " " + this.usersSMS.length }}</span>
      <div class="send-sms__input">
        <label class="send-sms__input_label" for="send-sms__input"
          >Текст SMS</label
        >
        <span></span>
        <div class="send-sms__input_wrap">
          <textarea
            class="send-sms__input_textarea"
            id="send-sms__input"
            v-model="inputSMS"
            placeholder="Введите текст"
          ></textarea>
        </div>
      </div>
      <div class="send-sms__button">
        <button class="btn-success" @click="sendSMS">Начать рассылку</button>
      </div>
    </div>
    <div class="send-email">
      <h2 class="main__title text-center send-email__title">E-mail</h2>
      <div class="send-email__user-button">
        <strong>Выбрать пользователей кому слать</strong>
        <div class="send-email__checkbox">
          <input
            type="radio"
            id="allUserEmail"
            value="allUser"
            v-model="userEmail"
            @change="addUsersEmail"
          />
          <label for="allUserEmail" class="send-email__checkbox_label"
            >Все пользователи</label
          >
        </div>
        <div class="send-email__checkbox">
          <input
            type="radio"
            value="choiceUser"
            id="choiceUserEmail"
            v-model="userEmail"
            @change="addUsersEmail"
          />
          <label for="choiceUserEmail" class="send-email__checkbox_label"
            >Выборочно</label
          >
        </div>
        <router-link
          v-if="this.userEmail === 'choiceUser'"
          :to="{
            name: 'choiceUser',
            params: {
              choiceUsersEmail: true,
              choiceSMS: this.userSMS,
              choiceSMSUsers: this.usersSMS,
            },
          }"
          tag="button"
          class="send-email__choice-user btn-success"
        >
          Выбрать пользователей
        </router-link>
      </div>
      <span>{{ "Выбрано:" + " " + this.usersEmail.length }}</span>
      <br />
      <br />
      <div class="send-email__template">
        <div class="send-email__template_file">
          <div class="file-upload">
            <strong>Загрузить HTML-письмо </strong>
            <label>
              <input
                type="file"
                name="file"
                @change="sendHTML"
                accept=".html"
                ref="myFiles"
              />
            </label>
          </div>
          <strong
            >Шаблон используемый в текущей рассылке:
            <span v-for="name in this.checkedType" :key="name.id">{{
              name.name + ", "
            }}</span>
          </strong>
        </div>
        <div class="send-email__template_list">
          <div class="send-email__template_header">
            <h5>Список последних загруженных шаблонов</h5>
          </div>
          <div
            class="send-email__checkbox custom-control custom-checkbox"
            v-for="template in allTemplates"
            :key="template.id"
          >
            <input
              class="custom-control-input"
              type="checkbox"
              v-model="checkedType"
              :id="template.id"
              :value="{ name: template.name, fileSRC: template.fileSRC }"
              @change="addTemplate"
            />
            <label :for="template.id" class="custom-control-label">{{
              template.name
            }}</label>
            <a
              href="#"
              class="send-email__checkbox-delete"
              @click.prevent="showModalDelete(template)"
              >Удалить</a
            >
          </div>
        </div>
      </div>
      <div class="send-email__button">
        <button class="btn-success" @click="sendEmail">Начать рассылку</button>
      </div>
    </div>
    <modal
      :obj="this.templateDelete"
      v-if="showModal"
      @close="showModal = false"
      @delete="deleteTemplate"
    >
      <h3 slot="header">Удаление {{ this.templateDelete.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить новость {{ this.templateDelete.name }}?
      </p>
    </modal>
    <Toast :sending="this.sending" :text="'Данные успешно сохранены'"></Toast>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Toast from "@/components/app/toast.vue";
import modal from "@/components/app/modal.vue";
import Loader from "@/components/app/loader.vue";

export default {
  data() {
    return {
      sending: false,
      showModal: false,
      loading: true,
      userSMS: "allUser",
      userEmail: "allUser",
      usersSMS: [],
      usersEmail: [],
      files: [],
      inputSMS: "",
      checkedType: [],
      templates: [],
    };
  },
  components: {
    Toast,
    Loader,
    modal,
  },
  methods: {
    addUsers() {
      if (this.userSMS === "choiceUser") {
        this.usersSMS = [];
      } else {
        this.usersSMS = [];
        for (let key in this.allUsers) {
          this.usersSMS.push(this.allUsers[key].id);
        }
      }
    },

    addTemplate(template) {
      if (template.target.checked) {
        this.templates.push(template.target._value);
      } else {
        let index = this.templates.findIndex(
          (el) => template.target._value.id === el.id
        );
        this.templates.splice(index, 1);
      }
    },

    addUsersEmail() {
      if (this.userEmail === "choiceUser") {
        this.usersEmail = [];
      } else {
        this.usersEmail = [];
        for (let key in this.allUsers) {
          this.usersEmail.push(this.allUsers[key].id);
        }
      }
    },

    async sendSMS() {
      const data = {
        users: this.usersSMS,
        textSMS: this.inputSMS,
      };
      await this.$store.dispatch("sendSMS", data);
      this.inputSMS = "";
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 3000);
    },

    async sendEmail() {
      const data = {
        users: this.usersEmail,
        templates: this.templates,
      };
      await this.$store.dispatch("sendEmail", data);
      this.checkedType = [];
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 3000);
    },

    async sendHTML() {
      this.files = this.$refs.myFiles.files;
      const fileData = {
        file: this.files[0],
        name: this.files[0].name.substring(0, this.files[0].name.indexOf(".")),
        id: new Date().getTime(),
      };
      await this.$store.dispatch("sendHTMLTemplate", fileData);
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
    },
    showModalDelete(template) {
      this.showModal = true;
      this.templateDelete = template;
    },
    async deleteTemplate(template) {
      let templates = this.allTemplates.filter((el) => template.id !== el.id);
      await this.$store.dispatch("removeTemplate", { templates, template });
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
      this.showModal = false;
      let index = this.allTemplates.findIndex((el) => template.id === el.id);
      this.allTemplates.splice(index, 1);
    },
  },

  computed: mapGetters(["allUsers", "allTemplates"]),

  async mounted() {
    await this.$store.dispatch("fetchUsers", this.allUsers);
    await this.$store.dispatch("fetchTemplate");
    this.loading = false;

    if (this.userSMS === "allUser") {
      for (let key in this.allUsers) {
        this.usersSMS.push(this.allUsers[key].id);
      }
    }
    if (this.userEmail === "allUser") {
      for (let key in this.allUsers) {
        this.usersEmail.push(this.allUsers[key].id);
      }
    }
    if (this.$attrs.choiceSMS === "choiceUser") {
      this.userSMS = "choiceUser";
      this.usersSMS = this.$attrs.choiceSMSUsers;
    }
    if (this.$attrs.choiceEmail === "choiceUser") {
      this.userEmail = "choiceUser";
      this.usersEmail = this.$attrs.choiceEmailUsers;
    }
    if (this.$attrs.choiceUsersSMS) {
      this.userSMS = "choiceUser";
      this.usersSMS = this.$attrs.choiceUsersSMS;
    }
    if (this.$attrs.choiceUsersEmail) {
      this.userEmail = "choiceUser";
      this.usersEmail = this.$attrs.choiceUsersEmail;
    }
  },
};
</script>

<style scoped>
.send {
  padding: 20px;
}
.send-sms,
.send-email,
.send-email__template_list {
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
.send-sms__user-button,
.send-email__user-button {
  display: flex;
}
.send-sms__checkbox,
.send-email__checkbox {
  margin-left: 20px;
}
.send-sms__checkbox_label,
.send-email__checkbox_label {
  margin-left: 5px;
}
.send-sms__choice-user,
.send-email__choice-user {
  border-radius: 10px;
  margin-left: 20px;
}
.send-sms__input_textarea {
  resize: none;
  width: 500px;
  height: 200px;
  margin-bottom: 20px;
}
.send-sms__button,
.send-email__button {
  display: flex;
  justify-content: center;
}
.send-email__template_file {
  margin-right: 20px;
}
.send-email__template {
  display: flex;
}
.send-email__checkbox-delete {
  color: red;
  margin-left: 15px;
  text-decoration-line: underline;
}
</style>
