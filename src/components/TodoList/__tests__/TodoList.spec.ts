import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import TodoListVue from '../TodoList.vue';
import { axiosMock } from '../../../../setupTests';

describe('TodoList Component', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(TodoListVue);
  });

  it('should list results', async () => {
    expect(axiosMock.history.get.length).toBe(1);
    expect(wrapper.findAll('[data-test="todo-item"]').length).toEqual(2);
  });
});
