import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/header";

function PublicRoutes() {
  const { user, userProfile } = useAuth();
  return !user ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : userProfile?.claims?.admin ? (
    <Navigate to={"dashboard"} />
  ) : (
    <Navigate to={"home"} />
  );
}

export default PublicRoutes;
