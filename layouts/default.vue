<template>
  <div class="content">test
    <Index />
  </div>
</template>

<script lang="ts">
import Index from "~/pages/index.vue";

export default {
  components: {Index}
}
</script>

<style scoped>
  .content {
    background: url("/background.png");
    width: 100vw;
    height: 100vh;
  }
</style>