import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

function DashboardHome() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6">
        <h2 className="text-xl font-bold text-center">Dashboard</h2>

        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <FiHome className="text-lg" />
              <span>Inicio</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <FiUser className="text-lg" />
              <span>Perfil</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
              <FiSettings className="text-lg" />
              <span>Configuración</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 cursor-pointer">
              <FiLogOut className="text-lg" />
              <span>Cerrar sesión</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
        <p className="text-gray-400 mt-2">Aquí puedes ver un resumen de tu actividad.</p>

        {/* Contenido de ejemplo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Usuarios Activos</h3>
            <p className="text-2xl font-bold mt-2">1,250</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Ventas Hoy</h3>
            <p className="text-2xl font-bold mt-2">$3,400</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Nuevos Mensajes</h3>
            <p className="text-2xl font-bold mt-2">28</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardHome;
