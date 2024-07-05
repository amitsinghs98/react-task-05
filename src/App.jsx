import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

const ItemTypes = {
  TASK: "task",
};

const Task = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="task">
      {task}
    </div>
  );
};

const Column = ({ name, tasks, moveTask }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.index, name),
  }));

  return (
    <div ref={drop} className="column">
      <h2>{name}</h2>
      {tasks.map((task, index) => (
        <Task key={index} index={index} task={task} moveTask={moveTask} />
      ))}
    </div>
  );
};

const App = () => {
  const [columns, setColumns] = useState({
    Unplanned: [
      "Task 1",
      "Task 2",
      "Task 3",
      "Task 4",
      "Task 5",
      "Task 6",
      "Task 7",
      "Task 8",
      "Task 9",
    ],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
  });

  const moveTask = (taskIndex, columnName) => {
    const task = columns.Unplanned[taskIndex];
    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };
      newColumns.Unplanned.splice(taskIndex, 1);
      newColumns[columnName].push(task);
      return newColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Column
          name="Unplanned"
          tasks={columns.Unplanned}
          moveTask={moveTask}
        />
        <Column name="Monday" tasks={columns.Monday} moveTask={moveTask} />
        <Column name="Tuesday" tasks={columns.Tuesday} moveTask={moveTask} />
        <Column
          name="Wednesday"
          tasks={columns.Wednesday}
          moveTask={moveTask}
        />
        <Column name="Thursday" tasks={columns.Thursday} moveTask={moveTask} />
      </div>
    </DndProvider>
  );
};

export default App;
