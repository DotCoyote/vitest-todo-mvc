import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import TodoListVue from '../TodoList.vue';
import TodoItem from '../TodoItem.vue';
import { axiosMock } from '../../../../setupTests';

describe('TodoList Component', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(TodoListVue);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should list results', async () => {
    expect(axiosMock.history.get.length).toBe(1);
    expect(wrapper.findAllComponents(TodoItem).length).toEqual(5);
  });

  describe('onTodoItemClick', () => {
    it('should set the target item to completed', async () => {
      expect(wrapper.findAllComponents(TodoItem).length).toEqual(5);
      await wrapper.findComponent(TodoItem).trigger('click');

      expect(wrapper.findAllComponents(TodoItem)[1].props().todo.completed).toEqual(false);

      await wrapper.findAllComponents(TodoItem)[1].trigger('click');

      expect(wrapper.findAllComponents(TodoItem)[1].props().todo.completed).toEqual(true);
    });
  });
});
