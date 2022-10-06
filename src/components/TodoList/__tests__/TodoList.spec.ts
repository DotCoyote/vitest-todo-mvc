import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import TodoListVue from '../TodoList.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('TodoList Component', () => {
  let wrapper: VueWrapper;

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.onGet('https://jsonplaceholder.typicode.com/todos').reply(200, [
      { title: 'foo', id: 1 },
      { title: 'barr', id: 2 },
    ]);
    wrapper = mount(TodoListVue);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should list results', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('[data-test="todo-item"]').length).toEqual(2);
  });
});
