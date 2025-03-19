import Sidebar from "../../pages/DashBoard/Sidebar";

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
    return (
      <div>
        <Sidebar />
        <main className="ml-50">{children}</main>
        <Sidebar />
      </div>
    );
  };
  
  export default DashboardLayout;
  