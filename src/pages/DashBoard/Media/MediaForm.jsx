import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlinePicture } from "react-icons/ai";
import { API_URL, DELETE, UPDATE } from "../../../api/api_constants";

import PropTypes from "prop-types";

const MediaForm = ({ stage, formData, handleChange }) => {
  const [imgError, setImgError] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const isDeleteMode = stage === DELETE;

  // Efecto para manejar el preview inicial
  useEffect(() => {
    if (formData.icon_url) {
      setPreview(`${API_URL}/image${formData.icon_url}`);
      setImgError(false);
    }
  }, [formData.icon_url]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        handleChange({
          target: {
            name: "icon",
            value: file, 
          },
        });
      };
      reader.readAsDataURL(file);
    }
  }, [handleChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  });

  return (
    <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {isDeleteMode ? "Eliminar" : stage === UPDATE ? "Editar" : "Crear"} red social
      </h2>

      <label htmlFor="name" className="block text-sm font-medium">
        Nombre
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        disabled={isDeleteMode}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      />

      {!isDeleteMode && (
        <>
          <label htmlFor="icon" className="block text-sm font-medium mt-3">
            Icono
          </label>

          <div
            {...getRootProps()}
            className="w-full p-4 border-2 border-dashed rounded-md dark:bg-gray-700 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <input onInput={handleChange} name="icon" id="icon" {...getInputProps()} />
            
            {preview && !imgError ? (
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="Vista previa del icono"
                  className="w-16 h-16 object-contain border rounded mb-2"
                  onError={() => setImgError(true)}
                />
                <p className="text-sm text-gray-500">Click o arrastra para cambiar</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 shadow rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700 mb-2">
                  <AiOutlinePicture className="text-gray-400" size={24} />
                </div>
                <p className="text-sm text-gray-500">
                  Arrastra y suelta una imagen o haz clic aquí
                </p>
              </>
            )}
          </div>

          {file && (
            <p className="mt-2 text-sm text-gray-500 text-center truncate">
              Archivo seleccionado: {file.name}
            </p>
          )}
        </>
      )}

      {isDeleteMode && (
        <div className="mt-4">
          <label htmlFor="confirm" className="text-xs">
            Escriba &quot;{formData.name}&quot; para confirmar
          </label>
          <input
            type="text"
            name="confirm"
            id="confirm"
            value={formData.confirm}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      )}
    </form>
  );
};

MediaForm.propTypes = {
  stage: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon_url: PropTypes.string,
    confirm: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MediaForm;