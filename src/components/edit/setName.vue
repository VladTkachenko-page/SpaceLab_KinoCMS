<template>
  <div class="name-input">
    <label class="name-input__label" for="name">{{ this.name }}</label>
    <input
      class="name-input__input"
      type="text"
      id="name"
      :placeholder="this.name"
      v-model="inputName"
      @input="pushData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputName: this.objName,
    }
  },
  props: ["name", "objName"],
  methods: {
    pushData() {
      this.$emit("push-data", this.inputName);
    },
  }
}
</script>

<style scoped>
.name-input__label {
  margin-right: 20px;
}
name-input__input {
  width: 300px; 
}
.name-input {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 40px;
}
</style>