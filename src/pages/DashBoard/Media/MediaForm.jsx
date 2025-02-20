import { useState, useEffect } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import PropTypes from "prop-types";
import { DELETE } from "../../../api/api_constants";

const MediaForm = ({ stage, formData, handleChange }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [formData.icon_url]);

  const isDeleteMode = stage === DELETE;

  return (
    <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {" "}
        {isDeleteMode ? "Eliminar" : "Crear"} red social
      </h2>

      <label htmlFor="name" className="block text-sm font-medium">
        Name
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
          <label htmlFor="icon_url" className="block text-sm font-medium mt-3">
            Icon URL
          </label>

          <input
            type="text"
            name="icon_url"
            id="icon_url"
            value={formData.icon_url}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />

          <div className="mt-3">
            <div className="flex justify-center">
              {formData.icon_url && !imgError ? (
                <img
                  src={formData.icon_url}
                  alt="Icon Preview"
                  className="w-12 h-12 object-contain border rounded"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-12 h-12 shadow rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <AiOutlinePicture className="text-gray-400" size={20} />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {isDeleteMode && (
        <div className="mt-4">
          <label htmlFor="confirm">
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
