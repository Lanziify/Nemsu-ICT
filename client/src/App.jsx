import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import Hero from "./pages/Hero";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";
import Request from "./pages/Request";
import Settings from "./pages/Settings";
import Ongoing from "./pages/Ongoing";
import Completed from "./pages/Completed";

function App() {
  return (
    <>
      <Routes>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
