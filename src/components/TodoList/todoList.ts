import axios from 'axios';

export function useTodoList() {
  async function fetchToDos() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return response;
  }

  return {
    fetchToDos,
  };
}
