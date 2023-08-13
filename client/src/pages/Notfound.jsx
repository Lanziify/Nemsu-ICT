import React from "react";

export default function Notfound() {
  return (
    <div className="flex h-full w-full items-center">
      <div className="m-auto text-center">
        <h1 className="mb-2 text-9xl font-black text-cyan-500">
          404
        </h1>
        <p className="text-gray-400">Oops, page not found.</p>
      </div>
    </div>
  );
}
