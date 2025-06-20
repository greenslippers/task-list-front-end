import PropTypes from 'prop-types';
import './Task.css';

const Task = (props) => {
  const completeButtonClicked = () => {
    props.onToggleComplete(props.id, props.isComplete);
  };

  const deleteButtonClicked = () => {
    props.onDeleteTask(props.id);
  };

  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={completeButtonClicked}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button"
        onClick={deleteButtonClicked}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
