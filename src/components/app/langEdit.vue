<template>
  <div class="lang__header">
    <div class="tabs">
      <ul class="nav nav-tabs">
        <li v-for="link in links" :key="link.url" class="nav-item">
          <router-link
            class="nav-link"
            tag="a"
            :to="{ name: link.url, params: { lang: link.lang } }"
            active-class="active"
            :exact="link.exact"
          >
            <p>{{ link.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: "Русский", url: `${this.linkRu}`, lang: "ru", exact: true },
        { title: "Украинский", url: `${this.linkUa}`, lang: "ua" },
      ],
    };
  },
  props: ["linkRu", "linkUa"],
}
</script>