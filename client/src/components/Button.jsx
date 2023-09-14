import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

function Button(props) {
  const {
    buttonRef,
    type,
    buttonText,
    primary,
    secondary,
    success,
    warning,
    danger,
    outlinePrimary,
    outlineSecondary,
    outlineWarning,
    width,
    rounded,
    iconStart,
    iconEnd,
    onClick,
    disabled,
  } = props;

  const getRoundedClass = () => {
    if (rounded === "sm") return "rounded-sm";
    if (rounded === "md") return "rounded-md";
    if (rounded === "lg") return "rounded-lg";
    if (rounded === "xl") return "rounded-xl";
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
    if (outlineWarning)
      return `border border-yellow-500 bg-transparent text-yellow-500 ${transition} hover:text-white hover:bg-yellow-500`;
    if (success)
      return `bg-green-500 text-white ${transition} hover:bg-green-600`;
    if (danger) return `bg-red-500 text-white ${transition} hover:bg-red-600`;
    if (warning)
      return `bg-yellow-500 text-white ${transition} hover:bg-yellow-600`;
    return `bg-transparent text-gray-500 ${transition} hover:bg-gray-300/50`;
  };

  const buttonClasses = `flex ${getWidthClass()} items-center whitespace-nowrap justify-center gap-2 px-4 py-2 font-semibold ${getRoundedClass()} ${getVariantClass()} disabled:opacity-50 outline-none`;

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {iconStart && iconStart}
      {buttonText}
      {iconEnd && iconEnd}
    </button>
  );
}

export default Button;
