import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";

function DashboardHome() {
  return (
    <div className="relative flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-6 space-y-6">
        <h2 className="text-xl font-bold text-center">Dashboard</h2>

        <div className="absolute bottom-0">
          <ThemeSwitcher />
        </div>

        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
              <FiHome className="text-lg" />
              <span>Inicio</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
              <FiUser className="text-lg" />
              <span>Perfil</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
              <FiSettings className="text-lg" />
              <span>Configuración</span>
            </li>
            <li className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-red-500 dark:hover:bg-red-600">
              <FiLogOut className="text-lg" />
              <span>Cerrar sesión</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Aquí puedes ver un resumen de tu actividad.
        </p>

        {/* Contenido de ejemplo */}
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
