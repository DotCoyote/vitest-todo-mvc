import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach } from 'vitest';

console.log('mocks called');

const mock = new MockAdapter(axios);
mock.onGet('https://jsonplaceholder.typicode.com/todos').reply(200, [
  { title: 'foo', id: 1 },
  { title: 'barr', id: 2 },
]);

afterEach(() => {
  mock.reset();
});
