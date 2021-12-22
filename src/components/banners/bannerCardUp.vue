<template>
  <div class="banner-card">
    <div class="banner-card__delete">
      <button @click="removeCard" class="banner-card__delete-btn">&times;</button>
    </div>
    <div class="banner-card__img input__wrapper">
      <input
        name="file"
        type="file"
        :id="'input__file' + this.card.id"
        ref="myFiles"
        @change="previewFiles"
        class="input input__file"
        accept=".jpg, .jpeg, .png"
      />
      <label v-if="this.card.imgSRC" :for="'input__file' + this.card.id" class="input__file-button">
        <img v-if="files.length === 0" class="input__file-img" :src="this.card.imgSRC" />
        <img v-if="files.length !== 0" class="input__file-img" :src="src" />
      </label>
      <label v-if="!this.card.imgSRC" :for="'input__file' + this.card.id" class="input__file-button">
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
        <label for="url">URL:</label>
        <input
          type="text"
          name="url"
          placeholder="URL"
          v-model="url"
          @input="pushData"
        />
      </div>
      <div class="banner-card__form-input">
        <label for="text">Текст:</label>
        <input
          type="text"
          name="text"
          placeholder="Текст"
          v-model="text"
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
      text: this.card.text,
      url: this.card.url,
    };
  },
  props: ["card"],
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files;
      let imgValue = {
        id: this.card.id,
        img: this.files[0],
        imgSRC: this.card.imgSRC
      };
      this.$emit("push-img", imgValue);
      this.src = URL.createObjectURL(this.card.img);
      imgValue.id = this.card.id;
    },
    pushData() {
      let inputValue = {
        id: this.card.id,
        url: this.url,
        text: this.text,
      };
      this.$emit("push-data", inputValue);
    },
    removeCard() {
      let id = this.card.id;
      this.$emit("remove-card", id);
    },
  },
};
</script>

<style>
.banner-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  margin-right: 20px;
  position: relative;
  margin-bottom: 20px;
}
.banner-card__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0
}
.banner-card__delete-btn {
  border: none;
  background: transparent;
  color: red;
  font-size: 24px;
  margin-bottom: 5px;
}
.banner-card:last-child {
  margin-right: 0;
}
.banner-card__img img {
  width: 100%;
  max-width: 200px;
  max-height: 100px;
  margin-bottom: 15px;
}
.input__wrapper {
  position: relative;
  margin: 15px 0;
  text-align: center;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-button {
  max-width: 290px;
  cursor: pointer;
  margin: 0 auto;
}
.input__file-img {
  width: 200px;
}
</style>
