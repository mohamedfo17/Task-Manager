"use client";
interface SuccesfulProps {
  sucTasks: string[];
  setSucTasks: React.Dispatch<React.SetStateAction<string[]>>;
}
const Succesful:  React.FC<SuccesfulProps> = ({sucTasks,setSucTasks}) => {
  

  

  function done(index: number) {
    const newSucTasks = [...sucTasks.slice(0, index), ...sucTasks.slice(index + 1)];

    if (newSucTasks.length > 0) {
        setSucTasks(newSucTasks);
        localStorage.setItem("sucTasks", JSON.stringify(newSucTasks)); 
    } else {
        setSucTasks([]);
        localStorage.removeItem("sucTasks"); 
    }
}


  return (
    <div className="text-black mt-10">
      <div className="flex flex-row gap-10 text-2xl mb-3">
        <h3>✅ SUCCESSFUL TASKS :</h3>
        <p>{sucTasks.length} TASKS Completed</p>
      </div>
      <div>
        <ul >
          {sucTasks.map((ele, index) => (
            <li key={index} className="text-2xl my-1.5 before:content-['✔️'] break-words">
              {ele}
              <button className="btn btn-circle bg-[#3ED661] border-opacity-0 ml-[5%] btn-sm cursor-pointer hover:opacity-70 border-none text-2xl" onClick={() => done(index)}>✔</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Succesful;
