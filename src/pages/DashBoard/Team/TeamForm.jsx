import PropTypes from "prop-types";
import { DELETE } from "../../../api/api_constants";
import DropZonePhoto from "../../../components/DropZonePhoto";

const TeamForm = ({ stage, formData, handleChange }) => {
    const isDeleteMode = stage === DELETE;
    const isEditMode = !isDeleteMode && formData.id; // Si hay un ID, es actualización

    return (
        <formTeam className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg ">
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-white">
                {isDeleteMode ? "Eliminar" : isEditMode ? "Editar" : "Crear"} miembro
            </h2>

            <div className="space-y-4">
                {/* Nombre */}
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

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Descripción
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isDeleteMode}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Rol */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Rol
                    </label>
                    <input
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled={isDeleteMode}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* DropZone (solo si no es modo eliminar) */}
                {!isDeleteMode && (
                    <div>
                        <label htmlFor="icon" className="block text-sm font-medium mt-3 text-gray-700 dark:text-gray-300">
                            Icono
                        </label>
                        <DropZonePhoto handleChange={handleChange} formData={formData} />
                    </div>
                )}

                {/* Confirmación para eliminar */}
                {isDeleteMode && (
                    <div className="mt-4">
                        <label htmlFor="confirm" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Escriba &quot;{formData.role}&quot; para confirmar
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
        </formTeam>
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
