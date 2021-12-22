<template>
  <tr>
    <td>{{ this.stock.name }}</td>
    <td>{{ this.stock.date }}</td>
    <td v-if="this.stock.status">ВКЛ</td>
    <td v-else>ВЫКЛ</td>
    <td>
      <router-link
        class="stock-btn btn-success"
        tag="button"
        :to="{
          name: 'stockEditRu',
          params: {
            id: this.stock.id,
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td>
      <button @click.prevent="$emit('showModal', stock)" class="btn-danger">
        Удал
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["stock"],
};
</script>
