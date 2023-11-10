import React from "react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4 text-gray-500">
      <div className="col-span-2 h-36 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-500 p-6 shadow-sm"></div>
      <div className="h-40 rounded-2xl bg-white  p-4 shadow-sm"></div>
      <div className="row-span-2 h-full rounded-2xl bg-white p-4 shadow-sm"></div>
      <div className="h-96 rounded-2xl bg-white p-4 shadow-sm"></div>
      <div className="h-full rounded-2xl bg-white p-4 shadow-sm"></div>
      <div className="h-96 rounded-2xl bg-white p-4 shadow-sm"></div>
    </div>
  );
}
