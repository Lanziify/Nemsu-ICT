import React from "react";
import RequestForm from "../../components/RequestForm";
import { useAuth } from "../../contexts/AuthContext";


export default function Request() {
  const { user } = useAuth();
  return (
    <>
      <div className="h-full p-4">
          <RequestForm user={user} />
      </div>
    </>
  );
}
