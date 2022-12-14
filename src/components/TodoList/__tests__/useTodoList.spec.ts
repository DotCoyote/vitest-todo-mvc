import { describe, expect, it } from 'vitest';
import { useTodoList } from '../useTodoList';
import { axiosMock } from '../../../../setupTests';
import { ref } from 'vue';
import { mock } from 'vitest-mock-extended';
import { ToDo } from '../todo.types';

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
      const useTodoListComp = useTodoList();
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

      expect(todoItem1.completed).toBe(false);
      useTodoListComp.toggleCompletedState(1, todoItems);
      expect(todoItem1.completed).toBe(true);

      expect(todoItem3.completed).toBe(true);
      useTodoListComp.toggleCompletedState(3, todoItems);
      expect(todoItem3.completed).toBe(false);
    });
  });
});
