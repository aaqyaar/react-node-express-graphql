import React from "react";

export default function TextField({
  label,
  placeholder,
  type,
  value,
  name,
  onChange,
  isRequired,
  errors,
  className,
  InputProps,
  otherProps,
}) {
  return (
    <div className="mb-3">
      {label ? (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      ) : null}

      <div
        className={`${
          InputProps ? "input-group has-validation" : "has-validation"
        }`}
      >
        {InputProps ? (
          <span className="input-group-text">
            {InputProps ? InputProps : ""}
          </span>
        ) : null}
        <input
          type={type}
          className={`form-control ${className}`}
          id={label}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...otherProps}
          aria-describedby="inputGroupPrepend"
          required={isRequired}
        />
        {errors ? <div className="invalid-feedback">{errors}</div> : null}
      </div>
    </div>
  );
}
