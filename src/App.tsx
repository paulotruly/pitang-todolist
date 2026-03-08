import { useState } from "react";

type Task = {
  completed: boolean;
  id: string;
  title: string;
};

function Tasks() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false);

  function onSaveTask() {
    setTasks([
      ...tasks,
      { completed: false, id: crypto.randomUUID(), title: input },
    ]);

    setInput("");
  }

  function completeTask({ id }: Task) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();

        if (input.trim() === "") {
          setError(true);
          return;
        }

        setError(false);
        onSaveTask();
      }}>

        <input
          className="p-3 w-[300px] mr-3 rounded-md border-1 bg-white/10 border border-white/20 text-white hover:border-white/50"
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="rounded-md p-3 w-auto px-4 bg-white text-slate-900" type="submit">
          Add
        </button>

        {error && (
          <p className="text-red-500 bg-red-900 border border-red-500 p-2 rounded-md text-sm mt-5">
            Type something before adding!
          </p>
        )}

      </form>

      <ul className="w-full flex flex-col items-center justify-center mt-20">
        {tasks.length === 0 ? (
          <p className="text-slate-600">No tasks yet</p>
        ) : (
          tasks.map((task) => (

            <li
              key={task.id}
              className={` bg-slate-800/60 w-full rounded-md flex flex-row justify-between mb-3 p-5 text-white hover:bg-slate-700 transition-colors ease-linear
              cursor-pointer`}
            >

              {/* ${task.completed ? "line-through opacity-50" : ""} */}

              {task.title}
              
              <button
              onClick={() => completeTask(task)}
              className="text-[17px] text-slate-500 transition-colors ease-linear hover:text-red-500"> × </button>
            </li>
            
          ))
        )}
      </ul>

    </>
  );
}

export default function Pomodoro() {
  return (
    <div className= "flex justify-center bg-slate-900 h-screen w-screen">
      
      <div className="flex flex-col items-center gap-3 m-10 p-10 w-1/3">

        <h1 className="text-gray-400">Tasks</h1>
        <Tasks/>

      </div>

    </div>
  );
}
