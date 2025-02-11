import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Layout from "../components/Layout";
import Team from "../pages/Teams";


const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/team" element={<Team/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
