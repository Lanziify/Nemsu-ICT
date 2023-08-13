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
    <motion.div variants={popUpItem} className="flex w-full flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-gray-400">{label}</label>
      )}
      <input
        className="w-full border-b p-2 text-gray-500  outline-none  "
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
    </motion.div>
  );
}

export default FormInput;
