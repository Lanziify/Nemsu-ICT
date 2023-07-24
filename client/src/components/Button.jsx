import React from "react";

function Button(props) {
  const {
    type,
    buttonText,
    primary,
    secondary,
    success,
    warning,
    danger,
    outlinePrimary,
    outlineSecondary,
    width,
    rounded,
    iconStart,
    iconEnd,
    onClick,
  } = props;

  const getRoundedClass = () => {
    if (rounded === "sm") return "rounded-sm";
    if (rounded === "md") return "rounded-md";
    if (rounded === "lg") return "rounded-lg";
    if (rounded === "full") return "rounded-full";
    return "";
  };

  const getWidthClass = () => {
    if (width === "full") return "w-full";
  };

  const getVariantClass = () => {
    const transition = "transition-all duration-300 ease-in-out";

    if (primary)
      return `bg-cyan-500 text-white ${transition} hover:bg-cyan-600`;
    if (secondary)
      return `bg-gray-400/70 text-white ${transition} hover:bg-gray-500/70`;
    if (outlinePrimary)
      return `border border-cyan-500 bg-transparent text-cyan-500 ${transition} hover:text-white hover:bg-cyan-500`;
    if (outlineSecondary)
      return `border border-gray-400 bg-transparent text-gray-400 ${transition} hover:text-white hover:bg-gray-400`;
    if (success)
      return `bg-green-500 text-white ${transition} hover:bg-green-600`;
    if (danger) return `bg-red-500 text-white ${transition} hover:bg-red-600`;
    if (warning)
      return `bg-yellow-500 text-white ${transition} hover:bg-yellow-600`;
    return `bg-transparent text-gray-500 ${transition} hover:bg-gray-300/50`;
  };

  const buttonClasses = `flex ${getWidthClass()} items-center justify-center gap-2 px-4 py-2 font-semibold ${getRoundedClass()} ${getVariantClass()} outline-none`;

  return (
    <button className={buttonClasses} type={type || "button"} onClick={onClick}>
      {iconStart && iconStart}
      {buttonText || "Button"}
      {iconEnd && iconEnd}
    </button>
  );
}

export default Button;
