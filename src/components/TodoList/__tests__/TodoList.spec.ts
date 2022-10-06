import { describe, vi, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import TodoListVue from '../TodoList.vue';
import axios from 'axios';

vi.mock('axios');

describe('TodoList Component', () => {
  let wrapper = VueWrapper;
  it('should request todos from api', () => {
    shallowMount(TodoListVue);
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
  });
});
