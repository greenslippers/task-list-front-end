import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';

const App = () => {
  const [taskData, setData] = useState([
    {
      id: 1,
      title: 'Mow the lawn',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Cook Pasta',
      isComplete: true,
    },
  ]);

  const toggleComplete = (taskId) => {
    const tasks = taskData.map(task => {
      if (task.id === taskId) {
        return { ...task, isComplete: !task.isComplete };
      } else {
        return task;
      }
    });

    setData(tasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = [];

    taskData.forEach((task) => {
      if (task.id !== taskId) {
        updatedTasks.push(task);
      }
    });

    setData(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={taskData}
          toggleComplete = {toggleComplete}
          deleteTask = {deleteTask}
        ></TaskList>
      </main>
    </div>
  );
};

export default App;
