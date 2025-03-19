import {  useState } from "react";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import { Link } from "react-router-dom";

function ResetPass() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  
  const [error, setError] = useState("")
  const [ setFormData] = useState(null)
  const fetchLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("username", email);

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
      };
      const data = await response.json();
      setFormData(data)
    } catch (error) {
      setError(error.message);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Restablecer contraseña</h2>
        <div className="absolute top-3 right-3">
          <ThemeSwitcher />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error}
          <div className="flex flex-col items-center">
          <button
            type="submit"
            className="w-3/4 bg-blue-600 hover:bg-blue-500 transition duration-300 p-2 rounded-lg text-white font-semibold cursor-pointer"
          >
            Restablecer contraseña
          </button>
          <Link className=" text-gray-700 dark:text-gray-500 text-sm m-1 hover:text-gray-300 transition" to="/dashboard/login">Regresar</Link>
          </div>
          
        </form>

      </div>
    </div>
  );
}

export default ResetPass;
