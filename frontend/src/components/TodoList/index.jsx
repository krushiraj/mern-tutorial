import React, { useState } from "react";

import "./index.css";

import TodoListForm from "./form";
import TodoListReadOnly from "./item";

const TodoListItem = ({ onListChange, onListDelete, ...listProp }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(listProp.name);

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onDeleteClick = (list) => {
    onListDelete(list);
  };

  const onSaveClick = (list) => {
    onListChange({ ...listProp, ...list });
    setIsEditing(false);
  };

  const onCancelClick = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <TodoListForm
      {...listProp}
      onSuccess={onSaveClick}
      onCancel={onCancelClick}
      name={name}
      setName={setName}
      isEditForm={true}
    />
  ) : (
    <TodoListReadOnly
      {...listProp}
      onTodoChange={onListChange}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    />
  );
};

export default TodoListItem;
