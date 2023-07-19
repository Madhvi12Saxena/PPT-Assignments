import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [taskStatus, setTaskStatus] = useState({});

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, inputText]);
      setTaskStatus((prevStatus) => ({ ...prevStatus, [inputText]: 'pending' }));
      setInputText('');
    }
  };

  const handleUpdateStatus = (task) => {
    setTaskStatus((prevStatus) => ({ ...prevStatus, [task]: 'completed' }));
  };

  const handleRemoveTodo = (task) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item !== task));
    setTaskStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      delete updatedStatus[task];
      return updatedStatus;
    });
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter a task..."
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} - Status: {taskStatus[task]}
            <button onClick={() => handleUpdateStatus(task)}>Update Status</button>
            <button onClick={() => handleRemoveTodo(task)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
