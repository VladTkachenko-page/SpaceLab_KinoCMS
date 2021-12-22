<template>
  <div>
    <router-link
      class="cinemas-card"
      tag="div"
      :to="{ name: 'cinemaEditRu', params: { id: this.cinema.id, lang: 'ru' } }"
    >
      <div v-if="this.cinemas.length > 1" class="cinema-card__delete">
        <button
          @click.prevent="showModal = true"
          class="cinema-card__delete-btn"
        >
          &times;
        </button>
      </div>
      <div class="cinemas-card__img">
        <img
          v-if="!this.cinema.imgLogoSRC"
          src="https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          alt=""
        />
        <img v-else :src="this.cinema.imgLogoSRC" alt="" />
      </div>
      <p>{{ this.cinema.name }}</p>
    </router-link>
    <modal
      :obj="this.cinema"
      v-if="showModal"
      @close="showModal = false"
      @delete="cinemaDelete"
    >
      <h3 slot="header">Удаление {{ this.cinema.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить кинотеатр {{ this.cinema.name }}?
      </p>
    </modal>
  </div>
</template>

<script>
import modal from "@/components/app/modal.vue";

export default {
  data() {
    return {
      showModal: false,
    }
  },
  props: ["cinema", "cinemas"],
  components: {
    modal
  },
  methods: {
    cinemaDelete(cinema) {
      this.$emit("delete", cinema);
      this.showModal = false;
    },
  },
}
</script>

<style scoped>
.cinemas-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  max-width: 250px;
  cursor: pointer;
  position: relative;
}
.cinemas-card__img img {
  width: 200px;
}
.cinema-card__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;
  right: -20px;
  top: -10px;
}
.cinema-card__delete-btn {
  border: none;
  background: transparent;
  color: red;
  font-size: 24px;
  margin-bottom: 5px;
}
</style>