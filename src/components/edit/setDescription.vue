<template>
  <div class="description">
    <label class="description__label" for="description">{{ this.description }}</label>
    <textarea
      class="description__textarea"
      id="description"
      v-model="inputDescription"
      placeholder="текст"
      @input="pushData"
    ></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputDescription: this.objDescription,
    }
  },
  props: ["description", "objDescription"],
  methods: {
    pushData() {
      this.$emit("push-data", this.inputDescription);
    },
  }
}
</script>

<style scoped>
.description__label {
  margin-right: 20px;
}
.description {
  display: flex;
}
.description__textarea {
  resize: none;
  width: 500px;
  height: 100px;
  margin-bottom: 20px;
}
</style>