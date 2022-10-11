import { describe, expect, it, vi } from 'vitest';
import { useTodoList } from '../useTodoList';
import { ref } from 'vue';
import { mock } from 'vitest-mock-extended';
import { ToDo } from '../todo.types';

describe('useTodoList composable', () => {
  describe('toggleCompletedState', () => {
    describe('mocked', function () {
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

        expect(todoItem1.completed).toBe(false);
        useTodoListComp.toggleCompletedState(1, todoItems);
        expect(todoItem1.completed).toBe(true);

        // Due to mock, this will not be toggled
        expect(todoItem2.completed).toBe(true);
        useTodoListComp.toggleCompletedState(2, todoItems);
        expect(todoItem2.completed).toBe(true);
      });
    });
  });
});
