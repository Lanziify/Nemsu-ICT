import React from "react";
import RequestForm from "../components/RequestForm";
import { useAuth } from "../contexts/AuthContext";

export default function Request() {
  const { user } = useAuth();
  return (
    <>
      <div className="h-full grid place-items-center bg-gray-300">
        <div className="max-w-md border rounded-md bg-gray-50 overflow-hidden">
          <RequestForm user={user} />
        </div>
      </div>
    </>
  );
}
