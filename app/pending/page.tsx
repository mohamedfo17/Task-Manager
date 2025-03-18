"use client";
import React from "react";
import { useState, useEffect } from "react";
import Succesful from "../succesful/page";
import Aborted from "../aborted/page";
interface PendingProps {
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
}

const Pending: React.FC<PendingProps> = ({ tasks, setTasks }) => {
  const [sucTasks, setSucTasks] = useState<string[]>(() => {
      const storedSucTasks = localStorage.getItem("sucTasks");
      return storedSucTasks ? JSON.parse(storedSucTasks) : [];
    });
  function sucTask(index: number) {
    const succesful = tasks[index];
    const newTask = tasks.filter((_, i) => i !== index);
    
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));

    
    localStorage.setItem("sucTasks", JSON.stringify([...sucTasks, succesful]));
    setSucTasks([...sucTasks,succesful]);
  }
  const [aboTasks, setAboTasks] = useState<string[]>(() => {
    const storedAboTasks = localStorage.getItem("aboTasks");
    return storedAboTasks ? JSON.parse(storedAboTasks) : [];
  });
  function abort(index: number) {
    const aborted = tasks[index];
    const newTask = tasks.filter((_, i) => i !== index);
    
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));

    localStorage.setItem("aboTasks", JSON.stringify([...aboTasks, aborted]));
    setAboTasks([...aboTasks,aborted]);
  }

  return (
    <div className="text-black mt-10">
      <div className="flex flex-row gap-10 text-2xl mb-3">
        <h3>⏳ PENDING TASKS :</h3>
        <p>{tasks.length} TASKS</p>
      </div>
      <div>
        <ul >
          {tasks.map((ele, index) => (
            <li key={index} className="text-2xl my-1.5 before:content-['🎯'] break-words">
              {ele}
              <button className="btno " onClick={() => sucTask(index)}>✅</button>
              <button className="btno" onClick={() => abort(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
      <section id="succesful" ><Succesful sucTasks={sucTasks}  setSucTasks={setSucTasks}/></section>
      <section id="aborted"><Aborted aboTasks={aboTasks}  setAboTasks={setAboTasks}/></section>

    </div>
  );
};

export default Pending;
