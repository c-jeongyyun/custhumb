<template>
  <div class="video-summary-item">
    <div class="mock-image"></div>
    <!-- <img :src="imgUrl" /> -->
    <h3>{{ title }}</h3>
    <h4>{{ length }}</h4>
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  imgUrl: string;
  title: string;
  length: string;
};

defineProps<PropsType>();
</script>

<style scoped lang="scss">
.video-summary-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .mock-image {
    width: 240px;
    height: 150px;
    background-color: pink;
  }

  > h3 {
    font-weight: 600;
    font-size: 16px;
    color: var(dark-gray);
  }

  > h4 {
    font-size: 12px;
    color: var(--middle-gray);
  }
}
</style>
