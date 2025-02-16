import { useState } from "react";
import { FiHome, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const toggleConfig = () => {
        setIsConfigOpen(!isConfigOpen);
    };

    return (
        <div className={`flex ml-50`}>
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-gray-200 dark:bg-gray-800 p-3 flex flex-col transition-all duration-300 ease-in-out`}>
                <div className="flex justify-between p-2">
                    {/* Título del sidebar */}
                    <h2 className={`text-xl font-bold text-center`}>Dashboard</h2>
                    {/* Selector de tema */}
                    <div className="">
                        <ThemeSwitcher />
                    </div>
                </div>

                {/* Navegación */}
                <nav className="flex-1 mt-6">
                    <ul className="space-y-4">
                        <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
                            <FiHome className="text-lg" />
                            <span>Inicio</span>
                        </Link>

                        <li>
                            <button
                                onClick={toggleConfig}
                                className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 w-full"
                            >
                                <FiSettings className="text-lg" />
                                <span>Configuración</span>
                                <FiChevronDown
                                    className={`ml-auto transform ${isConfigOpen ? 'rotate-180' : ''} transition-transform duration-300`}
                                />
                            </button>
                            {/* Sección de configuración con transición suave */}
                            <div
                                className={`overflow-hidden ${isConfigOpen ? 'max-h-40' : 'max-h-0'}`}
                            >
                                <ul className={`pl-8 space-y-2`}>
                                    <Link to="/dashboard/about" className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
                                        <span>Sobre nosotros</span>
                                    </Link>
                                </ul>
                            </div>
                        </li>

                    </ul>
                </nav>

                {/* Botón de cerrar sesión */}
                <div className="mt-auto">
                    <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-red-500 dark:hover:bg-red-600">
                        <FiLogOut className="text-lg" />
                        <span>Cerrar sesión</span>
                    </Link>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;