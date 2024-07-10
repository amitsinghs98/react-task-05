import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskList from "./TaskList";
import "./App.css";

const App = () => {
  const initialTasks = [
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
    { id: 4, text: "Task 4" },
    { id: 5, text: "Task 5" },
    { id: 6, text: "Task 6" },
    { id: 7, text: "Task 7" },
    { id: 8, text: "Task 8" },
    { id: 9, text: "Task 9" },
  ];

  const [taskLists, setTaskLists] = useState([
    { title: "Unplanned", tasks: initialTasks },
    { title: "Monday", tasks: [] },
    { title: "Tuesday", tasks: [] },
    { title: "Wednesday", tasks: [] },
    { title: "Thursday", tasks: [] },
  ]);

  const handleDrop = (task, targetListTitle) => {
    const targetListIndex = taskLists.findIndex(
      (list) => list.title === targetListTitle
    );

    if (taskLists[targetListIndex].tasks.some((t) => t.id === task.id)) {
      return;
    }

    const updatedLists = taskLists.map((list, index) => {
      if (index === targetListIndex) {
        return {
          ...list,
          tasks: [...list.tasks, task].sort((a, b) => a.id - b.id),
        };
      } else {
        return { ...list, tasks: list.tasks.filter((t) => t.id !== task.id) };
      }
    });

    setTaskLists(updatedLists);
  };

  return (
    <>
      {" "}
      <h2>Task 5: Drag & Drop Task List</h2>
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <div style={{ display: "flex" }}>
            {taskLists.map((list, index) => (
              <TaskList
                key={index}
                title={list.title}
                tasks={list.tasks}
                onDrop={(task) => handleDrop(task, list.title)}
              />
            ))}
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default App;
