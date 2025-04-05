import PropTypes from "prop-types";
import { API_URL, DELETE, ENDPOINTS, UPDATE, CREATE } from "../../../api/api_constants";
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
    setFormData({ id: item.id, name: item.name, description: item.description, role: item.role, photo_url: item.photo_url });
    console.log(item.photo_url)
    changeStage(UPDATE);
  };

  const handleDelete = (item) => {
    setFormData({ id: item.id, name: item.name, description: item.description, role: item.role });
    changeStage(DELETE);
  };

   const handleCreateFirst = () => {
      changeStage(CREATE)
    }

  return (
    <div className=" overflow-y-auto p-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md">
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