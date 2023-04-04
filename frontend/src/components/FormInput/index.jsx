import React from "react";

import "./index.css";

const FormInput = ({
  placeholder,
  label,
  onChange = () => {},
  value = "",
  ...props
}) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={label}>
        {label}
      </label>
      <input
        className="form-input"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export default FormInput;
