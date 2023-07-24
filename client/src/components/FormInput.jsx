import React, { useState } from "react";
import { motion } from "framer-motion";
import { popUpItem } from "../animations/variants";

function FormInput(props) {
  // const [focus, setFocus] = useState(false);
  const { label, name, type, placeholder, height, onChange, value, error } =
    props;

  // function handleFocus() {
  //   setFocus(true);
  // }
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <motion.label
          variants={popUpItem}
          className="font-medium text-xs text-gray-400"
        >
          {label}
        </motion.label>
      )}
      <motion.input
        variants={popUpItem}
        className="w-full border rounded p-2 text-gray-500  outline-none  "
        name={name}
        type={type}
        value={value}
        placeholder={placeholder ? placeholder : "Placeholder"}
        height={height}
        onChange={onChange}
        // onBlur={handleFocus}
      />
      {error && (
        <span className="text-start text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}

export default FormInput;
