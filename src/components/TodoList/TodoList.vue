<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodoList } from './useTodoList';
import { ToDo } from './todo.types';
import TodoItem from './TodoItem.vue';

const toDos = ref<ToDo[]>([]);

async function init() {
  const { fetchToDos } = useTodoList();
  toDos.value = await fetchToDos();
}

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <todo-item v-for="item in toDos" :key="item.id" :todo="item" />
  </div>
</template>
