"use client";
import { useState } from 'react'; 
import { MdCheck, MdDeleteForever } from "react-icons/md";

import './App.css';

export default function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    if (task.includes(inputValue)) {
      setInputValue("");
      return;
    }
    
    setTask((prevTask) => [...prevTask, inputValue]);
    setInputValue("");
  };

  const handleDeleteTask = (index) => {
    setTask((prevTask) => prevTask.filter((_, i) => i !== index));
  };

  const handleCheckTask = (index) => {
    // Implement the logic to mark the task as completed
    setTask((prevTask) => {prevTask[index] = <strike>{prevTask[index]}</strike>; return [...prevTask]});
    
  };

  return (
    <div>
      <h1>To-do-list</h1> 
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text"
          placeholder='Enter a Todo' 
          className="task input" 
          autoComplete="off" 
          value={inputValue}
          onChange={(event) => handleInputChange(event.target.value)}
        />
        <button className="button-add" type="submit">Add Task</button>
      </form>
      <section className="MyUnOrdList">
        <ul>
          {
            task.map((curTask, index) => {
              return (
                <li key={index} className="Todo-items">
                  <span>{curTask}</span>
                  <button  className="check-btn" onClick={() => handleCheckTask(index)}>
                    <MdCheck />
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteTask(index)}>
                    <MdDeleteForever />
                  </button>
                </li>
                    

              );
            })
          }             
        </ul>
      </section>
    </div>
  );
}
