import React from "react";

export default function Select({
  label,
  options,
  value,
  onChange,
  name,
  className,
  loading,
}) {
  return (
    <div className="mb-3">
      {label ? (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      ) : null}
      <select
        className={`form-select ${className}`}
        aria-label="Default select example"
        value={value}
        onChange={onChange}
        name={name}
      >
        <option defaultChecked>Open this select menu</option>
        {loading ? (
          <option value="loading" defaultChecked />
        ) : (
          options?.map((option, i) => (
            <option key={option.id || i} value={option.id}>
              {option.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
