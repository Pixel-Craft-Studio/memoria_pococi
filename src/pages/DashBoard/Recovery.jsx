import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import { ENDPOINTS } from "../../api/api_constants";
import { usePost } from "../../hooks/useBaseEndpointQueries";
import AlertModal from "../../components/AlertModal";

function Recovery() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const {
    data: createDataResponse,
    mutate: postDataApi,
    isPending: isPosting,
    error: postError,
  } = usePost(ENDPOINTS.CREDENTIALS + "/recovery");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  useEffect(() => {
    if (createDataResponse) {
      setAlert({message: "Se ha enviado una contraseña temporal a su correo", type: "success"})
    }
  }, [createDataResponse]);

  useEffect(() => {
    if (postError) {
      setAlert({message: postError.message, type: "error"})
    }
  }, [postError]);

  const fetchLogin = async () => {
    postDataApi({
      email: email,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Recuperar Contraseña
        </h2>
        <div className="absolute top-3 right-3">
          <ThemeSwitcher />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
          Digite su correo para solicitar una contraseña temporal de
          recuperación
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 mb-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Link
            to="/dashboard/login"
            className="text-blue-500 hover:underline absolute right-0 bottom-9 text-xs"
          >
            Al Login
          </Link>

          <button
            type="submit"
            disabled={isPosting}
            className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition duration-300 ${
              isPosting
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {isPosting ? "Solicitando Recuperación" : "Solicitar Recuperación"}
          </button>
        </form>

        <p className="text-gray-600 dark:text-gray-400 text-center mt-4"></p>
      </div>

        <AlertModal
          message={alert.message}
          type={alert.type}
          onClose={
            () => {
              setAlert({ message: "", type: "" })
              if(alert.type == "success"){
                navigate("/dashboard/login");
              }
            }}
        />

    </div>
  );
}

export default Recovery;
