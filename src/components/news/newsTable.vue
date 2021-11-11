<template>
  <tr>
    <td>{{ this.news.name }}</td>
    <td>{{ this.news.date }}</td>
    <td v-if="this.news.status">ВКЛ</td>
    <td v-else>ВЫКЛ</td>
    <td>
      <router-link
        class="news-btn btn-success"
        tag="button"
        :to="{
          name: 'newsEditRu',
          params: {
            id: this.news.id,
            lang: 'ru'
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td>
      <button @click.prevent="$emit('showModal', news)" class="btn-danger">
        Удал
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["news"],
};
</script>
