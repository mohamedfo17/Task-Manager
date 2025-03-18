'use client'
import Image from "next/image";
import Pending from "./pending/page";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
export default function Home() {
  const [tasks, setTasks] = useState<string[]>(() => {
    const storedTasks = window.localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  function addTask() {
    const inputElement = document.querySelector("input");
    if (inputElement && inputElement.value) {
      setTasks([...tasks, inputElement.value]);
      window.localStorage.setItem("tasks",JSON.stringify([...tasks, inputElement.value]));
      inputElement.value="";
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Task not valid!",
      });
    }
  }
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        addTask();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [tasks]);

  return (
    <main className="flex flex-col items-center justify-center h-[100%] bg-[#F6F5F3] w-[100%]">
      <ul className="menu menu-horizontal bg-base-200 rounded-box w-full max-w-md flex justify-center items-center  gap-4 ">
        <li><a className="text-[#B19F46]" href="#pending">PENDING</a></li>
        <li><a className="text-[#299241] " href="#succesful">SUCCESSFUL</a></li>
        <li><a className="text-[#9D1517] " href="#aborted">ABORTED</a></li>
      </ul>
      <div className="flex flex-row gap-[3%]">
      <h1 className="mt-20 text-black text-3xl font-bold ml-[10%] ">TASK MANAGER:</h1>
      <br /><h3 className="mt-30 text-black text-2xl">STOP WASTING TIME AND GRIND</h3>
      </div>
     
      <div className="mt-15 flex flex-row gap-[5%]">
        <input type="text" placeholder="Enter Your Task" className="input input-bordered w-96 max-w-xs bg-white text-black rounded-2xl focus:bg-stone-300" />
        <button className="btn bg-base-300 rounded-xl" onClick={addTask}>Submit</button>
      </div>
     <section id="pending" className="justify-center w-[36%]"><Pending tasks={tasks} setTasks={setTasks} /></section>

    </main>);
}
