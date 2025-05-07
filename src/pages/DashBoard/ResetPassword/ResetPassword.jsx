import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import CustomCheckBox from "../Components/CustomCheckbox";
import { ENDPOINTS } from "../../../api/api_constants";
import { usePost } from "../../../hooks/useBaseEndpointQueries";
import BallLoader from "../../../components/BallLoader";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import AlertModal from "../../../components/AlertModal";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [userData, setUserData] = useLocalStorage("userData", {});
  const [, setToken] = useLocalStorage("token", "");

  const {
    data: createDataResponse,
    mutate: postDataApi,
    isLoading: isPosting,
    error: postError,
  } = usePost(ENDPOINTS.CREDENTIALS + "/reset");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword) {
      setPasswordError("Debe ingresar la contraseña actual");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Contraseña mínimo de 8 caracteres");
      return;
    }

    setPasswordError("");

    postDataApi({
      profile_id: userData.sub.id,
      currentPassword: currentPassword,
      password: newPassword,
    });
  };

  useEffect(() => {
    if (createDataResponse) {
      setToken(createDataResponse.data.access_token);
      const userData = jwtDecode(createDataResponse.data.access_token);
      setUserData(userData);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setAlert({message:"La contraseña se ha actualizado exitosamente", type: "success"});
      
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  }, [createDataResponse, setToken, setUserData, navigate]);

  useEffect(() => {
    if(postError){
      setAlert({message:postError.message, type: "error"})
    }
  }, [postError]);

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
      <BallLoader />
      <p className="text-center text-gray-400 text-xl animate-pulse font-bold">
        Cargando...
      </p>
    </div>
  );

  if (isPosting) return renderLoading();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Cambiar Contraseña
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña actual
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmar nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center mt-8">
            <CustomCheckBox
              id={"showPassword"}
              onCheckChange={(isChecked) => setShowPassword(isChecked)}
            ></CustomCheckBox>

            <label
              htmlFor="showPassword"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Mostrar contraseñas
            </label>
          </div>

          {passwordError && (
            <div className="text-sm text-red-600 dark:text-red-400 absolute right-0 bottom-17">
              {passwordError}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Actualizar
          </button>
        </form>
      </div>

      <AlertModal
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "" })}
      />
    </div>
  );
};

export default ResetPassword;