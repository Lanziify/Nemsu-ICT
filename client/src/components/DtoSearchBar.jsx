import React from "react";
import { FaSearch } from "react-icons/fa";

const DtoSearchBar = (props) => {
  return (
    <div className="flex flex-1 items-center">
      <FaSearch className="absolute ml-4 text-gray-400" size={18} />
      <input
        className="w-full rounded-full bg-white p-2 pl-[48px] text-gray-400 shadow-sm outline-none"
        type="text"
        placeholder="Search"
        onChange={props.onChange}
      />
    </div>
  );
};

export default DtoSearchBar;
