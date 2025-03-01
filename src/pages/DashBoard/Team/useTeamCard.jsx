import PropTypes from "prop-types";
import { API_URL, DELETE, ENDPOINTS, UPDATE } from "../../../api/api_constants";
import { useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useGetAll } from "../../../hooks/useBaseEndpointQueries";
import { FiLoader } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiWarning } from "react-icons/pi";

const TeamsCards = ({ setFormData, changeStage, updateSignalState }) => {
  const { data: allResponseData, isFetchingAll, errorAll, refetch } = useGetAll(ENDPOINTS.TEAM_MEMBER);
  const [updateSignal, setUpdateSignal] = updateSignalState;

  useEffect(() => {
    if (!updateSignal) return;
    setUpdateSignal(false);
    refetch();
  }, [updateSignal, refetch, setUpdateSignal]);

  const handleEdit = (item) => {
    setFormData({ id: item.id, name: item.name, description: item.description, role: item.role });
    changeStage(UPDATE);
  };

  const handleDelete = (item) => {
    setFormData({ id: item.id, name: item.name, description: item.description, role: item.role });
    changeStage(DELETE);
  };

  return (
    <div className="h-screen overflow-y-auto p-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md">
        {errorAll && (
          <div className="flex justify-center items-center gap-3 text-red-500">
            <PiWarning size={24} /> Falló la carga de datos
          </div>
        )}

        {isFetchingAll && (
          <div className="flex justify-center items-center gap-3 text-gray-500">
            <FiLoader className="animate-spin" size={24} /> Cargando...
          </div>
        )}

        {allResponseData && allResponseData.data.length === 0 && (
          <div className="flex justify-center items-center gap-3 text-gray-500">
            <IoMdInformationCircleOutline size={24} /> No hay registros
          </div>
        )}

        {allResponseData && (
          <div className="flex flex-wrap justify-center gap-6">
            {allResponseData.data.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-60 hover:shadow-2xl hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <img className="w-20 h-20 rounded-full object-cover" src={`${API_URL}/image${item.photo_url}`} alt={item.name} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{item.role}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 transition-all cursor-pointer">
                    <AiFillEdit size={20} />
                  </button>
                  <button onClick={() => handleDelete(item)} className="text-red-500 hover:text-red-700 transition-all cursor-pointer">
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

TeamsCards.propTypes = {
  setFormData: PropTypes.func.isRequired,
  changeStage: PropTypes.func.isRequired,
  updateSignalState: PropTypes.array.isRequired,
};

export default TeamsCards;