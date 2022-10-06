<script setup lang="ts">
import { onMounted } from 'vue';
import { useTodoList } from './todoList';

onMounted(async () => {
  const { fetchToDos } = useTodoList();
  await fetchToDos();
});
</script>

<template><h1>ToDoList</h1></template>
