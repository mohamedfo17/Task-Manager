"use client";
interface AbortedProps {
  aboTasks: string[];
  setAboTasks: React.Dispatch<React.SetStateAction<string[]>>;
}
const Aborted:  React.FC<AbortedProps> = ({aboTasks,setAboTasks}) => {
  

  

  function abo(index: number) {
    const newAboTasks = [...aboTasks.slice(0, index), ...aboTasks.slice(index + 1)];

    if (newAboTasks.length > 0) {
        setAboTasks(newAboTasks);
        localStorage.setItem("aboTasks", JSON.stringify(newAboTasks)); 
    } else {
        setAboTasks([]);
        localStorage.removeItem("aboTasks"); 
    }
}

  return (
    <div className="text-black my-10">
      <div className="flex flex-row gap-10 text-2xl mb-3">
        <h3>❌ ABORTED TASKS :</h3>
        <p>{aboTasks.length} TASKS Aborted</p>
      </div>
      <div>
        <ul >
          {aboTasks.map((ele, index) => (
            <li key={index} className="text-2xl my-1.5 before:content-['🚫'] break-words">
              {ele}
              <button className="btn btn-circle bg-[#F6F5F3] ml-[5%] btn-sm cursor-pointer hover:opacity-70 border-none text-2xl" onClick={() => abo(index)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Aborted;
