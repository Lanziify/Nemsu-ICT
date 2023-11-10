import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeroHeader from "../components/HeroHeader";

function PublicRoutes() {
  const { user, userToken } = useAuth();
  return !user ? (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <HeroHeader />
      <div className="mx-auto flex h-full w-full max-w-7xl">
        <main className="min-h-[calc(100vh_-_56px)] w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  ) : userToken?.claims?.admin ? (
    <Navigate to={"dashboard"} />
  ) : (
    <Navigate to={"home"} />
  );
}

export default PublicRoutes;
