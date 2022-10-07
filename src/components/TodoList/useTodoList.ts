import axios from 'axios';
import { ToDo } from './todo.types';
import { Ref } from 'vue';

export function useTodoList() {
  async function fetchToDos() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return data;
  }

  function getItemById(itemId: number, todoItems: Ref<ToDo[]>) {
    return todoItems.value.find((item) => item.id === itemId);
  }

  function toggleCompletedState(itemId: number, todoItems: Ref<ToDo[]>) {
    const item = getItemById(itemId, todoItems);
    if (item) {
      item.completed = !item.completed;
    }
  }

  return {
    fetchToDos,
    getItemById,
    toggleCompletedState,
  };
}
