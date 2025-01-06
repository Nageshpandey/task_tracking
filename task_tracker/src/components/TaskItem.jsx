import { Check, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { TaskShape } from '../types/task';

export const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(task)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300'
            }`}
        >
          {task.completed && <Check size={16} />}
        </button>
        <span
          className={`text-gray-800 ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape(TaskShape).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};