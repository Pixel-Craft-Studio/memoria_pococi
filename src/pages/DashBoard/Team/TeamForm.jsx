import PropTypes from "prop-types";
import { DELETE } from "../../../api/api_constants";
import DropZone from "../../../components/DropZone";

const TeamForm = ({ stage, formData, handleChange }) => {
    const isDeleteMode = stage === DELETE;
    const isEditMode = !isDeleteMode && formData.id; // Si hay un ID, es actualización

    return (
        <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
                {isDeleteMode ? "Eliminar" : isEditMode ? "Editar" : "Crear"} perfil
            </h2>

            <label htmlFor="first_name" className="block text-sm font-medium">
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

            <label htmlFor="last_name" className="block text-sm font-medium">
                Descripción
            </label>
            <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isDeleteMode}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="email" className="block text-sm font-medium">
                Roll
            </label>
            <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
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
                    <label htmlFor="confirm">
                        Escriba &quot;{formData.role}&quot; para confirmar
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

TeamForm.propTypes = {
    stage: PropTypes.string.isRequired,
    formData: PropTypes.shape({
        id: PropTypes.string, // Se usa para identificar edición
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        role: PropTypes.string,
        image_url: PropTypes.string,
        confirm: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default TeamForm;
