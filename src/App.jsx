import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/tasks`;

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(API_BASE_URL)
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        setErrorMessage(<section>{error.response.data.message}</section>);
      });
  }, []);

  const toggleTaskComplete = (taskId, currentStatus) => {
    const endpoint = `${API_BASE_URL}/${taskId}/${currentStatus
      ? 'mark_incomplete' : 'mark_complete'}`;

    axios.patch(endpoint)
      .then(() => {
        // Update the local state only after API success
        setTaskData(tasks =>
          tasks.map(task =>
            task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
          )
        );
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(<section>Error updating task.</section>);
      });
  };

  const deleteTask = (taskId) => {
    axios.delete(`${API_BASE_URL}/${taskId}`)
      .then(() => {
        setTaskData(tasks => tasks.filter(task => task.id !== taskId));
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(<section>Error deleting task.</section>);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      {errorMessage}
      <main>
        <div>
          <TaskList
            tasks={taskData}
            toggleComplete={toggleTaskComplete}
            deleteTask={deleteTask}
          />
        </div>
        <container>
          <NewTaskForm/>
        </container>
      </main>
    </div>
  );
};

export default App;
