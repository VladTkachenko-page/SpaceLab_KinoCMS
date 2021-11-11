<template>
  <tr>
    <td>{{ this.page.name }}</td>
    <td>{{ this.page.date }}</td>
    <td v-if="this.page.status">ВКЛ</td>
    <td v-else>ВЫКЛ</td>
    <td v-if="this.page.name === 'Главная страница'">
      <router-link
        class="page-btn btn-success"
        tag="button"
        :to="{
          name: 'mainPagesRu',
          params: {
            id: this.page.id,
            lang: 'ru'
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td v-else-if="this.page.name === 'Контакты'">
      <router-link
        class="page-btn btn-success"
        tag="button"
        :to="{
          name: 'editContactRu',
          params: {
            id: this.page.id,
            lang: 'ru'
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td v-else>
      <router-link
        class="page-btn btn-success"
        tag="button"
        :to="{
          name: 'editPageRu',
          params: {
            id: this.page.id,
            lang: 'ru'
          },
        }"
      >
        Ред
      </router-link>
    </td>
    <td v-if="this.page.delete">
      <button @click.prevent="$emit('showModal', page)" class="btn-danger">
        Удал
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["page"],
};
</script>