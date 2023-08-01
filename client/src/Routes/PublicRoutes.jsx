import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeroHeader from "../components/HeroHeader";

function PublicRoutes() {
  const { user, userProfile } = useAuth();
  return !user ? (
    <>
      <HeroHeader />
      <Outlet />
    </>
  ) : userProfile?.claims?.admin ? (
    <Navigate to={"dashboard"} />
  ) : (
    <Navigate to={"home"} />
  );
}

export default PublicRoutes;
