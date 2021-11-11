<template>
  <div class="mainIMG">
    <label for="input__file">{{this.objMainImgText}}</label>
    <div class="input__wrapper">
      <input
        name="file"
        type="file"
        :id="this.id"
        ref="myFiles"
        @change="previewFiles"
        class="input input__file"
        accept=".jpg, .jpeg, .png"
      />
      <label v-if="this.objMainImg && !this.delete" :for="this.id" class="input__file-button">
        <img v-if="files.length === 0" class="input__file-img" :src="this.objMainImg" />
        <img v-if="files.length !== 0" class="input__file-img" :src="src" />
      </label>
      <label v-if="this.delete || !this.objMainImg" :for="this.id" class="input__file-button">
        <img
          v-if="files.length === 0" 
          class="input__file-img"
          src="https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          alt=""
        />
        <img v-if="files.length !== 0" class="input__file-img" :src="src" />
      </label>
    </div>
    <button class="btn-danger" @click.prevent="removeMainObjImg">Удалить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      src: "",
      delete: false,
    };
  },
  props: ["objMainImg", "objMainImgText", "id"],
  methods: {
    previewFiles() {
      this.delete = false
      this.files = this.$refs.myFiles.files;
      if (this.files[0]){
        this.src = URL.createObjectURL(this.files[0]);
      }
      this.$emit('push-main-obj-img', this.files[0]);
    },
    async removeMainObjImg() {
      await this.$emit("remove-main-obj-img");
      this.src = "https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
      this.$refs.myFiles.value = "";
      this.delete = true
    }
  },
};
</script>

<style scoped>
.mainIMG {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.input__wrapper {
  position: relative;
  margin: 15px 30px;
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