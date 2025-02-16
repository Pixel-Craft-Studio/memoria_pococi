import Sidebar from "../DashBoard/Sidebar";

function DashboardHome() {
  return (
    <div className="relative flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white duration-300 ease-in-out">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Aquí puedes ver un resumen de tu actividad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Usuarios Activos</h3>
            <p className="text-2xl font-bold mt-2">1,250</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Ventas Hoy</h3>
            <p className="text-2xl font-bold mt-2">$3,400</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Nuevos Mensajes</h3>
            <p className="text-2xl font-bold mt-2">28</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardHome;
