import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashBoard/DashboardLayout";
import Login from "../pages/DashBoard/Login";
import DashboardHome from "../pages/DashBoard/Home"; // Página principal del Dashboard

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/login" element={<Login />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
