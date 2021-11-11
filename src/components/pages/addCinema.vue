<template>
  <div class="contacts__cinema">
    <setName
      v-if="this.lang === 'ru'"
      :objName="this.cinema.name"
      :name="'Название кинотеатра'"
      @push-data="pushName"
    />
    <setName
      v-else
      :key="2"
      :objName="this.cinema.nameUa"
      :name="'Назва кінотеатру'"
      @push-data="pushNameUa"
    />
    <setDescription
      v-if="this.lang === 'ru'"
      :objDescription="this.cinema.address"
      :description="'Адресс'"
      @push-data="pushAddress"
    />
    <setDescription
      v-else
      :key="3"
      :objDescription="this.cinema.addressUa"
      :description="'Адреса'"
      @push-data="pushAddressUa"
    />
    <setName
      :objName="this.cinema.mapCoor"
      :name="'Координаты для карты'"
      @push-data="pushMap"
    />
    <setMainImg
      :objMainImgText="'Лого'"
      :objMainImg="this.cinema.imgSRC"
      :id="'mainImg'+this.cinema.id"
      @remove-main-obj-img="removePageImg"
      @push-main-obj-img="pushPageImg"
    />
  </div>
</template>

<script>
import setName from "@/components/edit/setName.vue";
import setDescription from "@/components/edit/setDescription.vue";
import setMainImg from "@/components/edit/setMainImg.vue";

export default {
  data() {
    return {
    }
  },
  components: {
    setName,
    setDescription,
    setMainImg,
  },
  props:["cinema", "lang"],
  methods: {
    pushName(name) {
      let inputValue = {
        id: this.cinema.id,
        name: name
      }
      this.$emit("push-name", inputValue);
    },
    pushNameUa(name) {
      let inputValue = {
        id: this.cinema.id,
        name: name
      }
      this.$emit("push-name-ua", inputValue);
    },
    pushAddress(address) {
      let inputValue = {
        id: this.cinema.id,
        address: address
      }
      this.$emit("push-address", inputValue);
    },
    pushAddressUa(address) {
      let inputValue = {
        id: this.cinema.id,
        address: address
      }
      this.$emit("push-address-ua", inputValue);
    },
    pushMap(mapCoor) {
      let inputValue = {
        id: this.cinema.id,
        mapCoor: mapCoor
      }
      this.$emit("push-map", inputValue);
    },
    removePageImg() {
      this.$emit("remove-page-img");
    },
    pushPageImg(img) {
      let imgValue = {
        id: this.cinema.id,
        img: img,
        imgSRC: URL.createObjectURL(img)
      };
      this.$emit("push-page-img", imgValue);
    },
  },
}
</script>

<style scoped>
.contacts__cinema {
  width: 100%;
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>