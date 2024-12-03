<template>
  <div class="side-drawer">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.side-drawer {
  height: 100vh;
  width: 300px;
  border-radius: 10px 0 0 10px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
}
</style>
