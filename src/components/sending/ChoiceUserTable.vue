<template>
  <tr>
    <td class="choice-user__checkbox custom-control custom-checkbox">
      <input
        class="custom-control-input"
        type="checkbox"
        v-model="choiceUser"
        :id="this.user.id"
        :value="this.user.id"
      />
      <label
        :for="this.user.id"
        class="custom-control-label choice-user__label"
      ></label>
    </td>
    <td>{{ this.user.id }}</td>
    <td>{{ this.user.createDate }}</td>
    <td>{{ this.user.date }}</td>
    <td>{{ this.user.email }}</td>
    <td>{{ this.user.phone }}</td>
    <td>{{ this.user.name + " " + this.user.surname }}</td>
    <td>{{ this.user.nickname }}</td>
    <td>{{ this.user.city }}</td>
  </tr>
</template>

<script>
export default {
  data() {
    return {
      choiceUser: [],
    };
  },
  props: ["user"],
};
</script>
<style scoped>
.choice-user__label::before {
  left: 0;
}
</style>
