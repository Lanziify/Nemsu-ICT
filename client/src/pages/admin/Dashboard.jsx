import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4 [&>div]:rounded-2xl [&>div]:shadow-sm text-gray-500">
      <div className="col-span-2 h-48 bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
      <div className="h-40 bg-white"></div>
      <div className="row-span-2 h-full bg-white"></div>
      <div className="h-96 bg-white"></div>
      <div className="h-full bg-white"></div>
      <div className="h-96 bg-white"></div>
    </div>
  );
}
