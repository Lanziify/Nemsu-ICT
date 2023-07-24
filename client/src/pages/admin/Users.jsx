import React from "react";
import RegistrationForm from "../../components/RegistrationForm";
import { useAuth } from "../../contexts/AuthContext";

export default function Users() {
  const { user } = useAuth();
  return (
    <div className="grid h-full place-items-center">
      <RegistrationForm user={user} />
    </div>
  );
}
