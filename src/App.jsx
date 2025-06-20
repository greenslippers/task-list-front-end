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
        // modify to normalize data received from backend (is_complete > isComplete)
        const normalized = response.data.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          isComplete: task.is_complete,
        }));
        setTaskData(normalized);
        // setTaskData(response.data);
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

  // // add method that adds a new task to the task data
  // const addTaskData = (newTask) => {
  //   // LOGIC TO GENERATE THE NEXT VALID task ID
  //   const nextID = Math.max(0, ...taskData.map((task) => task.id)) + 1;
  //   // Duplicate the student list
  //   const newTaskList = [...taskData];

  //   newTaskList.push({
  //     id: nextID,
  //     title: newTask.title,
  //     isComplete: false,
  //   });

  //   setTaskData(newTaskList);
  // };

  const addTaskData = (newTask) => {
    axios.post(API_BASE_URL, {
      title: newTask.title,
      description: '',
    })
      .then((response) => {
        // Append the new task returned by backend to the local state
        // create normalized task to align backend respond is_complete and isComplete
        const rawTask = response.data.task;

        const normalizedTask = {
          id: rawTask.id,
          title: rawTask.title,
          description: rawTask.description,
          isComplete: rawTask.is_complete,
        };
        setTaskData(prev => [...prev, normalizedTask]);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(<section>Error adding task.</section>);
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
            onToggleComplete={toggleTaskComplete}
            onDeleteTask={deleteTask}
          />
        </div>
        <div>
          <NewTaskForm
            onTaskAdd={addTaskData}
          ></NewTaskForm>
        </div>
      </main>
    </div>
  );
};

export default App;
