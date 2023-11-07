import React from "react";
import RegistrationForm from "../../components/RegistrationForm";
import { useAuth } from "../../contexts/AuthContext";

export default function Users() {
  const { user } = useAuth();
  return (
    <div className="">
      <RegistrationForm user={user} />
    </div>
  );
}
