import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
// Routes
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
// Public Pages
import Hero from "./pages/Hero";
import Notfound from "./pages/Notfound";
// Import user pages
import Home from "./pages/user/Home";
import Request from "./pages/user/Request";
import Settings from "./pages/user/Settings";
import Ongoing from "./pages/user/Ongoing";
import Completed from "./pages/user/Completed";
// Import admin pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Requests from "./pages/admin/Requests";
import RequestDetails from "./pages/admin/RequestDetails";
import { useAuth } from "./contexts/AuthContext";
import Notifications from "./pages/Notifications";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<ProtectedRoutes allowedUser={[true]} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="list/:tab" element={<Requests />} />
        <Route path="list" element={<Navigate replace to='/list/pending' />} />
        <Route path="list/:tab/request/:id" element={<RequestDetails />} />
        <Route path="notifications/request/:id" element={<RequestDetails />} />
        <Route path="" element={<Navigate replace to='' />} />
      </Route>

      <Route element={<ProtectedRoutes allowedUser={[false]} />}>
        <Route path="home" element={<Home />} />
        <Route path="ongoing" element={<Ongoing />} />
        <Route path="ongoing/request/:requestId" element={<RequestDetails />} />
        <Route path="completed" element={<Completed />} />
      </Route>

      {/* {user && ( */}
      <Route element={<ProtectedRoutes allowedUser={[true, false]} />}>
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Notfound />} />
      </Route>
      {/* )} */}
      <Route element={<PublicRoutes />}>
        <Route path="/" index element={<Hero />} />
      </Route>
    </Routes>
  );
}

export default App;
