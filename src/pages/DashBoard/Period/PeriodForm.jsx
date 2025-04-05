import PropTypes from "prop-types";
import { DELETE } from "../../../api/api_constants";
import Dropzone from "../../../components/DropZone";

const PeriodForm = ({ stage, formData, handleChange}) => {
    const isDeleteMode = stage === DELETE;
    const isEditMode = !isDeleteMode && formData.id; // Si hay un ID, es actualización

    
    return (
        <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold  text-center text-gray-800 dark:text-white">
                {isDeleteMode ? "Eliminar" : isEditMode ? "Editar" : "Registrar"} Año
            </h2>

            <div className="space-y-4">

                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Año
                    </label>
                    <input
                        type="text"
                        name="year"
                        id="year"
                        value={formData.year}
                        onChange={handleChange}
                        disabled={isDeleteMode}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                {!isDeleteMode && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Titulo
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            disabled={isDeleteMode}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                )}
                {!isDeleteMode && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Contenido
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
                )}
                
                {/* DropZone (solo si no es modo eliminar) */}
                {!isDeleteMode && (
                    <div>
                        <label htmlFor="icon" className="block text-sm font-medium mt-3 text-gray-700 dark:text-gray-300">
                            Icono
                        </label>
                        <Dropzone handleChange={handleChange} formData={formData} />
                    </div>
                )}

                {isDeleteMode && (
                    <div className="mt-4">
                        <label htmlFor="confirm" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Escriba &quot;{formData.year}&quot; para confirmar
                        </label>
                        <input
                            type="text"
                            name="confirm"
                            id="confirm"
                            value={formData.confirm}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />

                        <div className="text-sm mt-1 text-red-600">Se eliminarán todas las historias asociadas</div>
                    </div>
                )}
                
     
            </div>
        </form>
    );
};

PeriodForm.propTypes = {
    stage: PropTypes.string.isRequired,
    formData: PropTypes.shape({
        id: PropTypes.string,
        year: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        confirm: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
};

export default PeriodForm;