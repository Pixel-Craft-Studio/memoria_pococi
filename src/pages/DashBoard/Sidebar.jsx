import { useState, useEffect } from "react";
import { FiHome, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const Sidebar = () => {
  const location = useLocation();

  const [isOpen] = useLocalStorage("isSidebarOpen", true);

  // Determinar si la sección de configuración está activa

  const isConfigActive = ["/dashboard/about", "/dashboard/media", "/dashboard/perfil", "/dashboard/team", "/dashboard/contact", "/dashboard/category"].includes(location.pathname);




  const [isConfigOpen, setIsConfigOpen] = useState(() => {
    return localStorage.getItem("isConfigOpen") === "true" && isConfigActive;
  });

  useEffect(() => {
    localStorage.setItem("isConfigOpen", isConfigOpen);
  }, [isConfigOpen]);

  useEffect(() => {
    // Si el usuario navega fuera de configuración, se cierra
    if (!isConfigActive) {
      setIsConfigOpen(false);
    }
  }, [isConfigActive, location.pathname]);

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  // Función para determinar si una ruta está activa
  const isActive = (path) =>
    location.pathname === path ? "bg-gray-300 dark:bg-gray-700" : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/dashboard/login"; // Redirigir manualmente
  };

  return (
    <div className=" flex dark:text-white">
      {/* Sidebar */}
      <aside
        className={`fixed pt-10 top-0 left-0 h-full bg-gray-200 dark:bg-gray-800 flex flex-col transition-all duration-500 overflow-hidden ${
          isOpen ? "w-50" : "w-0"
        } md:w-50`}
      >
        <div className="min-w-50">


          {/* Navegación */}
          <nav className="flex-1 mt-6">
            <ul className="space-y-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive(
                  "/dashboard"
                )}`}
                onClick={() => setIsConfigOpen(false)} // Cierra configuración si se selecciona otra opción
              >
                <FiHome className="text-lg" />
                <span>Inicio</span>
              </Link>

              <li>
                <button
                  onClick={toggleConfig}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 w-full ${
                    isConfigActive ? "bg-gray-300 dark:bg-gray-700" : ""
                  }`}
                >
                  <FiSettings className="text-lg" />
                  <span>Configuración</span>
                  <FiChevronDown
                    className={`ml-auto transform ${
                      isConfigOpen ? "rotate-180" : ""
                    } transition-transform duration-300`}
                  />
                </button>

                {/* Sección de configuración */}
                <div
                  className={`overflow-hidden ${
                    isConfigOpen ? "mt-2" : "max-h-0"
                  }`}
                >
                  <ul className="pl-8 space-y-3">
                    <Link
                      to="/dashboard/about"
                      className={`flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive(
                        "/dashboard/about"
                      )}`}
                    >
                      <span>Sobre nosotros</span>
                    </Link>

                    <Link
                      to="/dashboard/media"
                      className={`flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive(
                        "/dashboard/media"
                      )}`}
                    >
                      <span>Redes Sociales</span>
                    </Link>

                    <Link
                      to="/dashboard/perfil"
                      className={`flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive(
                        "/dashboard/perfil"
                      )}`}
                    >
                      <span>Perfiles</span>
                    </Link>

                    <Link to="/dashboard/team" className={`flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive("/dashboard/team")}`}>
                    <span>Equipo de trabajo</span>
                  </Link>
                  <Link to="/dashboard/contact" className={`flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive("/dashboard/contact")}`}>
                    <span>Mensajes</span>
                  </Link>
                  <Link to="/dashboard/category" className={`flex items-center space-x-3 p-1 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive("/dashboard/category")}`}>
                    <span>Categoria</span>
                  </Link>
                </ul>
              </div>
            </li>
            <Link
              to=""
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${isActive("/dashboard/reportes")}`}
              onClick={() => setIsConfigOpen(false)} // Cierra configuración si se selecciona otra opción
              >
                <FiHome className="text-lg" />
                <span>Aportes</span>
              </Link>
            </ul>
          </nav>

          {/* Botón de cerrar sesión */}
          <div className="mt-auto">
            <button
              className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-red-500 dark:hover:bg-red-600"
              onClick={handleLogout}
            >
              <FiLogOut className="text-lg" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
