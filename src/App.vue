<template>
  <GlobalLayout>
    <template #header>
      <GlobalHeader />
    </template>
    <PrototypePage />
  </GlobalLayout>
</template>

<script setup lang="ts">
import GlobalHeader from "./components/GlobalHeader/GlobalHeader.vue";
import GlobalLayout from "./layouts/GlobalLayout.vue";

import PrototypePage from "./views/PrototypePage/PrototypePage.vue";
</script>

<style scoped lang="scss">
@use "./style/main.scss";
</style>
