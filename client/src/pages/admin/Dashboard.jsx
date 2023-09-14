import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { requests } = useSelector((state) => state.requests);
  return (
    <div className="grid grid-cols-2 gap-4 text-gray-500 [&>div]:rounded-2xl [&>div]:shadow-sm">
      <div className="col-span-2 h-48 bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
      <div className=" bg-white">
      </div>
      <div className="row-span-2 h-full bg-white"></div>
      <div className="h-96 bg-white"></div>
      <div className="h-full bg-white"></div>
      <div className="h-96 bg-white"></div>
    </div>
  );
}
