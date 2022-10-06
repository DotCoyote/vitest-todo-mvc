<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodoList } from './useTodoList';

type ToDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

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
    <div v-for="item in toDos" :key="item.id" data-test="todo-item">{{ item.title }}</div>
  </div>
</template>
