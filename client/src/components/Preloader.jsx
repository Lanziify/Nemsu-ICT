import React from "react";
import dtoLogo from "../assets/dtoLogo.svg";

function Preloader() {
  return (
    <div className="m-auto animate-pulse">
      <img src={dtoLogo} alt="DTO logo" className="h-[24px] min-w-[24px]" />
    </div>
  );
}

export default Preloader;
