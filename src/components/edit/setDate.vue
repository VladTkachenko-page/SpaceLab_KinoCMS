<template>
  <div class="date-public">
    <label class="date-public__label" for="date">{{ this.nameDate }}</label>
    <input
      class="date-public__input"
      type="date"
      id="date"
      :placeholder="this.nameDate"
      v-model="inputDate"
      @input="pushData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputDate: this.objDate,
    }
  },
  props: ["nameDate", "objDate"],
  methods: {
    pushData() {
      this.$emit("push-data", this.inputDate);
    },
  }
}
</script>

<style scoped>
.date-public__label {
  margin-right: 20px;
}
.date-public {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>