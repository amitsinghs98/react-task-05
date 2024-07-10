import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import "./App.css";

const TaskList = ({ title, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: "200px",
        padding: "16px",
        border: "2px solid #ccc",
        marginRight: "16px",
        backgroundColor: isOver ? "lightgray" : "white",
      }}
    >
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Task key={`${title}_${task.id}_${index}`} {...task} />
      ))}
    </div>
  );
};

export default TaskList;
