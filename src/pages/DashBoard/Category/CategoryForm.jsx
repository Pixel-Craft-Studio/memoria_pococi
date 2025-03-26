import PropTypes from "prop-types";
import { DELETE } from "../../../api/api_constants";

const CategoryForm = ({ stage, formData, handleChange}) => {
    const isDeleteMode = stage === DELETE;
    const isEditMode = !isDeleteMode && formData.id; // Si hay un ID, es actualización

    
    return (
        <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold  text-center text-gray-800 dark:text-white">
                {isDeleteMode ? "Eliminar" : isEditMode ? "Editar" : "Crear"} categoria
            </h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isDeleteMode}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {isDeleteMode && (
                    <div className="mt-4">
                        <label htmlFor="confirm" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Escriba &quot;{formData.name}&quot; para confirmar
                        </label>
                        <input
                            type="text"
                            name="confirm"
                            id="confirm"
                            value={formData.confirm}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                )}
                
     
            </div>
        </form>
    );
};

CategoryForm.propTypes = {
    stage: PropTypes.string.isRequired,
    formData: PropTypes.shape({
        id: PropTypes.string, // Se usa para identificar edición
        name: PropTypes.string.isRequired,
        confirm: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
};

export default CategoryForm;