import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashBoard/DashboardLayout";
import Login from "../pages/DashBoard/Login";
import DashboardHome from "../pages/DashBoard/Home";
import About from "../pages/DashBoard/About";
import Media from "../pages/DashBoard/Media/Media";
import Perfil from "../pages/DashBoard/Perfil/Perfil";
import Team from "../pages/DashBoard/Team/Team";
import Error404Dashboard from "../pages/DashBoard/404Dashboard";
import Contact from "../pages/DashBoard/Contact/Contact";
import ResetPassword from "../pages/DashBoard/ResetPassword/ResetPassword";
import Recovery from "../pages/DashBoard/Recovery";
import Category from "../pages/DashBoard/Category/Category";
import Period from "../pages/DashBoard/Period/Period";
import DashboardHistoriesTimeline from "../pages/DashBoard/DashboardHistoriesTimeline/DashboardHistoriesTimeline";
import DashboardContributionLine from "../pages/DashBoard/DashboardContributionLine/Dashboard_ContributionLine";

const DashboardRoutes = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Si el usuario no tiene token y no está en /dashboard/login, redirigir
  if (
    !token &&
    location.pathname !== "/dashboard/login" &&
    location.pathname !== "/dashboard/recovery"
  ) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return (
    <Routes>
      {/* Login dentro del Dashboard */}
      <Route path="login" element={<Login />} />
      <Route path="recovery" element={<Recovery />} />

      {/* Rutas protegidas */}
      <Route
        path="/*"
        element={
          <DashboardLayout>
            <Error404Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/"
        element={
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        }
      />
      <Route
        path="about"
        element={
          <DashboardLayout>
            <About />
          </DashboardLayout>
        }
      />
      <Route
        path="media"
        element={
          <DashboardLayout>
            <Media />
          </DashboardLayout>
        }
      />
      <Route
        path="perfil"
        element={
          <DashboardLayout>
            <Perfil />
          </DashboardLayout>
        }
      />
      <Route
        path="team"
        element={
          <DashboardLayout>
            <Team />
          </DashboardLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <DashboardLayout>
            <Contact />
          </DashboardLayout>
        }
      />
      <Route
        path="/category"
        element={
          <DashboardLayout>
            <Category />
          </DashboardLayout>
        }
      />

      <Route
        path="/contribution/:id"
        element={
          <DashboardLayout>
            <DashboardContributionLine />
          </DashboardLayout>
        }
      />

      <Route
        path="/period/:year"
        element={
          <DashboardLayout>
            <DashboardHistoriesTimeline />
          </DashboardLayout>
        }
      />

      <Route
        path="/period"
        element={
          <DashboardLayout>
            <Period />
          </DashboardLayout>
        }
      />

      <Route
        path="/reset-password"
        element={
          <DashboardLayout>
            <ResetPassword />
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

export default DashboardRoutes;
