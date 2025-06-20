import{ useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  // add formField piece of state//
  const [formField, setFormField] = useState({
    title: '',
    description: '',
  });
  // add event handler to ensure changes in input field affect the state
  const handleTaskChange = (event) => {
    setFormField({
      ...formField, // spread syntax ...//
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onTaskAdd({
      title: formField.title,
      description: formField.description,
    });

    setFormField({
      title: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name"> New Task:</label>
        <input
          id="title"
          name="title"
          // add value to make input field read from the state//
          value={formField.title}
          // add event handler to input to ensure it use it when it is changed//
          onChange={handleTaskChange} />
      </div>
      <div>
        <label htmlFor="description">Task Description:</label>
        <input
          id="description"
          name="description"
          value={formField.description}
          onChange={handleTaskChange}
        />
      </div>
      <input
        type="submit"
        value="Add Task" />
    </form>
  );
};

NewTaskForm.propTypes = {
  onTaskAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;
