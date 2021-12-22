<template>
  <tr>
    <td v-if="this.lang === 'ru'">{{ this.hall.name }}</td>
    <td v-else>{{ this.hall.nameUa }}</td>
    <td>{{ this.hall.date }}</td>
    <td>
      <router-link
        v-if="this.$route.path.slice(this.$route.path.length - 2) === 'ru'"
        class="hall-btn btn-success"
        tag="button"
        :to="{
          name: 'hallEditRu',
          params: {
            id: this.hall.cinemaId,
            idHall: this.hall.id,
            hall: this.hall,
            cinema: this.cinema,
            lang: 'ru',
          },
        }"
      >
        Ред
      </router-link>
      <router-link
        v-else
        class="hall-btn btn-success"
        tag="button"
        :to="{
          name: 'hallEditUa',
          params: {
            id: this.hall.cinemaId,
            idHall: this.hall.id,
            hall: this.hall,
            cinema: this.cinema,
            lang: 'ua',
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td>
      <button
        v-if="Object.keys(this.cinema.halls).length > 1"
        @click.prevent="$emit('showModal', hall)"
        class="btn-danger"
      >
        Удал
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["hall", "cinema", "lang"],
};
</script>
