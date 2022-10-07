<script lang="ts" setup>
import { ToDo } from './todo.types';

defineProps<{
  todo: ToDo;
}>();

defineEmits<{
  (e: 'on-click', data: number): void;
}>();
</script>

<template>
  <button
    type="button"
    @click="$emit('on-click', todo.id)"
    data-test="todo-item"
    class="text-left rounded px-4 py-2 border border-solid border-gray-200 shadow-md"
    :class="{
      'opacity-50 line-through': todo.completed,
    }"
  >
    {{ todo.title }}
  </button>
</template>

<style scoped lang="scss"></style>
