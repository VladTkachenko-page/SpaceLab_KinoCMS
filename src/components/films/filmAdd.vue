<template>
  <div class="banner-card">
    <div class="banner-card__img input__wrapper">
      <input
        name="file"
        type="file"
        :id="'input__file' + this.film.id"
        ref="myFiles"
        @change="previewFiles"
        class="input input__file"
        accept=".jpg, .jpeg, .png"
      />
      <label
        v-if="!this.film.imgSRC"
        :for="'input__file' + this.film.id"
        class="input__file-button"
      >
        <img
          v-if="files.length === 0"
          class="input__file-img"
          src="https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          alt=""
        />
        <img v-if="files.length !== 0" class="input__file-img" :src="src" />
      </label>
    </div>
    <form action="" class="banner-card__form" id="upCardForm">
      <div class="banner-card__form-input">
        <label for="name">Название:</label>
        <input
          type="text"
          name="name"
          placeholder="Название"
          v-model="name"
          @input="pushData"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      src: "",
      name: this.film.name,
    };
  },
  props: ["film"],
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
      let imgValue = {
        id: this.film.id,
        img: this.files[0],
        imgSRC: this.film.imgSRC,
      };
      this.$emit("push-img", imgValue);
      this.src = URL.createObjectURL(this.film.img);
      imgValue.id = this.film.id;
    },
    pushData() {
      let inputValue = {
        id: this.film.id,
        name: this.name,
      };
      this.$emit("push-data", inputValue);
    },
  },
};
</script>