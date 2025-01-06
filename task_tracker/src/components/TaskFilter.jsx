import PropTypes from 'prop-types';

export const TaskFilter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-3 py-1 rounded-lg ${
          currentFilter === 'all'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('pending')}
        className={`px-3 py-1 rounded-lg ${
          currentFilter === 'pending'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`px-3 py-1 rounded-lg ${
          currentFilter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Completed
      </button>
    </div>
  );
};

TaskFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'pending', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired
};