import PropTypes from "prop-types";

import { DELETE, ENDPOINTS, UPDATE, CREATE } from "../../../api/api_constants";
import { useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useGetAll } from "../../../hooks/useBaseEndpointQueries";
import { FiLoader } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiWarning } from "react-icons/pi";

const PerfilTable = ({ setFormData, changeStage, updateSignalState }) => {
  const {
    data: allResponseData,
    isFetchingAll,
    errorAll,
    refetch,
  } = useGetAll(ENDPOINTS.PROFILES);

  const [updateSignal, setUpdateSignal] = updateSignalState;

  const handleEdit = (item) => {
    setFormData({ id: item.id, first_name: item.first_name, last_name: item.last_name, email: item.email });
    changeStage(UPDATE);
  };

  const handleDelete = (item) => {
    setFormData({ id: item.id, first_name: item.first_name, last_name: item.last_name, email: item.email });
    changeStage(DELETE);
  };

  const handleCreateFirst = () => {
    changeStage(CREATE)
  }

  useEffect(() => {
    if (!updateSignal) {
      return;
    }

    setUpdateSignal(false);
    refetch();
  }, [refetch, setUpdateSignal, updateSignal]);

  return (
    <div className="p-4">
      {/* Contenedor con tamaño fijo y scroll */}
      <div className="overflow-auto max-h-96 border border-gray-300 rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-left w-1/3">
                Nombre
              </th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-left w-1/3">
                Apellido
              </th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-left w-1/3">
                Correo
              </th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-right w-1/3">
                Acciones
              </th>

            </tr>
          </thead>

          <tbody>
            {errorAll && (
              <div className="fixed ml-50 inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
                <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
                  <PiWarning size={24} />
                  <span>Algo salió mal. Inténtalo de nuevo.</span>
                </div>
              </div>
            )}

            {isFetchingAll && (
              <div className="fixed ml-50 inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
                <div className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
                  <FiLoader className="animate-[spin_2s_linear_infinite]" size={24} />
                  <span>Cargando...</span>
                </div>
              </div>
            )}

            {allResponseData && allResponseData.data.length === 0 && (
              <div className="flex flex-col fixed ml-50 inset-0 items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
                <div className="bg-gray-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
                  <IoMdInformationCircleOutline size={24} />
                  <span>No hay registros.</span>
                </div>
                <button
                onClick={handleCreateFirst}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
                >
                  Crear
                </button>
              </div>
            )}


            {allResponseData &&
              allResponseData.data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    {item.first_name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    {item.last_name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    {item.email}
                  </td>
                  <td className="flex px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-right">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mr-2 cursor-pointer"
                      title="Editar"
                    >
                      <AiFillEdit size={30} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                      title="Eliminar"
                    >
                      <AiFillDelete size={30} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Definir los tipos de las propiedades
PerfilTable.propTypes = {
  setFormData: PropTypes.func.isRequired,
  changeStage: PropTypes.func.isRequired,
  updateSignalState: PropTypes.array.isRequired,
};

export default PerfilTable;
