import PropTypes from "prop-types";

import { API_URL, DELETE, ENDPOINTS, UPDATE } from "../../../api/api_constants";
import { useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useGetAll } from "../../../hooks/useBaseEndpointQueries";
import { FiLoader } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiWarning } from "react-icons/pi";

const MediaTable = ({ setFormData, changeStage, updateSignalState }) => {
  const {
    data: allResponseData,
    isFetchingAll,
    errorAll,
    refetch,
  } = useGetAll(ENDPOINTS.SOCIAL_PLATFORM);

  const [updateSignal, setUpdateSignal] = updateSignalState;

  const handleEdit = (item) => {
    setFormData({ id: item.id, name: item.name, image_url: item.image_url });
    changeStage(UPDATE);
  };

  const handleDelete = (item) => {
    setFormData({ id: item.id, name: item.name, image_url: item.image_url });
    changeStage(DELETE);
  };

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
                Icono
              </th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-right w-1/3">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
{errorAll && (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
    <td
      className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
      colSpan={3}
    >
      <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex justify-center gap-3 items-center animate-fade-in">
        <PiWarning size={24} />
        <span>Falló la carga de datos</span>
      </div>
    </td>
  </tr>
)}

{isFetchingAll && (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
    <td
      className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
      colSpan={3}
    >
      <div className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex justify-center gap-3 items-center animate-fade-in">
        <FiLoader className="animate-[spin_2s_linear_infinite]" size={24} />
        <span>Cargando...</span>
      </div>
    </td>
  </tr>
)}

{allResponseData && allResponseData.data.length === 0 && (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
    <td
      className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
      colSpan={3}
    >
      <div className="bg-gray-500 text-white px-6 py-4 rounded-lg shadow-lg flex justify-center gap-3 items-center animate-fade-in">
        <IoMdInformationCircleOutline size={24} />
        <span>No hay registros</span>
      </div>
    </td>
  </tr>
)}


            {allResponseData &&
              allResponseData.data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <img
                      className="max-w-5"
                      src={`${API_URL}/image${item.image_url}`}
                      alt={item.name}
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-right">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mr-2"
                      title="Editar"
                    >
                      <AiFillEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Eliminar"
                    >
                      <AiFillDelete size={20} />
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
MediaTable.propTypes = {
  setFormData: PropTypes.func.isRequired,
  changeStage: PropTypes.func.isRequired,
  updateSignalState: PropTypes.array.isRequired,
};

export default MediaTable;
