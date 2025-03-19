import Sidebar from "../Sidebar/Sidebar"; // Importa el Sidebar

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar global */}
      <main className="flex-1 ml-64 p-4"> {/* Ajusta el margen izquierdo */}

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
