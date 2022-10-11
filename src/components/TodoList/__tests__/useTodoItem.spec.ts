import { describe, expect, it } from 'vitest';
import { useTodoItem } from '@/components/TodoList/useTodoItem';
import { mock } from 'vitest-mock-extended';
import { ToDo } from '@/components/TodoList/todo.types';

const completedItemMock = mock<ToDo>({ completed: true });
const incompleteItemMock = mock<ToDo>({ completed: false });

describe('useTodoItem', () => {
  describe('isItemCompleted', () => {
    it('returns the correct value', () => {
      const useTodoItemComp = useTodoItem();

      expect(useTodoItemComp.isItemCompleted(completedItemMock)).toBe(true);
      expect(useTodoItemComp.isItemCompleted(incompleteItemMock)).toBe(false);
    });
  });
});
