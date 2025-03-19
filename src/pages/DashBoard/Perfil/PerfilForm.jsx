import PropTypes from "prop-types";
import { CREATE, DELETE } from "../../../api/api_constants";

const PerfilForm = ({ stage, formData, handleChange, setFormData }) => {
    const isDeleteMode = stage === DELETE;
    const isEditMode = !isDeleteMode && formData.id; // Si hay un ID, es actualización
    const isCreateMode = stage === CREATE;

    const toggleState = () => {
        // Cambiar el valor de is_active entre true y false
        setFormData(prevData => ({
            ...prevData,
            is_active: !prevData.is_active // Alterna el valor entre true y false
        }));
        console.log(formData)
    };
    
    return (
        <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold  text-center text-gray-800 dark:text-white">
                {isDeleteMode ? "Eliminar" : isEditMode ? "Editar" : "Crear"} perfil
            </h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        disabled={isDeleteMode}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Apellido
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        disabled={isDeleteMode}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isDeleteMode}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {!isCreateMode && !isDeleteMode && (
                    <div className="flex items-center justify-between py-2">
                        <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Estado
                        </label>
                        <div className="flex items-center">
                            <button
                                type="button"
                                id="is_active"
                                onClick={toggleState}
                                className="relative inline-flex items-center w-12 h-6 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-pressed={formData.is_active}
                            >
                                <span className="sr-only">{formData.is_active ? 'Desactivar' : 'Activar'}</span>
                                {/* Track (background) */}
                                <span
                                    className={`absolute w-full h-full rounded-full transition-colors duration-200 ease-in-out ${
                                    formData.is_active ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                />
                                {/* Thumb (círculo que se mueve) */}
                                <span
                                    className={`absolute left-0 inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                                    formData.is_active ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                            <span className={`ml-3 text-sm ${formData.is_active ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {formData.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                        </div>
                    </div>
                )}

                {!isDeleteMode && !isEditMode && (
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isDeleteMode}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                )}

                {isDeleteMode && (
                    <div className="mt-4">
                        <label htmlFor="confirm" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Escriba &quot;{formData.email}&quot; para confirmar
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

PerfilForm.propTypes = {
    stage: PropTypes.string.isRequired,
    formData: PropTypes.shape({
        id: PropTypes.string, // Se usa para identificar edición
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string,
        email: PropTypes.string,
        confirm: PropTypes.string,
        password: PropTypes.string,
        is_active: PropTypes.bool, // Cambiado a boolean para mayor claridad
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
};

export default PerfilForm;