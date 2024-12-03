<template>
  <div class="global-layout">
    <slot name="header"> </slot>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.global-layout {
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: 60px auto;

  .content {
    margin: 20px;
  }
}
</style>
