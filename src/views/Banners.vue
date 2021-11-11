<template>
  <div>
    <h2 class="main__title text-center banner__title">На главной верх</h2>
    <Loader v-if="loading" />
    <BannerCardLayout
      :cardsUp="allUpCards"
      :for="'upCardForm'"
      @send-banner="sendBanner"
      @changeSpeed="changeSpeedUp"
      :speed="this.speedUp"
      :disabledUp="this.disabledUp"
      v-else
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
      <button
        v-if="this.allUpCards.length !== 5"
        class="btn-success"
        @click="addBannerCard1"
      >
        Добавить фото
      </button>
    </BannerCardLayout>
    <h2 class="main__title text-center banner__title">
      На главной Новости Акции
    </h2>
    <Loader v-if="loading" />
    <BannerCardLayout
      :cardsDown="allDownCards"
      :for="'newsCardForm'"
      @send-banner="sendBanner"
      @changeSpeed="changeSpeedDown"
      :disabledDown="this.disabledDown"
      :speed="this.speedDown"
      v-else
    >
      <BannerCardDown
        v-for="card in allDownCards"
        :key="card.id"
        :card="card"
        @push-data="pushDataDownCards"
        @push-img="pushImgDownCards"
        @remove-card="removeDownCard"
      ></BannerCardDown>
      <button
        v-if="this.allDownCards.length !== 5"
        class="btn-success"
        @click="addBannerCard2"
      >
        Добавить фото
      </button>
    </BannerCardLayout>
    <Toast :sending="this.sending" :text="'Данные успешно сохранены'"></Toast>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import Toast from "@/components/app/toast.vue";
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
    };
  },
  computed: mapGetters(["allUpCards", "allDownCards", "speedUp", "speedDown"]),
  components: {
    BannerCardLayout,
    BannerCardUp,
    BannerCardDown,
    Loader,
    Toast,
  },
  methods: {
    ...mapMutations(["addBannerCardUp", "addBannerCardDown"]),
    changeSpeedUp() {
      this.disabledUp = false;
    },
    changeSpeedDown() {
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
    async sendBanner(val) {
      if (val.for === "upCardForm") {
        try {
          await this.$store.dispatch("pushMainBannerCard", {
            banner: this.allUpCards,
            speed: val.speed,
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
    this.loading = false;
  },
};
</script>

<style scoped></style>
