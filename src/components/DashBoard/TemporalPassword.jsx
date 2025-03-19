import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const TemporalPassword = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [userData] = useLocalStorage("userData", {});
  
  useEffect(() => {
    if (userData.isTemporal && location.pathname !== "/dashboard/reset-password") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location.pathname, userData.isTemporal]);

  if (!visible) return null;

  return (
    <div className="fixed h-full w-full z-50 modal-enter">
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/40 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-2xl shadow-xl w-80 p-6 transform transition-all duration-500 ease-in-out">
          <div className="flex flex-col items-center gap-5">
            <div className="flex gap-2 items-center justify-center">
              <div className="text-blue-500 dark:text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
              </div>
              <p className="text-center text-blue-500 dark:text-blue-400 text-xl leading-relaxed">
                Atención
              </p>
            </div>

            <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed w-70">
              Has iniciado sesión con una contraseña temporal que necesita
              ser actualizada.
            </p>

            <Link
              to={"/dashboard/reset-password"}
              className="text-center w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-4 py-3 rounded-xl text-white font-medium shadow-sm hover:shadow"
            >
              Actualizar contraseña
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalPassword;