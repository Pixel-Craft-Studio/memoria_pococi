import { useContactoForm } from "../Contacto/hooks/useContactoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function Contact() {
  const { formData, handleChange, handleCreate, isLoading, alert } = useContactoForm();

  useEffect(() => {
    if (alert.message) {
      alert.type === "success" 
        ? toast.success(alert.message, { className: 'bg-[#C2DBF1] text-[#CB5C1F]' }) 
        : toast.error(alert.message, { className: 'bg-[#EABF34] text-white' });
    }
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate();
  };

  return (
    <div className="z-50 min-h-screen py-16 px-4 animate__animated animate__fadeIn bg-[#BDBFC1] bg-opacity-10">
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
        limit={1} 
      />
      
      <div className="w-full max-w-2xl mx-auto">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white shadow-lg rounded-xl p-8 md:p-10 transition-all duration-300 hover:shadow-xl"
        >
          {/* Encabezado */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-light text-[#CB5C1F] mb-2">
              Contáctenos
            </h2>
            <div className="w-20 h-1 bg-[#EABF34] mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600">
              Complete el formulario y nos pondremos en contacto con usted
            </p>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#CB5C1F] mb-1">
                Asunto
              </label>
              <input 
                type="text" 
                id="subject"
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                placeholder="¿Sobre qué deseas contactarnos?" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#CB5C1F] focus:ring-2 focus:ring-[#C2DBF1] outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#CB5C1F] mb-1">
                Nombre
              </label>
              <input 
                type="text" 
                id="name"
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Tu nombre completo" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#CB5C1F] focus:ring-2 focus:ring-[#C2DBF1] outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#CB5C1F] mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="tu@email.com" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#CB5C1F] focus:ring-2 focus:ring-[#C2DBF1] outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#CB5C1F] mb-1">
                Mensaje
              </label>
              <textarea 
                id="message"
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Escribe tu mensaje aquí..." 
                required 
                rows="5" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#CB5C1F] focus:ring-2 focus:ring-[#C2DBF1] outline-none transition-all duration-200 placeholder-gray-400 resize-none"
              ></textarea>
            </div>

            {/* Botón de enviar */}
            <button 
              type="submit" 
              disabled={isLoading} 
              className={`w-full py-3.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center
                ${isLoading 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-[#CB5C1F] hover:bg-[#EABF34] text-white hover:text-[#CB5C1F] transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                }`
              }
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#CB5C1F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
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