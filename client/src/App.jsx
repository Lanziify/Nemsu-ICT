import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
// Routes
import PublicRoutes from "./Routes/PublicRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
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

function App() {
  // const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Hero />} />
        <Route path="*" element={<Notfound />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<ProtectedRoutes allowedUser={false} />}>
        <Route path="home" element={<Home />} />
        <Route path="request" element={<Request />} />
        <Route path="ongoing" element={<Ongoing />} />
        <Route path="completed" element={<Completed />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Notfound />} />
      </Route>
      <Route element={<ProtectedRoutes allowedUser={true} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="requests" element={<Requests />} />
      </Route>
    </Routes>
  );
}

export default App;
