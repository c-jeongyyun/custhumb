<template>
  <div class="ai-prompt-input">
    <input
      :value="value"
      @input="onInput"
      @keydown.enter="$emit('click:send-btn', value)"
      :placeholder="placeholder"
    />
    <button @click="$emit('click:send-btn', value)">
      <span class="send-icon"> ⌲ </span>
    </button>
  </div>
</template>

<script setup lang="ts">
type PropsType = { placeholder?: string };

defineProps<PropsType>();
const value = defineModel<string | undefined>("value", { required: true });
defineEmits<{ "click:send-btn": [value: string | undefined] }>();
const onInput = (e: Event) => {
  value.value = (e.target as HTMLInputElement).value;
};
</script>

<style scoped lang="scss">
.ai-prompt-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid var(--middle-gray);
  padding-left: 20px;
  padding-right: 6px;

  > input {
    display: inline-block;
    flex: 1;
    height: 100%;

    background-color: transparent;
    font-size: 16px;
  }

  > button {
    position: relative;
    background-color: var(--primary);
    width: 32px;
    height: 32px;
    border-radius: 16px;
    color: var(--white);
    font-size: 28px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--primary-hover);
    }

    &:active {
      background-color: var(--primary-active);
    }

    .send-icon {
      position: relative;
      left: 1px;
      top: -2px;
      transform: rotate(-45deg);
    }
  }
}
</style>
