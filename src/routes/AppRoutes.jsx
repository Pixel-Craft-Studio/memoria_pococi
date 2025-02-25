import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Team from "../pages/Teams";
import Layout from "../components/Layout";
import DashboardRoutes from "./DashBoardRoutes";
import InitialTimeline from "../pages/InitialTimeline";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas con el Layout principal */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/team" element={<Layout><Team /></Layout>} />
        <Route path="/linea-inicial" element={<Layout><InitialTimeline /></Layout>} />

        {/* Rutas del Dashboard independientes */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
