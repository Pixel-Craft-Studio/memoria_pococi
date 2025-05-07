import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };

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
      setError("Usuario o contraseña incorrectos");
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
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
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

          <div className='mb-10'>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          
          <Link
            to="/dashboard/recovery"
            className=" text-blue-500 hover:underline absolute right-0 bottom-9 text-xs"
          >
            Recuperar contraseña
          </Link>
          
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-500 transition duration-300 px-4 py-2 rounded-lg text-white font-semibold"
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