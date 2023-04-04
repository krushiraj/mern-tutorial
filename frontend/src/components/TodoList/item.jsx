import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";
import ProgressBar from "../ProgressBar";

const TodoListItem = ({ onEditClick, onDeleteClick, ...list }) => {
  const { _id, name, created, totalCount, doneCount } = list;
  return (
    <div className="todo-list-item">
      <div className="todo-list-item__name">
        <Link to={`/list/${_id}`}>{name}</Link>
        <div className="button-container">
          <Button
            fill={false}
            style={{
              fontSize: "0.7rem",
              color: "blue",
              border: "1px solid blue",
            }}
            onClick={() => onEditClick(list)}
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
            onClick={() => onDeleteClick(list)}
          >
            Delete 🗑️
          </Button>
        </div>
      </div>
      <ProgressBar progress={Math.round((doneCount / (totalCount || 1)) * 100)} />
      <div className="todo-list-item__meta">
        <span className="todo-list-item__created">Created On: {created}</span>
        <span className="todo-list-item__count">Count: {totalCount}</span>
      </div>
    </div>
  );
};

export default TodoListItem;
