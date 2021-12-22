<template>
  <tr>
    <td>{{ this.user.id }}</td>
    <td>{{ this.user.createDate }}</td>
    <td>{{ this.user.date }}</td>
    <td>{{ this.user.email }}</td>
    <td>{{ this.user.phone }}</td>
    <td>{{ this.user.name + " " + this.user.surname }}</td>
    <td>{{ this.user.nickname }}</td>
    <td>{{ this.user.city }}</td>
    <td v-if="admin">
      <router-link
        class="user-btn btn-success"
        tag="button"
        :to="{
          name: 'userEdit',
          params: {
            id: this.user.uid,
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td v-if="admin">
      <button @click.prevent="$emit('showModal', user)" class="btn-danger">
        Удал
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["user", "admin"],
};
</script>
