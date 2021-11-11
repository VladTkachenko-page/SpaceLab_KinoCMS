<template>
  <div class="banner-up">
    <div class="banner-up__header">
      <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success banner-up__switch">
        <input type="checkbox" class="custom-control-input" id="switch1" @change="isVisible = !isVisible" checked>
        <label class="custom-control-label" for="switch1"></label>
      </div>
    </div>
    <div class="banner__wrap" v-show="isVisible">
      <p class="banner-subtitle">Размер: 1000х190</p>
      <div class="banner-up__cards">
        <slot></slot>
        
      </div>
      <div class="banner__footer">
        <div class="banner__select">
          <span class="banner__select-text">Скорость вращения</span>
          <select name="banner" id="banner-select" v-model="selected" :selected="this.speed" @change="changeSpeed">
            <option value="1">1c</option>
            <option value="2">2c</option>
            <option value="3">3c</option>
            <option value="4">4c</option>
            <option value="5">5c</option>
          </select>
        </div>
        <button
          type="submit"
          :form="this.for"
          class="btn-success banner-up__btn"
          @click.prevent="sendCards"
          :disabled="this.disabledUp || this.disabledDown"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isVisible: true,
      selected: this.speed
    }
  },
  components: {
  },
  props: ["for", "disabledUp", "disabledDown", "speed"],
  methods: {
    changeSpeed() {
      this.$emit("changeSpeed");
    },
    async sendCards() {
      this.$emit("send-banner", {for: this.for, speed: this.selected});
    }
  }
}
</script>

<style scoped>
.banner-up {
  border: 2px solid black;
  padding: 20px;
  margin-bottom: 20px;
}
.banner-up__switch {
  display: flex;
  justify-content: end;
}
.banner-up__cards {
  display: flex;
  justify-content: start;
  align-items: center;  
}
.banner__footer {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 70px;
}
.banner__select {
  margin-right: 25%;
}
.banner__select-text {
  margin-right: 30px;
}
banner-up__btn {
  text-align: center;
}
</style>