<template>
  <tr>
    <td>{{ this.session.filmName }}</td>
    <td>{{ this.session.cinemaName }}</td>
    <td>{{ this.session.hallName }}</td>
    <td>{{ this.session.price }}</td>
    <td>{{ this.session.time }}</td>
    <td> 
      <router-link
        class="btn-success"
        tag="button"
        :to="{
          name: 'timetableAdd',
          params: {
            id: this.timetable.id,
            idSession: this.session.id,
            session: this.session,
            timetable: this.timetable,
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td>
      <button @click.prevent="$emit('showModal', session)" class="btn-danger">
        Удал
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["session", "timetable"],
};
</script>
