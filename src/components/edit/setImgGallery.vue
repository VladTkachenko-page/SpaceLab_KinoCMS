<template>
  <Loader v-if="loading" />
  <div v-else class="gallery__wrap">
    <strong class="gallery-subtitle">Галерея картинок</strong>
    <div class="gallery__cards">
      <p class="gallery-subtitle">Размер: 1000х190</p>
      <addImg
        v-for="img in this.objImgGallery"
        :key="img.id"
        :img="img"
        :index="img.id"
        :id="objId"
        @push-gallery-img="pushGalleryImg"
        @remove-img-gallery="removeGalleryImg"
      />
      <input
        name="file"
        type="file"
        id="input__file22"
        ref="myFiles"
        @change="previewFiles"
        class="input input__file"
        accept=".jpg, .jpeg, .png"
      />
      <label for="input__file22" class="input__file-button">
        <span class="btn-success">Добавить картинку</span>
      </label>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import addImg from "@/components/edit/addImg.vue";
export default {
  data() {
    return {
      files: [],
      src: "",
      loading: false,
    };
  },
  props: ["objId", "objImgGallery"],
  components: {
    Loader,
    addImg,
  },
  methods: {
    previewFiles() {
      this.delete = false;
      this.files = this.$refs.myFiles.files;
      if (this.files[0]) {
        this.src = URL.createObjectURL(this.files[0]);
      }
      let imgData = {
        file: this.files[0],
        id: new Date().getTime(),
        imgSRC: URL.createObjectURL(this.files[0]),
      };
      if (!this.objImgGallery) {
        this.objImgGallery = [];
      }
      this.objImgGallery.push(imgData);
      this.$emit("add-img-gallery", this.objImgGallery);
      this.$refs.myFiles.value = ""

    },
    async pushGalleryImg(imgData) {
      const index = this.objImgGallery.findIndex((el) => imgData.id === el.id);
      this.$emit("push-img-gallery", { ...imgData, index });
    },
    removeGalleryImg(id) {
      this.$emit("remove-img-gallery", id);
    },
  },
};
</script>

<style scoped>
.gallery__cards {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}
button {
  margin-left: 20px;
}
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
.input__file-button span{
  min-width: 100px;
  font-family: inherit;
  appearance: none;
  border: 0;
  border-radius: 5px;
  background: green;
  color: #fff;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
}
.input__file-button span:hover {
  background: rgb(0, 105, 0);
}
.input__file-button span:focus {
  outline: none;
  box-shadow: 0 0 0 4px #cbd6ee;
}
.input__file-img {
  width: 200px;
  height: 100px;
}
</style>
