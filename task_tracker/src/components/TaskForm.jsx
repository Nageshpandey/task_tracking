import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import PropTypes from 'prop-types';

export const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};