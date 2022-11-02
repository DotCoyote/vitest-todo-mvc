<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTodoList } from './useTodoList';
import { ToDo } from './todo.types';
import TodoItem from './TodoItem.vue';

const toDos = ref<ToDo[]>([]);
const todoListComp = useTodoList();

async function init() {
  toDos.value = await todoListComp.fetchToDos();
}

function onTodoItemClick(itemId: number) {
  todoListComp.toggleCompletedState(itemId, toDos);
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="max-w-3xl mx-auto flex flex-col gap-4 p-8">
    <todo-item v-for="item in toDos" :key="item.id" :todo="item" @on-click="onTodoItemClick" />
  </div>
</template>
