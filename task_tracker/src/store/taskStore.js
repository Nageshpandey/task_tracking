import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  filter: 'all',

  setTasks: (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    set({ tasks });
  },

  addTask: (task) => set((state) => {
    const newTasks = [...state.tasks, task];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  updateTask: (updatedTask) => set((state) => {
    const newTasks = state.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  deleteTask: (taskId) => set((state) => {
    const newTasks = state.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  setFilter: (filter) => set({ filter }),
}));