<template>
  <div>
    <label for="videoURL">{{ this.nameUrl }}</label>
    <input
      type="text"
      id="videoURL"
      placeholder="Ссылка на видео в Youtube"
      v-model="inputVideo"
      @input="pushData">
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVideo: this.objVideo,
    }
  },
  props: ["nameUrl", "objVideo"],
  methods: {
    pushData() {
      this.$emit("push-data", this.inputVideo);
    },
  }
}
</script>

<style scoped>
label {
  margin-right: 20px;
}
input {
  width: 300px; 
}
</style>