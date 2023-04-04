import React, { useState } from "react";

import "./index.css";

import TodoItemForm from "./form";
import TodoItemReadOnly from "./item";

const TodoItem = ({ onTodoChange, onTodoDelete, ...todoProp }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todoProp.title);
  const [description, setDescription] = useState(todoProp.description);

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onDeleteClick = (todo) => {
    onTodoDelete(todo);
  };

  const onSaveClick = (todo) => {
    onTodoChange({ ...todoProp, ...todo });
    setIsEditing(false);
  };

  const onCancelClick = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <TodoItemForm
      {...todoProp}
      onSuccess={onSaveClick}
      onCancel={onCancelClick}
      title={title}
      description={description}
      setTitle={setTitle}
      setDescription={setDescription}
      isEditForm={true}
    />
  ) : (
    <TodoItemReadOnly
      {...todoProp}
      onTodoChange={onTodoChange}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    />
  );
};

export default TodoItem;
