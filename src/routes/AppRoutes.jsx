import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Team from "../pages/Teams";
import Layout from "../components/Layout";
import DashboardRoutes from "./DashBoardRoutes";
import InitialTimeline from "../pages/InitialTimeline";
import Contribute from "../pages/Contribute/Contribute";
import { ContentProvider } from "../pages/Contribute/ContentContext";
import Error404 from "../pages/404";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas con el Layout principal */}
        <Route path="/*" element={<Layout><Error404 /></Layout>}/>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        {/* <Route path="/contact" element={<Layout><Contact /></Layout>} /> */}
        <Route path="/contacto" element={<Layout><Contact /></Layout>} />

        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/team" element={<Layout><Team /></Layout>} />
        <Route path="/linea-inicial" element={<Layout><InitialTimeline /></Layout>} />
        <Route path="/aportar" element={<Layout><ContentProvider><Contribute /></ContentProvider></Layout>} />
        {/* Rutas del Dashboard independientes */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/*" element={<div>404</div>} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
