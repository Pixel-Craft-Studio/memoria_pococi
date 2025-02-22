import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

const BaseModal = ({
  enabledSend,
  modalState,
  children,
  cancelable = false,
  cancelText = "",
  submitText = "",
  modalType = "default",
  onClose = () => { },
  onCancel = () => { },
  onSend = () => { },
}) => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 200,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = modalState;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const maxX = window.innerWidth - 380;
    const maxY = window.innerHeight - 300;

    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleOnClose = () => {
    onClose();
    setIsOpen(false);
  };

  const handleOnCancel = () => {
    onCancel();
    setIsOpen(false);
  };

  const handleOnSend = () => {
    onSend();
  };

  const buttonClassDefault = `cursor-pointer px-4 py-2 text-sm ${!enabledSend
      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
      : "bg-blue-600 text-white"
    } rounded hover:${!enabledSend ? "" : "bg-blue-700"} dark:${!enabledSend ? "" : "bg-blue-500 dark:hover:bg-blue-600"
    } transition-colors duration-200`;

  const buttonClassDelete = `cursor-pointer px-4 py-2 text-sm ${!enabledSend
      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
      : "bg-red-600 text-white"
    } rounded hover:${!enabledSend ? "" : "bg-red-700"} dark:${!enabledSend ? "" : "bg-red-500 dark:hover:bg-red-600"
    } transition-colors duration-200`;

  let mainButtonClass = buttonClassDefault;
  let mainButtonText = submitText || "Enviar";

  if (modalType === "delete") {
    mainButtonClass = buttonClassDelete;
    mainButtonText = submitText || "Eliminar";
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/60 backdrop-blur-sm"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-96 absolute"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          >
            {/* Franja superior para arrastrar */}

            <div
              className="bg-gray-200 dark:bg-gray-700 p-4 rounded-t-lg cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
            >
              <div className="h-2" />
            </div>

            {/* Botón de cierre (X) */}
            <button
              onClick={handleOnClose}
              className="cursor-pointer absolute top-0.5 right-0.5 text-gray-600 hover:text-gray-800 
                        dark:text-gray-300 dark:hover:text-white
                        p-1 m-2 transition-colors duration-200 rounded-md bg-red-500 hover:bg-red-700 "
            >
              <AiOutlineClose className="w-4 h-4 fill-white" />
            </button>

            {/* Contenido del modal */}
            <div className="p-6">{children}</div>

            {/* Botones de acción */}
            <div className="mt-4 flex justify-end space-x-3 px-6 pb-4">
              {cancelable && (
                <button
                  onClick={handleOnCancel}
                  className="cursor-pointer px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded 
                          hover:bg-red-400 dark:bg-gray-600 dark:text-gray-200 
                          dark:hover:bg-red-400 transition-colors duration-300"
                >
                  {cancelText || "Cancelar"}
                </button>
              )}

              <button
                onClick={handleOnSend}
                className={mainButtonClass}
                disabled={!enabledSend}
              >
                {mainButtonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

BaseModal.propTypes = {
  modalState: PropTypes.arrayOf(PropTypes.any).isRequired,
  children: PropTypes.node,
  cancelable: PropTypes.bool,
  enabledSend: PropTypes.bool,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  modalType: PropTypes.string,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onSend: PropTypes.func,
};

export default BaseModal;
