<script lang="ts" setup>
import { ToDo } from './todo.types';

defineProps<{
  todo: ToDo;
}>();
</script>

<template>
  <div data-test="todo-item">{{ todo.title }}</div>
</template>

<style scoped lang="scss"></style>
