import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashBoard/DashboardLayout";
import Login from "../pages/DashBoard/Login";
import DashboardHome from "../pages/DashBoard/Home"; // Página principal del Dashboard
import About from "../pages/DashBoard/About";
import Media from "../pages/DashBoard/Media/Media";
import Perfil from "../pages/DashBoard/Perfil/Perfil";
import Team from "../pages/DashBoard/Team/Team";

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Login fuera del DashboardLayout */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas dentro del DashboardLayout */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        }
      />
      <Route
        path="/about"
        element={
          <DashboardLayout>
            <About />
          </DashboardLayout>
        }
      />
      <Route
        path="/media"
        element={
          <DashboardLayout>
            <Media />
          </DashboardLayout>
        }
      />
      <Route
        path="/perfil"
        element={
          <DashboardLayout>
            <Perfil />
          </DashboardLayout>
        }
      />
      <Route
        path="/team"
        element={
          <DashboardLayout>
            <Team />
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

export default DashboardRoutes;
