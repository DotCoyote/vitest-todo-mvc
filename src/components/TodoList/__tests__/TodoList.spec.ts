import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import TodoListVue from '../TodoList.vue';
import TodoItem from '../TodoItem.vue';
import { axiosMock } from '../../../../setupTests';

describe('TodoList Component', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoListVue);
  });

  it('should list results', async () => {
    expect(axiosMock.history.get.length).toBe(1);
    expect(wrapper.findAllComponents(TodoItem).length).toEqual(2);
  });
});
