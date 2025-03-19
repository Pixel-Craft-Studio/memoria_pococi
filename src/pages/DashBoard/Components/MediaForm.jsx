import { DELETE, UPDATE } from "../../../api/api_constants";

import PropTypes from "prop-types";
import DropZone from "../../../components/DropZone";

const MediaForm = ({ stage, formData, handleChange }) => {
  const isDeleteMode = stage === DELETE;

  return (
    <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isDeleteMode ? "Eliminar" : stage === UPDATE ? "Editar" : "Crear"} red
        social
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

          <DropZone handleChange={handleChange} formData={formData} />
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
    image_url: PropTypes.string,
    confirm: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MediaForm;
