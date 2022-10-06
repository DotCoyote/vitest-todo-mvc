import axios from 'axios';

export function useTodoList() {
  async function fetchToDos() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return data;
  }

  return {
    fetchToDos,
  };
}
