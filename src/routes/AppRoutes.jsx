import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import Contact from "../pages/Contact";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
