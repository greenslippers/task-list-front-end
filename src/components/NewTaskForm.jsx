import{ useState } from 'react';

const NewTaskForm = () => {
  // add formField piece of state//
  const [formField, setFormField] = useState({
    name: '',
  });
  // add event handler to ensure changes in input field affect the state
  const handleTaskChange = (event) => {
    setFormField({
      ...formField, // spread syntax ...//
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form>
      <div>
        <label htmlFor="name"> New Task:</label>
        <input
          id="name"
          name="name"
          // add value to make input field read from the state//
          value={formField.name}
          // add event handler to input to ensure it use it when it is changed//
          onChange={handleTaskChange} />
      </div>
      <input
        type="submit"
        value="Add Task" />
    </form>
  );
};

export default NewTaskForm;