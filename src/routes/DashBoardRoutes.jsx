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
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
