import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const EmailViewerModal = ({ isOpen, onClose, email }) => {
  // Estado para la posición del modal
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 400,
    y: window.innerHeight / 2 - 300,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Resetear posición al centro cuando se abre
      setPosition({
        x: window.innerWidth / 2 - 300,
        y: window.innerHeight / 2 - 200,
      });
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Manejadores para el arrastre del modal
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const maxX = window.innerWidth - 800;
    const maxY = window.innerHeight - 200;

    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Detener la propagación de clics dentro del modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen || !email) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg flex flex-col absolute"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          width: "600px",
          maxWidth: "calc(100vw - 40px)",
          maxHeight: "calc(100vh - 40px)" 
        }}
        onClick={handleModalClick}
      >
        {/* Franja superior para arrastrar (idéntica al BaseModal) */}
        <div
          className="bg-gray-200 dark:bg-gray-700 p-4 rounded-t-lg cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="h-2" />
        </div>

        {/* Botón de cierre (X) - idéntico al BaseModal */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-0.5 right-0.5 text-gray-600 hover:text-gray-800 
                  dark:text-gray-300 dark:hover:text-white
                  p-1 m-2 transition-colors duration-200 rounded-md bg-red-500 hover:bg-red-700"
        >
          <FaTimes className="w-4 h-4 fill-white" />
        </button>

        {/* Email header con título */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 mt-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {email.subject}
          </h2>
        </div>

        {/* Email metadata */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">De:</span> {email.email}
              </p>
              {email.name && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Nombre:</span> {email.name}
                </p>
              )}
              {email.phone && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Teléfono:</span> {email.phone}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
              {formatDate(email.created_at)}
            </p>
          </div>
        </div>

        {/* Email content */}
        <div className="p-4 overflow-y-auto flex-grow" style={{ maxHeight: "calc(80vh - 230px)" }}>
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: email.message }} />
          </div>
        </div>
      </div>
    </div>
  );
};

EmailViewerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string,
    phone: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
};

export default EmailViewerModal;