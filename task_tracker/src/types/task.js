import PropTypes from 'prop-types';

export const TaskShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired
};

export const CreateTaskInputShape = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  userId: PropTypes.number.isRequired
};
