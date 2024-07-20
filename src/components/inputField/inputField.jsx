import React from "react";

const InputField = React.memo(
  ({
    label,
    name,
    value,
    onChange,
    type = "text",
    fullWidth = false,
    options = [],
  }) => {
    return (
      <div className={fullWidth ? "col-span-2" : ""}>
        <label htmlFor={name} className="block text-gray-600 text-lg font-bold mb-2">
          {label}
        </label>
        {type === "select" ? (
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="bg-gray-100 rounded-xl w-full py-4 px-4 text-gray-600 text-md leading-tight focus:outline-none focus:shadow-outline"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value} className="me-5 text-xl text-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="bg-gray-100 rounded-xl w-full py-4 px-4 text-gray-600 text-md leading-tight focus:outline-none focus:shadow-outline"
          />
        )}
      </div>
    );
  }
);

export default InputField;
