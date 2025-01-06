import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchTasks = async () => {
  const { data } = await api.get('/todos');
  // Limit to first 10 todos for demo
  return data.slice(0, 10).map(todo => ({
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    userId: todo.userId
  }));
};

export const createTask = async (task) => {
  const { data } = await api.post('/todos', task);
  return {
    id: data.id,
    title: data.title,
    completed: data.completed,
    userId: data.userId
  };
};

export const updateTask = async (task) => {
  const { data } = await api.put(`/todos/${task.id}`, task);
  return data;
};

export const deleteTask = async (id) => {
  await api.delete(`/todos/${id}`);
};