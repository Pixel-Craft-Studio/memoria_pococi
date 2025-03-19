import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(null);
  const fetchLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    };

    try {
      const response = await fetch("http://localhost:8001/login", options);
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`${errorBody.message || "Error desconocido"}`);
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (formData) {
      const token = formData.access_token;

      const userData = jwtDecode(token);
      console.log(userData);

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      navigate("/dashboard");
    }
  }, [formData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Bienvenido</h2>
        <div className="absolute top-3 right-3">
          <ThemeSwitcher />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
          Inicia sesión en tu cuenta
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 mb-4 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-gray-600 dark:text-gray-500 text-right text-xs m-1">
              <Link className="hover:text-gray-300 transition" to="/dashboard/resetpassword">Restablecer contraseña</Link>
            </p>
          </div>
          <Link
            to="/dashboard/recovery"
            className="text-blue-500 hover:underline absolute right-0 bottom-9 text-xs"
          >
            Recuperar contraseña
          </Link>
          {error}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition duration-300 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-gray-600 dark:text-gray-400 text-center mt-4"></p>
      </div>
    </div>
  );
}

export default Login;
