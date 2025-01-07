import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CheckCircle2, ListTodo } from 'lucide-react';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';
import { TaskFilter } from '../components/TaskFilter';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import * as api from '../lib/api';
import { toast } from 'react-toastify'; // Import toast

export function TaskDashboard() {
  const navigate = useNavigate();
  const { token, userId, logout } = useAuthStore();
  const { tasks, filter, setTasks, addTask, updateTask: updateLocalTask, deleteTask: deleteLocalTask, setFilter } = useTaskStore();

  const { data: fetchedTasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: api.fetchTasks,
    enabled: !!token,
  });

  const createTaskMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: (newTask) => {
      console.log('New Task:', newTask); // Log the new task
      addTask(newTask); // Add task to local store
      const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      console.log('Current Local Tasks:', localTasks); // Log current tasks in local storage
      localStorage.setItem('tasks', JSON.stringify([...localTasks, newTask])); // Save to local storage
      toast.success('Task added successfully!'); // Show success toast for adding task
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: api.updateTask,
    onSuccess: (updatedTask) => {
      updateLocalTask(updatedTask);
      toast.success('Task updated successfully!'); // Show success toast for completing task
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: (_, id) => {
      deleteLocalTask(id);
      toast.success('Task deleted successfully!'); // Show success toast for deleting task
    },
  });

  useEffect(() => {
    if (fetchedTasks) { 
      setTasks(fetchedTasks);
    } else {
      const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      setTasks(localTasks);
    }
  }, [fetchedTasks, setTasks]);

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully!'); // Show toast for logout
    navigate('/auth');
  };

  const handleCreateTask = (title) => {
    if (userId) {
      createTaskMutation.mutate({
        title,
        completed: false,
        userId,
      });
    }
  };

  const handleToggleTask = (task) => {
    updateTaskMutation.mutate({
      ...task,
      completed: !task.completed,
    });
  };

  const handleDeleteTask = (id) => {
    deleteTaskMutation.mutate(id);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <ListTodo className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
          <TaskForm onSubmit={handleCreateTask} />
          <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

          {isLoading ? (
            <div className="text-center py-4">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No tasks found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
