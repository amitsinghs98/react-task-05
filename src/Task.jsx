import React from "react";
import { useDrag } from "react-dnd";
import "./App.css";

const Task = ({ id, text }) => {
  const [, drag] = useDrag({
    type: "TASK",
    item: { id, text },
  });

  return (
    <div
      ref={drag}
      style={{
        padding: "6px",
        borderRadius: "20px",
        border: "1px solid   #ccc",
        marginBottom: "6px",
      }}
    >
      {text}
    </div>
  );
};

export default Task;
