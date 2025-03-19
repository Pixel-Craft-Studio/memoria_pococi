import { useContactoForm } from "../Contacto/hooks/useContactoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function Contact() {
  const { formData, handleChange, handleCreate, isLoading, alert } = useContactoForm();

  useEffect(() => {
    if (alert.message) {
      alert.type === "success" ? toast.success(alert.message) : toast.error(alert.message);
    }
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate(); // Asegura que se espera la respuesta antes de cambiar el estado de isLoading
  };

  return (
    <div className="py-10 px-4 animate__animated animate__fadeIn">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" limit={1} />
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 transition-all duration-300">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 relative">
              Contacto
              <span className="block h-1 w-12 bg-indigo-500 mt-2 mx-auto rounded-full"></span>
            </h2>
          </div>

          <div className="space-y-6">
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Asunto" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50" />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mensaje" required rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50 resize-none"></textarea>

            <button type="submit" disabled={isLoading} className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}`}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
