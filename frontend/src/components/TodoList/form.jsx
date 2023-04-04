import React from "react";

import Button from "../Button";
import FormInput from "../FormInput";

const AddTodoListForm = ({
  onSuccess,
  onCancel,
  name,
  setName,
  isEditForm = false,
  ...list
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
        onSuccess({ ...list, name });
      }}
    >
      <FormInput
        label="Name"
        placeholder="New List Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="button-container">
        <Button style={{ fontSize: "1rem" }} disabled={!name}>
          {isEditForm ? "Save" : "+ Add List"}
        </Button>
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

export default AddTodoListForm;
