import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashBoard/DashboardLayout";
import Login from "../pages/DashBoard/Login";
import DashboardHome from "../pages/DashBoard/Home"; // Página principal del Dashboard
import About from "../pages/DashBoard/About";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
