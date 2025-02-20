import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashBoard/DashboardLayout";
import Login from "../pages/DashBoard/Login";
import DashboardHome from "../pages/DashBoard/Home"; // Página principal del Dashboard
import About from "../pages/DashBoard/About";
import Teams from "../pages/DashBoard/Teams";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/teams" element={<Teams />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
