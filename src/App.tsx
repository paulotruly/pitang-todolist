import { useState, useEffect, useCallback } from "react";

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

function Timer() {

  const [tempoRestante, setTempoRestante] = useState(25 * 60);
  const [estaAtivo, setEstaAtivo] = useState(false);
  const [modo, setModo] = useState("focus");

  useEffect(() => {
    let intervalo: ReturnType<typeof setInterval> | undefined;

    if (estaAtivo && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante((valorAnterior) => valorAnterior - 1);
      }, 1000);
    } else if (tempoRestante === 0) {
      setEstaAtivo(false);
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [estaAtivo, tempoRestante])

  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;

  const tempoFormatado = `${minutos.toString().padStart(2, "0")}:${segundos
  .toString()
  .padStart(2, "0")}`;

  const trocarModo = useCallback((novoModo: string, minutos: number) => {
  setModo(novoModo);
  setTempoRestante(minutos * 60);
  setEstaAtivo(false);
  }, []);

  const coresDoModo: Record<string, string> = {
  focus: "text-red-400",
  short: "text-green-400",
  long: "text-blue-400",
  };  

  return (
    <>
      <div className="flex flex-row justify-center items-center w-auto gap-5">

        <button
        onClick={() => trocarModo("focus", 25)}
        className="text-slate-500 px-7 py-2 rounded-full transition-colors duration-200 hover:bg-slate-700 hover:text-white"> Focus </button>

        <button
        onClick={() => trocarModo("short", 5)}
        className="text-slate-500 px-7 py-2 rounded-full transition-colors duration-200 hover:bg-slate-700 hover:text-white"> Short Break </button>

        <button
        onClick={() => trocarModo("long", 15)}
        className="text-slate-500 px-7 py-2 rounded-full transition-colors duration-200 hover:bg-slate-700 hover:text-white"> Long Break </button>

      </div>

      <p className={`flex justify-center items-center text-[10vw] transition-colors duration-500 ${coresDoModo[modo]}`}> {tempoFormatado} </p>

      <div className="flex flex-row justify-center items-center w-auto gap-5">

        <button
        onClick={() => {
          setEstaAtivo(!estaAtivo);
        }}
        className="bg-white text-slate-700 px-10 py-2 rounded-full"> Start </button>

        <button
        onClick={() => {
          setEstaAtivo(false);
          setTempoRestante(modo === "focus" ? 25 * 60 : modo === "short" ? 5 * 60 : 15 * 60);
        }}
        className="border border-slate-600 text-white px-10 py-2 rounded-full"> Reset </button>

      </div>
    </>
  )
}
 
export default function Pomodoro() {
  return (
    <div className= "flex flex-col items-center bg-slate-900 min-h-screen w-screen">

      <div className="flex flex-col items-center gap-3 m-10 p-10 w-1/3">
        <Timer/>
      </div>
      
      <div className="flex flex-col items-center gap-3 m-10 p-10 w-1/3">

        <h1 className="text-gray-400">Tasks</h1>
        <Tasks/>

      </div>

    </div>
  );
}
