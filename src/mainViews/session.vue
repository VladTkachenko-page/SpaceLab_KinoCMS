<template>
  <Loader v-if="loading" />
  <div v-else class="session">
    <img
      class="session__img"
      src="https://storage.moqups.com/repo/Zc5eWEcF/images/7we9Hf6d.jpg"
      alt=""
    />
    <div class="session__wrap">
      <img class="session__film-img" :src="this.session1.filmImg" alt="" />
      <div class="session__info">
        <div class="session__film_name">
          <span>{{ this.session1.filmName }}</span>
        </div>
        <div class="session__info_date">
          {{
            this.session1.day +
            ", " +
            this.session1.time +
            ", " +
            this.session1.hallName
          }}
        </div>
        <div class="session__info_top">
          <div class="session__info_price">
            Цена в грн:
            <span class="session__info_price-yellow">{{
              this.session1.price
            }}</span>
          </div>
          <div class="session__info_ordered">
            ЗАБРОНИРОВАНО:
            <div class="session__info_ordered-grey"></div>
          </div>
          <div class="session__info_session">
            Ваш заказ:
            <span class="session__info_session-span">
              Билетов:
              <span class="session__info_session-red">{{ this.count }}</span>
              &nbsp; &nbsp; &nbsp; Сумма
              <span class="session__info_session-red">{{
                this.count * this.session1.price + " грн."
              }}</span>
            </span>
          </div>
        </div>
        <div class="session__table">
          <div class="session__table-screen">ЭКРАН</div>
          <div class="session__table-items">
            <div class="session__row" v-for="row in this.hall" :key="row.id">
              <div class="session__seats-row">Ряд {{ row.id }}</div>
              <div class="session__seats">
                <div
                  class="session__col"
                  v-for="seat in row.seats"
                  :key="seat.num + '-' + row.id"
                  :class="{
                    selected: seat.selected,
                    ordered: seat.available,
                  }"
                  @click="selectSeat(row.id, seat.num)"
                >
                  {{ seat.num }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="session__info-text">
          <span>Строимость бронирования - 3 грн. за каждое место</span>
        </div>
        <div class="session__info-text">
          <span
            >ЗАБРОНИРОВАННЫЕ БИЛЕТЫ НУЖНО ВЫКУПИТЬ В КАССЕ НЕ РАНЬШЕ ЧЕМ ЗА
            ПОЛЧАСА ДО НАЧАЛА СЕАНСА</span
          >
        </div>
        <div class="session__info-btns">
          <button class="session__info-btn btn-light" @click="reservedTickets">
            ЗАБРОНИРОВАТЬ</button
          ><button class="session__info-btn btn-success" @click="buyTickets">
            КУПИТЬ
          </button>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false" @delete="sendHall">
      <h3 v-if="this.buy" slot="header">Покупка билетов</h3>
      <h3 v-else slot="header">Бронирование билетов</h3>
      <p v-if="this.buy" slot="body">
        Вы подтверждаете покупку билетов на сумму
        {{ this.count * this.session1.price + " грн." }}?
      </p>
      <p v-else slot="body">Вы подтверждаете бронирование билетов?</p>
    </modal>
    <Toast
      v-if="this.buy"
      :sending="this.sending"
      :text="'Билеты успешно куплены'"
    ></Toast>
    <Toast
      v-else
      :sending="this.sending"
      :text="'Билеты успешно забронированы'"
    ></Toast>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Toast from "@/components/app/toast.vue";
import Loader from "@/components/app/loader.vue";
import modal from "@/components/app/modal.vue";

export default {
  data() {
    return {
      hall: [
        {
          id: 1,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
          ],
        },
        {
          id: 2,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
            { num: "14", available: false, selected: false },
          ],
        },
        {
          id: 3,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
            { num: "14", available: false, selected: false },
            { num: "15", available: false, selected: false },
          ],
        },
        {
          id: 4,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
          ],
        },
        {
          id: 5,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
          ],
        },
        {
          id: 6,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
          ],
        },
        {
          id: 7,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
          ],
        },
        {
          id: 8,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
          ],
        },
        {
          id: 9,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
          ],
        },
        {
          id: 10,
          seats: [
            { num: "1", available: false, selected: false },
            { num: "2", available: false, selected: false },
            { num: "3", available: false, selected: false },
            { num: "4", available: false, selected: false },
            { num: "5", available: false, selected: false },
            { num: "6", available: false, selected: false },
            { num: "7", available: false, selected: false },
            { num: "8", available: false, selected: false },
            { num: "9", available: false, selected: false },
            { num: "10", available: false, selected: false },
            { num: "11", available: false, selected: false },
            { num: "12", available: false, selected: false },
            { num: "13", available: false, selected: false },
            { num: "14", available: false, selected: false },
            { num: "15", available: false, selected: false },
            { num: "16", available: false, selected: false },
            { num: "17", available: false, selected: false },
            { num: "18", available: false, selected: false },
            { num: "19", available: false, selected: false },
            { num: "20", available: false, selected: false },
          ],
        },
      ],
      count: 0,
      session1: this.session,
      loading: true,
      buy: false,
      sending: false,
      showModal: false,
    };
  },

  props: ["session"],
  components: {
    Loader,
    Toast,
    modal,
  },
  methods: {
    selectSeat(row, seat) {
      if (!this.hall[row - 1].seats[seat - 1].available) {
        this.hall[row - 1].seats[seat - 1].selected =
          !this.hall[row - 1].seats[seat - 1].selected;
        if (this.hall[row - 1].seats[seat - 1].selected === true) {
          this.count++;
        } else {
          this.count--;
        }
      }
    },
    reservedTickets() {
      if (this.count === 0) {
        alert("Выберите место");
      } else {
        this.showModal = true;
        this.buy = false;
      }
    },
    buyTickets() {
      if (this.count === 0) {
        alert("Выберите место");
      } else {
        this.showModal = true;
        this.buy = true;
      }
    },
    async sendHall() {
      this.hall.forEach((item) => {
        let buy = item.seats.filter((seat) => seat.selected === true);
        if (buy.length !== 0) {
          buy.forEach((item) => {
            item.available = true;
          });
        }
      });
      this.session1["hall"] = this.hall;
      try {
        this.showModal = false;
        await this.$store.dispatch("sendTickets", this.session1);
        this.sending = true;
        this.count = 0;
        setTimeout(() => {
          this.sending = false;
        }, 5000);
      } catch (e) {
        console.log(e);
      }
    },
  },

  computed: mapGetters(["allTimetable"]),

  async mounted() {
    await this.$store.dispatch("fetchTimetable");
    if (!this.session1) {
      this.allTimetable.forEach((item) => {
        if (item.sessions.filter((item) => item.id === +this.$attrs.id)[0]) {
          this.session1 = item.sessions.filter(
            (item) => item.id === +this.$attrs.id
          )[0];
        }
      });
    }
    if (this.session1.hall) {
      this.hall = this.session1.hall;
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.session__wrap {
  display: flex;
  margin-top: 20px;
  padding: 0 0 0 50px;
}
.session__img {
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
}
.session__wrap img {
  width: 220px;
  height: 350px;
  margin-right: 20px;
}
.session__film_name {
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 30px;
  text-transform: uppercase;
  color: #fff;
  background-color: #bf4428;
  padding: 2px 10px;
  position: relative;
}
.session__film_name::after {
  content: "";
  position: absolute;
  left: -5px;
  bottom: -15px;
  z-index: -1;
  width: 50px;
  border: 15px solid transparent;
  border-top: 0px solid #f9c835;
  border-right: 45px solid #f9c835;
}
.session__info_date {
  color: #666666;
  text-transform: uppercase;
}
.session__info_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: 30px;
}
.session__info_price {
  text-transform: uppercase;
}
.session__info_price-yellow {
  color: #fff;
  font-weight: 700;
  padding: 5px 5px;
  background-color: #f9c835;
}
.session__info_session {
  text-transform: uppercase;
}
.session__info_ordered {
  display: flex;
  align-items: center;
}
.session__info_ordered-grey {
  margin-left: 10px;
  width: 30px;
  height: 30px;
  background-color: #ccc;
}
.session__info_session-span {
  border: 3px solid #f9c835;
  padding: 5px 20px;
}
.session__info_session-red {
  color: #af3724;
  text-transform: lowercase;
}
.session__table-screen {
  color: #0a0a0a;
  text-align: center;
  background-image: url("https://cinemaciti.ua/app/images/icons/arc.svg");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  display: block;
  position: relative;
  margin: 0 auto;
  font-weight: 400;
  width: 80%;
  height: 45px;
  font-size: 16px;
  margin-top: 48px;
  margin-bottom: 20px;
  padding-top: 30px;
}
.session__row {
  display: flex;
  justify-content: flex-start;
}
.session__seats {
  display: flex;
  justify-content: center;
  width: 90%;
}
.session__seats-row {
  font-weight: 700;
}
.session__col {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: 1px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 1px;
  padding-right: 4px;
  cursor: pointer;
  color: #fff;
  background-color: #ee8033;
}
.session__info-text {
  margin-top: 20px;
  font-size: 14px;
}
.session__info-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.session__info-btn {
  border-radius: 5px;
  width: 150px;
}
.session__info-btn:first-child {
  background-color: transparent;
  margin-right: 20px;
}
.selected {
  background-color: red;
}
.ordered {
  background-color: #ccc;
  cursor: unset;
}
</style>
