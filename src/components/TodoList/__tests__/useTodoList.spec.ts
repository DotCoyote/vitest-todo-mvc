import { describe, expect, it, vi } from 'vitest';
import { useTodoList } from '../useTodoList';
import { axiosMock } from '../../../../setupTests';
import { ref } from 'vue';
import { mock } from 'vitest-mock-extended';
import { ToDo } from '../todo.types';
import { useTodoItem } from '@/components/TodoList/useTodoItem';

describe('useTodoList composable', () => {
  describe('fetchToDos', () => {
    it('should perform an api call', async () => {
      const { fetchToDos } = useTodoList();
      const response = await fetchToDos();
      expect(axiosMock.history.get.length).toBe(1);
      expect(axiosMock.history.get[0].url).toContain('/todos');
      expect(response).toHaveLength(5);
    });
  });

  describe('getItemById', () => {
    it('should return the correct item', () => {
      const { getItemById } = useTodoList();
      const todoItem1 = mock<ToDo>({
        id: 1,
      });
      const todoItem2 = mock<ToDo>({
        id: 2,
      });
      const todoItem3 = mock<ToDo>({
        id: 3,
      });
      const todoItems = ref([todoItem1, todoItem2, todoItem3]);
      expect(getItemById(2, todoItems)).toEqual(todoItem2);
      expect(getItemById(2, todoItems)).not.toEqual(todoItem3);
    });
  });

  describe('toggleCompletedState', () => {
    it('should change the completed value', () => {
      const { toggleCompletedState } = useTodoList();
      const todoItem1 = mock<ToDo>({
        id: 1,
        completed: false,
      });
      const todoItem2 = mock<ToDo>({
        id: 2,
        completed: false,
      });
      const todoItem3 = mock<ToDo>({
        id: 3,
        completed: true,
      });
      const todoItems = ref([todoItem1, todoItem2, todoItem3]);

      toggleCompletedState(1, todoItems);
      expect(todoItems.value[0].completed).toEqual(true);

      toggleCompletedState(3, todoItems);
      expect(todoItems.value[2].completed).toEqual(false);
    });

    it('should work with mocked methods', function () {
      vi.mock('../useTodoItem.ts', () => {
        let _cache: any;
        const useTodoItem = vi.fn(() => {
          if (!_cache) {
            _cache = {
              isItemCompleted: vi.fn(() => false),
            };
          }
          return _cache;
        });
        return { useTodoItem };
      });

      const todoItem1 = mock<ToDo>({
        id: 1,
        completed: false,
      });

      const todoItem2 = mock<ToDo>({
        id: 2,
        completed: true,
      });

      const todoItems = ref([todoItem1, todoItem2]);

      const useTodoListComp = useTodoList();
      const useTodoItemComp = useTodoItem();

      useTodoListComp.toggleCompletedState(1, todoItems);
      expect(useTodoItemComp.isItemCompleted).toHaveBeenCalledWith(todoItem1);
      expect(todoItem1.completed).toBe(true);

      // Due to mock, this will not be toggled
      expect(todoItem2.completed).toBe(true);
      useTodoListComp.toggleCompletedState(2, todoItems);
      expect(useTodoItemComp.isItemCompleted).toHaveBeenCalledWith(todoItem2);
      expect(todoItem2.completed).toBe(true);
    });
  });
});
