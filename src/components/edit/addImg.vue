<template>
  <div class="img-card">
    <div class="img-card__delete">
      <button @click.prevent="removeGalleryImg" class="img-card__delete-btn">
        &times;
      </button>
    </div>
    <div class="img-card__img input__wrapper">
      <input
        name="file"
        type="file"
        :id="'input__file' + this.index"
        ref="myFiles"
        @change="previewFiles"
        class="input input__file"
        accept=".jpg, .jpeg, .png"
      />
      <label
        v-if="this.img.imgSRC"
        :for="'input__file' + this.index"
        class="input__file-button"
      >
        <img
          v-if="files.length === 0"
          class="input__file-img"
          :src="this.img.imgSRC"
        />
        <img v-if="files.length !== 0" class="input__file-img" :src="src" />
      </label>
      <label
        v-if="!this.img.imgSRC"
        :for="'input__file' + this.index"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      src: "",
    };
  },
  props: ["index", "id", "img"],
  methods: {
    previewFiles() {
      this.delete = false;
      this.files = this.$refs.myFiles.files;
      if (this.files[0]) {
        this.src = URL.createObjectURL(this.files[0]);
      }
      this.$emit("push-gallery-img", {
        file: this.files[0],
        id: this.index,
        objId: this.id,
        imgSRC: URL.createObjectURL(this.files[0]),
      });
    },
    removeGalleryImg() {
      this.$emit("remove-img-gallery", { imgId: this.index, objId: this.id });
    },
  },
};
</script>

<style scoped>
.input__wrapper {
  position: relative;
  margin: 15px 10px;
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
  height: 100px;
}
.img-card {
  position: relative;
}
.img-card__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;
  right: 0px;
  top: 0px;
}
.img-card__delete-btn {
  border: none;
  background: transparent;
  color: red;
  font-size: 24px;
  margin-bottom: 5px;
}
</style>
