// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
    return (
      <div className="dashboard-container">
        <main className="content flex flex-col">{children}</main>
      </div>
    );
  };
  
  export default DashboardLayout;
  