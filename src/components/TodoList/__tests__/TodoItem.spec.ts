import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import TodoItem from '../TodoItem.vue';
import { ToDo } from '../todo.types';
import { mock } from 'vitest-mock-extended';

const todoItemMock = mock<ToDo>({
  title: 'Todo Item Title',
  id: 1,
  completed: false,
});

describe('Todo Item', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      props: {
        todo: todoItemMock,
      },
    });
  });

  it('displays the given data', () => {
    expect(wrapper.text()).toContain('Todo Item Title');
  });

  it('should emit an event on click', () => {
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('on-click')).toEqual([[1]]);
  });
});
