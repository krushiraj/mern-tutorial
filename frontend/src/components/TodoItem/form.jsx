import React from "react";

import Button from "../Button";
import FormInput from "../FormInput";

const TodoItemForm = ({
  onSuccess,
  onCancel,
  title,
  description,
  setTitle,
  setDescription,
  isEditForm = false,
  ...todo
}) => {
  return (
    <form
      style={{
        border: "1px solid #dedede",
        borderRadius: "5px",
        margin: "1rem 0",
        padding: "0.5rem",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess({ ...todo, title, description });
      }}
    >
      <FormInput
        label="Title"
        placeholder="TODO Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormInput
        label="Description"
        placeholder="TODO Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="button-container">
        <Button type="submit">{isEditForm ? "Save" : "+ Add Todo"}</Button>
        <Button
          fill={false}
          style={{ color: "red", border: "1px solid red" }}
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TodoItemForm;
