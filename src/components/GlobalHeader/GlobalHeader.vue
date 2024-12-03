<template>
  <header class="global-header">
    <h1>
      <span>✦</span>
      <span> CusThumb </span>
    </h1>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.global-header {
  background-color: var(--primary);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.5);

  > h1 {
    font-size: 24px;
    font-weight: 600;
    color: var(--white);
    display: flex;
    gap: 8px;
  }
}
</style>
