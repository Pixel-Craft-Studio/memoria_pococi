import Sidebar from "../../pages/DashBoard/Sidebar";
import DashboardHeader from "../DashboardHeader";
import TemporalPassword from "./TemporalPassword";

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  return (
    <div>
      <TemporalPassword></TemporalPassword>
      <DashboardHeader></DashboardHeader>
      <Sidebar />
      <main className="md:ml-50">{children}</main>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
