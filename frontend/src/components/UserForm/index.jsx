import React from "react";

import FormInput from "../FormInput";
import Button from "../Button";

const UserForm = ({
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  action,
}) => {
  const isRegisterForm = action === "Sign Up";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ username, password });
      }}
      className="login-form"
    >
      <FormInput
        label="Username"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
      />
      <FormInput
        label="Password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      {isRegisterForm && (
        <FormInput
          label="Repeat Password"
          placeholder="Repeat Password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          type="password"
        />
      )}
      <Button
        style={{ fontSize: "1.2rem", innerHeight: "1.5rem" }}
        type="submit"
      >
        {action}
      </Button>
    </form>
  );
};

export default UserForm;
