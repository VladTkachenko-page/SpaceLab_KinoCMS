<template>
  <div v-if="this.sending" id="toastsContainerTopRight" class="toasts-top-right fixed">
    <div
      class="toast bg-success fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body">{{ this.text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sending", "text"]
}
</script>