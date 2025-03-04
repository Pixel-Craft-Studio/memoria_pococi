import PropTypes from "prop-types";
import { API_URL, DELETE, ENDPOINTS, UPDATE} from "../../../api/api_constants";
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
      <div className="overflow-auto max-h-96 rounded-lg bg-gray-200 dark:bg-gray-800">
        {errorAll && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
              <PiWarning size={24} />
              <span>Algo salió mal. Inténtalo de nuevo.</span>
            </div>
          </div>
        )}

        {isFetchingAll && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
              <FiLoader className="animate-spin" size={24} />
              <span>Cargando...</span>
            </div>
          </div>
        )}

        {allResponseData && allResponseData.data.length === 0 && (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-gray-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
              <IoMdInformationCircleOutline size={24} />
              <span>No hay registros.</span>
            </div>
          </div>
        )}

        {allResponseData && allResponseData.data.length > 0 && (
          <div className="flex-wrap flex justify-center gap-5">
            {allResponseData.data.map((item) => (
              <div key={item.id} className="bg-gray-100 dark:bg-gray-700 p-4 m-2 rounded-xl">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  {item.name}
                </div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-center">
                  <img
                    className="max-w-10"
                    src={`${API_URL}/image${item.image_url}`}
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
