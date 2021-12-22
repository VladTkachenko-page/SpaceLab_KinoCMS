<template>
  <div>
    <router-link
      class="films-card"
      tag="div"
      :to="{
        name: 'filmsEditRu',
        params: { id: this.film.id, comming: this.film.comming },
      }"
    >
      <div class="films-card__img">
        <div v-if="this.films.length > 1" class="film-card__delete">
          <button @click.prevent="showModal = true" class="film-card__delete-btn">
            &times;
          </button>
        </div>
        <img
          v-if="!this.film.imgSRC"
          src="https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          alt=""
        />
        <img v-else :src="this.film.imgSRC" alt="" />
      </div>
      <p>{{ this.film.name }}</p>
    </router-link>
    <modal
      :obj="this.film"
      v-if="showModal"
      @close="showModal = false"
      @delete="filmDelete"
    >
      <h3 slot="header">Удаление {{ this.film.name }}</h3>
      <p slot="body">
        Вы уверены что хотите удалить фильм {{ this.film.name }}?
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
    };
  },
  props: ["film", "films"],
  components: {
    modal,
  },
  methods: {
    filmDelete(film) {
      this.$emit("delete", film);
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.film-card__delete {
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
.film-card__delete-btn {
  border: none;
  background: transparent;
  color: red;
  font-size: 24px;
  margin-bottom: 5px;
}
.films-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  max-width: 250px;
  cursor: pointer;
  position: relative;
}
.films-card__img {
  position: relative;
}
.films-card__img img {
  width: 200px;
}
</style>
