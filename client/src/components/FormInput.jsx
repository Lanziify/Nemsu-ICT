import React, { useState } from "react";

function FormInput(props) {
  const [focus, setFocus] = useState(false);
  const { label, name, type, placeholder, height, onChange, value, error } =
    props;

  function handleFocus() {
    setFocus(true);
  }
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-gray-400 font-medium">{label}</label>}
      <input
        className="w-full p-2 rounded-md text-gray-500 bg-gray-200  hover:bg-gray-300 outline-none transition duration-300 ease-in-out"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder ? placeholder : "Placeholder"}
        height={height}
        onChange={onChange}
        onBlur={handleFocus}
      />
      {error && (
        <span className="text-start text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}

export default FormInput;
