import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Bienvenido</h2>
        <p className="text-gray-400 text-center mb-4">Inicia sesión en tu cuenta</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition duration-300 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-500 hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
