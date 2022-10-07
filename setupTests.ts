import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('https://jsonplaceholder.typicode.com/todos').reply(200, [
  { title: 'Todo', id: 1, completed: false },
  { title: 'Item', id: 2, completed: false },
  { title: 'third Item', id: 3, completed: false },
  { title: 'Number 4', id: 4, completed: false },
  { title: 'Another one', id: 5, completed: false },
]);

export const axiosMock = mock;
