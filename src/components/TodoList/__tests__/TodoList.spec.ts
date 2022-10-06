import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import TodoListVue from '../TodoList.vue';
import axios from 'axios';

const axiosSpy = vi.spyOn(axios, 'get').mockResolvedValue({
  data: [
    { title: 'foo', id: 1 },
    { title: 'barr', id: 2 },
  ],
});

describe('TodoList Component', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(TodoListVue);
  });

  it('should request todos from api', () => {
    expect(axiosSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
  });

  it('should list results', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('[data-test="todo-item"]').length).toEqual(2);
  });
});
