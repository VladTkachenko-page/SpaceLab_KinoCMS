<template>
  <Loader v-if="loading" />
  <div v-else>
    <h2 class="main__title text-center banner__title">На главной верх</h2>
    <BannerCardLayout
      :cardsUp="allUpCards"
      :for="'upCardForm'"
      @send-banner="sendBanner"
      @changeSpeed="changeSpeedUp"
      @change-visible="changeVisibleMain"
      :switchId="1"
      :speed="this.speedUp"
      :bannerStatus="this.statusMain"
      :disabledUp="this.disabledUp"
    >
      <BannerCardUp
        v-for="card in allUpCards"
        :key="card.id"
        :card="card"
        @push-data="pushDataUpCards"
        @push-img="pushImgUpCards"
        @remove-card="removeUpCard"
      >
      </BannerCardUp>
      <button class="btn-success" @click="addBannerCard1">Добавить фото</button>
    </BannerCardLayout>
    <h2 class="main__title text-center banner__title">
      Сквозной банер на заднем фоне
    </h2>
    <div class="back-banner">
      <p class="back-banner__subtitle">Размер: 2000х3000</p>
      <div class="back-banner__wrap">
        <div class="back-banner__radio">
          <input type="radio" value="Фото на фон" v-model="backBannerText" />
          <label>Фото на фон</label>
          <br />
          <input type="radio" value="Просто фон" v-model="backBannerText" />
          <label>Просто фон</label>
          <br />
        </div>
        <setMainImg
          :objMainImg="this.backBanner.imgSRC"
          :id="'back-banner'"
          @remove-main-obj-img="removeBackBannerImg"
          @push-main-obj-img="pushBackBannerImg"
        />
      </div>
    </div>
    <h2 class="main__title text-center banner__title">
      На главной Новости Акции
    </h2>
    <BannerCardLayout
      :cardsDown="allDownCards"
      :switchId="2"
      :for="'newsCardForm'"
      @send-banner="sendBanner"
      @changeSpeed="changeSpeedDown"
      @change-visible="changeVisibleNews"
      :disabledDown="this.disabledDown"
      :bannerStatus="this.statusNews"
      :speed="this.speedDown"
    >
      <BannerCardDown
        v-for="card in allDownCards"
        :key="card.id"
        :card="card"
        @push-data="pushDataDownCards"
        @push-img="pushImgDownCards"
        @remove-card="removeDownCard"
      ></BannerCardDown>
      <button class="btn-success" @click="addBannerCard2">Добавить фото</button>
    </BannerCardLayout>
    <Toast :sending="this.sending" :text="'Данные успешно сохранены'"></Toast>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import Toast from "@/components/app/toast.vue";
import setMainImg from "@/components/edit/setMainImg.vue";
import BannerCardLayout from "@/components/banners/bannerCardLayout.vue";
import BannerCardUp from "@/components/banners/bannerCardUp.vue";
import BannerCardDown from "@/components/banners/bannerCardDown.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: true,
      sending: false,
      deleteMainObj: [],
      deleteNewsObj: [],
      disabledUp: true,
      disabledDown: true,
      backBannerText: "Фото на фон",
    };
  },
  computed: mapGetters([
    "allUpCards",
    "allDownCards",
    "speedUp",
    "speedDown",
    "backBanner",
    "statusNews",
    "statusMain",
  ]),
  components: {
    BannerCardLayout,
    BannerCardUp,
    BannerCardDown,
    Loader,
    Toast,
    setMainImg,
  },
  methods: {
    ...mapMutations(["addBannerCardUp", "addBannerCardDown"]),
    changeSpeedUp() {
      this.disabledUp = false;
    },
    changeVisibleMain() {
      this.disabledUp = false;
    },
    changeSpeedDown() {
      this.disabledDown = false;
    },
    changeVisibleNews() {
      this.disabledDown = false;
    },
    addBannerCard1() {
      this.addBannerCardUp({
        id: new Date().getTime(),
      });
    },
    addBannerCard2() {
      this.addBannerCardDown({
        id: new Date().getTime(),
      });
    },
    removeBanner(arr, delArr, id) {
      let index = arr.findIndex((el) => id === el.id);
      delArr.push(arr.filter((el) => el.id === id)[0]);
      arr.splice(index, 1);
    },
    removeUpCard(id) {
      this.removeBanner(this.allUpCards, this.deleteMainObj, id);
      this.disabledUp = false;
    },
    removeDownCard(id) {
      this.removeBanner(this.allDownCards, this.deleteNewsObj, id);
      this.disabledDown = false;
    },
    pushDataBanner(arr, value) {
      const index = arr.findIndex((el) => value.id === el.id);
      arr[index].url = value.url;
      if (value.text) {
        arr[index].text = value.text;
      }
    },
    pushDataUpCards(value) {
      this.pushDataBanner(this.allUpCards, value);
      this.disabledUp = false;
    },
    pushDataDownCards(value) {
      this.pushDataBanner(this.allDownCards, value);
      this.disabledDown = false;
    },
    pushImgBanner(arr, value) {
      const index = arr.findIndex((el) => value.id === el.id);
      arr[index].img = value.img;
    },
    pushImgUpCards(value) {
      this.pushImgBanner(this.allUpCards, value);
      this.disabledUp = false;
    },
    pushImgDownCards(value) {
      this.pushImgBanner(this.allDownCards, value);
      this.disabledDown = false;
    },
    async pushBackBannerImg(img) {
      this.backBanner.bannerImg = img;
      this.backBanner.imgSRC = URL.createObjectURL(img);
      this.backBanner.backBannerText = this.backBannerText;
      this.backBanner.id = 1637059486200;
      await this.$store.dispatch("pushBackBannerCard", this.backBanner);
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 4000);
    },
    async removeBackBannerImg() {
      this.backBanner.imgSRC =
        "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
      await this.$store.dispatch("removeBackBannerCard", this.backBanner);
    },
    async sendBanner(val) {
      if (val.for === "upCardForm") {
        try {
          await this.$store.dispatch("pushMainBannerCard", {
            banner: this.allUpCards,
            speed: val.speed,
            status: val.status,
          });
          this.disabledUp = true;
          this.sending = true;
          setTimeout(() => {
            this.sending = false;
          }, 4000);
        } catch (e) {
          console.log(e);
        }
        if (this.deleteMainObj.length !== 0) {
          await this.$store.dispatch(
            "removeMainBannerCard",
            this.deleteMainObj
          );
          this.deleteMainObj = [];
        }
      } else if (val.for === "newsCardForm") {
        try {
          await this.$store.dispatch("pushNewsBannerCard", {
            banner: this.allDownCards,
            speed: val.speed,
            status: val.status,
          });
          this.disabledDown = true;
          this.sending = true;
          setTimeout(() => {
            this.sending = false;
          }, 4000);
        } catch (e) {
          console.log(e);
        }
        if (this.deleteNewsObj.length !== 0) {
          await this.$store.dispatch(
            "removeNewsBannerCard",
            this.deleteMainObj
          );
          this.deleteNewsObj = [];
        }
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchUpCards");
    await this.$store.dispatch("fetchSpeedUp", this.speedUp);
    await this.$store.dispatch("fetchSpeedDown", this.speedDown);
    await this.$store.dispatch("fetchDownCards");
    await this.$store.dispatch("fetchBackBanner");
    await this.$store.dispatch("fetchBackBanner");
    if (this.backBanner.backBannerText) {
      this.backBannerText = this.backBanner.backBannerText;
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.back-banner {
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
.back-banner__wrap {
  display: flex;
  align-items: center;
}
</style>
