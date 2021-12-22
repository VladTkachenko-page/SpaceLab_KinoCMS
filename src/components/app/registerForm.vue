<template>
  <form class="register-form" @submit.prevent="submitHandler">
    <div class="input-wrap">
      <div class="input-wrap__left">
        <div class="input-group mb-3">
          <label class="input-group__label" for="name">Имя</label>
          <input
            id="name"
            v-model.trim="name"
            type="text"
            class="form-control"
            placeholder="Имя"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="surname">Фамилия</label>
          <input
            id="surname"
            v-model.trim="surname"
            type="text"
            class="form-control"
            placeholder="Фамилия"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="nickname">Псевдоним</label>
          <input
            id="nickname"
            v-model.trim="nickname"
            type="text"
            class="form-control"
            placeholder="Псевдоним"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="email">E-mail</label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
            class="form-control"
            placeholder="E-mail"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="adress">Адресс</label>
          <input
            id="adress"
            v-model.trim="address"
            type="text"
            class="form-control"
            placeholder="Адресс"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-address-book"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="password">Пароль</label>
          <input
            id="password"
            v-model.trim="password"
            type="password"
            class="form-control"
            placeholder="Пароль"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="card">Номер карты</label>
          <input
            id="card"
            v-model.trim="card"
            type="number"
            class="form-control"
            placeholder="Номер карты"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-credit-card"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="input-wrap__right">
        <div class="input-group input-group-radio mb-3">
          <label class="input-group__label" for="name">Язык</label>
          <input type="radio" value="ru" v-model="lang" />
          <span class="input-group-radio__label">Русский</span>
          <br />
          <input type="radio" value="ua" v-model="lang" />
          <span class="input-group-radio__label">Украинский</span>
          <br />
        </div>
        <div class="input-group input-group-radio mb-3">
          <label class="input-group__label" for="name">Пол</label>
          <input type="radio" value="Мужской" v-model="sex" />
          <span class="input-group-radio__label">Мужской</span>
          <br />
          <input type="radio" value="Женский" v-model="sex" />
          <span class="input-group-radio__label">Женский</span>
          <br />
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="phone">Телефон</label>
          <input
            id="phone"
            v-model.trim="phone"
            type="text"
            class="form-control"
            placeholder="Телефон"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-phone"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="date">Дата рождения</label>
          <input
            class="input-group__input"
            type="date"
            id="date"
            v-model="date"
          />
        </div>
        <div class="input-group mb-3">
          <label for="city" class="input-group__label">Город</label>
          <select name="city" id="city" v-model="city" required>
            <option value="default">Выберите город</option>
            <option value="Киев">Киев</option>
            <option value="Львов">Львов</option>
            <option value="Харьков">Харьков</option>
            <option value="Чернигов">Чернигов</option>
            <option value="Одесса">Одесса</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <label class="input-group__label" for="password2"
            >Повторить пароль</label
          >
          <input
            id="password2"
            v-model="password2"
            type="password"
            class="form-control"
            placeholder="Повторите пароль"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2 d-flex justify-content-center">
      <div class="col-4">
        <button v-if="text" type="submit" class="btn btn-primary btn-block">
          {{ this.text }}
        </button>
        <button v-else type="submit" class="btn btn-primary btn-block">
          Зарегистрироваться
        </button>
      </div>
      <!-- /.col -->
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      nickname: "",
      email: "",
      card: "",
      password: "",
      password2: "",
      address: "",
      phone: "",
      lang: "ru",
      sex: "Мужской",
      date: "",
      city: "default",
      createDate: `${new Date().getDate()}.${
        new Date().getMonth() + 1
      }.${new Date().getFullYear()}`,
    };
  },
  methods: {
    async submitHandler() {
      if (!this.user) {
        const formData = {
          name: this.name,
          surname: this.surname,
          nickname: this.nickname,
          email: this.email,
          card: this.card,
          address: this.address,
          lang: this.lang,
          sex: this.sex,
          date: this.date,
          phone: this.phone,
          city: this.city,
          password: this.password,
          password2: this.password2,
          createDate: this.createDate,
          id: new Date().getTime(),
        };
        if (this.password !== this.password2) {
          alert("Пароли не совпадают")
        } else {
          this.$emit("send-form", formData);
        }
      } else {
        const formData = {
          name: this.name,
          surname: this.surname,
          nickname: this.nickname,
          email: this.email,
          card: this.card,
          address: this.address,
          lang: this.lang,
          sex: this.sex,
          date: this.date,
          phone: this.phone,
          city: this.city,
          password: this.password,
          password2: this.password2,
          createDate: this.user.createDate,
          id: this.user.id,
          uid: this.user.uid,
        };
        if (this.password !== this.password2) {
          alert("Пароли не совпадают")
        } else {
          this.$emit("send-form", formData);
        }
      }
    },
  },
  props: ["user", "text"],
  mounted() {
    if (this.user) {
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.nickname = this.user.nickname;
      this.email = this.user.email;
      this.card = this.user.card;
      this.address = this.user.address;
      this.lang = this.user.lang;
      this.sex = this.user.sex;
      this.date = this.user.date;
      this.phone = this.user.phone;
      this.city = this.user.city;
      this.createDate = this.user.createDate;
      this.password = this.user.password;
      this.password2 = this.user.password2;
      this.uid = this.user.uid;
      this.id = this.user.id;
    }
  },
};
</script>

<style scoped>
.input-group {
  height: 38px;
}
.input-group__label {
  align-self: center;
  margin-bottom: 0;
  margin-right: 10px;
}
.input-group-radio {
  align-items: center;
}
.input-group-radio__label {
  margin-left: 5px;
  margin-right: 10px;
}
.input-wrap {
  display: flex;
  justify-content: center;
}
.input-wrap__left {
  margin-right: 50px;
}
</style>
