import React from "react";

import Button from "../Button";

const TodoItemReadOnly = ({
  title,
  state,
  description,
  _id,
  onTodoChange,
  onEditClick,
  onDeleteClick,
}) => {
  const todo = {
    title,
    state,
    description,
    _id,
  };

  const stateToColor = {
    TODO: "orange",
    DOING: "blue",
    DONE: "green",
  };

  const handleTodoStateChange = (doneCountState = null) => {
    const currentState = state;
    let newState = "";

    if (doneCountState === null) {
      if (currentState === "TODO") {
        newState = "DOING";
      } else {
        newState = "TODO";
      }
    } else {
      newState = doneCountState ? "DONE" : "TODO";
    }
    const updatedTodo = {
      ...todo,
      state: newState,
    };
    onTodoChange(updatedTodo);
  };

  return (
    <div className="todo-item">
      <div className="title-row">
        <input
          type="checkbox"
          checked={state === "DONE"}
          onChange={() => handleTodoStateChange(state !== "DONE")}
        />
        <Button
          style={{
            color: stateToColor[state],
            background: "none",
            fontWeight: "bold",
            padding: 0,
          }}
          onClick={() => handleTodoStateChange()}
        >
          {state}
        </Button>
        <h3>{title}</h3>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="button-container">
        <Button
          fill={false}
          style={{
            fontSize: "0.7rem",
            color: "blue",
            border: "1px solid blue",
          }}
          onClick={() => onEditClick(todo)}
        >
          Edit ✏️
        </Button>
        <Button
          fill={false}
          style={{
            fontSize: "0.7rem",
            color: "red",
            border: "1px solid red",
          }}
          onClick={() => onDeleteClick(todo)}
        >
          Delete 🗑️
        </Button>
      </div>
    </div>
  );
};

export default TodoItemReadOnly;
