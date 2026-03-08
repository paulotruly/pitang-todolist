import { useState } from "react";

type Task = {
  completed: boolean;
  id: string;
  title: string;
};

function Tasks() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function onSaveTask() {
    setTasks([
      ...tasks,
      { completed: false, id: crypto.randomUUID(), title: input },
    ]);

    setInput("");
  }

  function completeTask({ id }: Task) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      }),
    );
  }

  return (
    <>
      <div>
        <input
          className="p-2 border-1"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="rounded p-2 bg-black" onClick={onSaveTask}>
          Save
        </button>
      </div>

      <ul>
        {tasks.map((task) => {
          return (
            <li
              className={task.completed ? "line-through" : ""}
              key={task.id}
              onClick={() => completeTask(task)}
            >
              {task.title} {String(task.completed)}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function Pomodoro() {
  return (
    <div className="bg-slate-900 h-screen w-screen text-white">
      <h1>Tasks</h1>

      <Tasks />
    </div>
  );
}
