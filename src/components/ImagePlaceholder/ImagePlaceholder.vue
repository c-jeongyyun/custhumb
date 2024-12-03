<template>
  <div class="image-placeholder" :style="{ width, height }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  width?: string;
  height?: string;
};

withDefaults(defineProps<PropsType>(), { width: "100%", height: "100%" });
</script>

<style scoped lang="scss">
.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--light-gray);
  border-radius: 10px;
}
</style>
