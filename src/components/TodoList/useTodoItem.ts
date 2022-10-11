import { ToDo } from '@/components/TodoList/todo.types';

export function useTodoItem() {
  function isItemCompleted(item: ToDo) {
    return !!item.completed;
  }

  return {
    isItemCompleted,
  };
}