import PropTypes from "prop-types";

import { API_URL, DELETE, ENDPOINTS, UPDATE } from "../../../api/api_constants";
import { useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useGetAll } from "../../../hooks/useBaseEndpointQueries";
import { FiLoader } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiWarning } from "react-icons/pi";

const MediaCards = ({ setFormData, changeStage, updateSignalState }) => {
  const {
    data: allResponseData,
    isFetchingAll,
    errorAll,
    refetch,
  } = useGetAll(ENDPOINTS.SOCIAL_PLATFORM);

  const [updateSignal, setUpdateSignal] = updateSignalState;

  const handleEdit = (item) => {
    setFormData({ id: item.id, name: item.name, icon_url: item.icon_url });
    changeStage(UPDATE);
  };

  const handleDelete = (item) => {
    setFormData({ id: item.id, name: item.name, icon_url: item.icon_url });
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
      <div className="overflow-auto max-h-96 border border-gray-300 rounded-lg bg-gray-200 dark:bg-gray-800">
        {errorAll && (
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
            <td
              className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
              colSpan={3}
            >
              <div className="flex justify-center gap-3">
                <PiWarning size={24}></PiWarning>
                Falló la carga de datos
              </div>
            </td>
          </tr>
        )}

        {isFetchingAll && (
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 ">
            <td
              className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
              colSpan={3}
            >
              <div className="flex justify-center gap-3">
                <FiLoader
                  className="animate-[spin_2s_linear_infinite]"
                  size={24}
                />{" "}
                Cargando
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
              <div className="flex justify-center gap-3 items-center">
                <IoMdInformationCircleOutline className="" size={24} /> No hay
                registros
              </div>
            </td>
          </tr>
        )}

        {allResponseData && (
          <div className="flex-wrap flex justify-center gap-5">
            {allResponseData.data.map((item) => (
              <div key={item.id} className="bg-gray-100 dark:bg-gray-700 p-4 m-2 rounded-xl">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  {item.name}
                </div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-center">
                  <img
                    className="max-w-10"
                    src={`${API_URL}/image${item.icon_url}`}
                    alt={item.name}
                  />
                </div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-between">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mr-2 cursor-pointer"
                    title="Editar"
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                    title="Eliminar"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Definir los tipos de las propiedades
MediaCards.propTypes = {
  setFormData: PropTypes.func.isRequired,
  changeStage: PropTypes.func.isRequired,
  updateSignalState: PropTypes.array.isRequired,
};

export default MediaCards;
