import axios from 'axios';
import { ToDo } from './todo.types';
import { Ref } from 'vue';
import { useTodoItem } from './useTodoItem';

export function useTodoList() {
  const useTodoItemComp = useTodoItem();

  async function fetchToDos() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return data;
  }

  function getItemById(itemId: number, todoItems: Ref<ToDo[]>) {
    return todoItems.value.find((item) => item.id === itemId);
  }

  function toggleCompletedState(itemId: number, todoItems: Ref<ToDo[]>) {
    const item = getItemById(itemId, todoItems);
    if (item && useTodoItemComp.isItemCompleted(item)) {
      item.completed = false;
    } else if (item && !useTodoItemComp.isItemCompleted(item)) {
      item.completed = true;
    }
  }

  return {
    fetchToDos,
    getItemById,
    toggleCompletedState,
  };
}
