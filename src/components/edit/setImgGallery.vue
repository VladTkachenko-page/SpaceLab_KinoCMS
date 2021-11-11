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
      <button class="btn-success" @click.prevent="addImg">
        Добавить картинку
      </button>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/app/loader.vue";
import addImg from "@/components/edit/addImg.vue";
export default {
  data() {
    return {
      loading: false,
    }
  },
  props: ["objId", "objImgGallery"],
  components: {
    Loader, addImg
  },
  methods: {
    addImg(){
      const imgData = {
        id: new Date().getTime(),
      }
      if (!this.objImgGallery) {
        this.objImgGallery = []
      }
      this.objImgGallery.push(imgData);
      this.$emit("add-img-gallery", this.objImgGallery);

    },
    async pushGalleryImg(imgData) {
      const index = this.objImgGallery.findIndex(el => imgData.id === el.id);
      this.$emit("push-img-gallery", { ...imgData, index});
    },
    removeGalleryImg(id) {
      this.$emit("remove-img-gallery", id);
    },
  }
}
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
</style>