import PropTypes from "prop-types";
import { DELETE } from "../../../api/api_constants";

const PerfilForm = ({ stage, formData, handleChange }) => {
    const isDeleteMode = stage === DELETE;
    const isEditMode = !isDeleteMode && formData.id; // Si hay un ID, es actualización

    return (
        <form className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
                {isDeleteMode ? "Eliminar" : isEditMode ? "Actualizar" : "Crear"} perfil
            </h2>

            <label htmlFor="first_name" className="block text-sm font-medium">
                Name
            </label>
            <input
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={isDeleteMode}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="last_name" className="block text-sm font-medium">
                Last Name
            </label>
            <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={isDeleteMode}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="email" className="block text-sm font-medium">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isDeleteMode}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="password" className="block text-sm font-medium">
                Password
            </label>
            <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isDeleteMode}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />

            {isDeleteMode && (
                <div className="mt-4">
                    <label htmlFor="confirm">
                        Escriba &quot;{formData.email}&quot; para confirmar
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

PerfilForm.propTypes = {
    stage: PropTypes.string.isRequired,
    formData: PropTypes.shape({
        id: PropTypes.string, // Se usa para identificar edición
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string,
        email: PropTypes.string,
        confirm: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default PerfilForm;
