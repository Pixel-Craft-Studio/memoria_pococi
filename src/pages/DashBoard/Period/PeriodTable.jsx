import PropTypes from "prop-types";

import {
  DELETE,
  ENDPOINTS,
  UPDATE,
  CREATE,
  API_URL,
} from "../../../api/api_constants";
import { useEffect } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineAlignLeft } from "react-icons/ai";
import { useGetAll } from "../../../hooks/useBaseEndpointQueries";
import { FiLoader } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiWarning } from "react-icons/pi";
import { Link } from "react-router-dom";

const PeriodTable = ({ setFormData, changeStage, updateSignalState }) => {
  const {
    data: allResponseData,
    isFetchingAll,
    errorAll,
    refetch,
  } = useGetAll(ENDPOINTS.TIMELINE_YEAR);

  const [updateSignal, setUpdateSignal] = updateSignalState;

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      year: item.year,
      title: item.title,
      description: item.description,
      image_url: item.image_url,
    });
    changeStage(UPDATE);
  };

  const handleDelete = (item) => {
    setFormData({ id: item.id, year: item.year });
    changeStage(DELETE);
  };

  const handleCreateFirst = () => {
    changeStage(CREATE);
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
      <div className="overflow-auto max-h-[60vh] rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-left">
                Nombre
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
                  <FiLoader
                    className="animate-[spin_2s_linear_infinite]"
                    size={24}
                  />
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
                    <div className="flex justify-between items-center">
                      <div className="pl-2">
                        <div className="text-2xl mb-2">
                          {item.year} - {item.title}{" "}
                        </div>

                        <div
                          className="pr-5 overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.description}
                        </div>

                        <div className="mt-2">
                          Historias Asociadas:{" "}
                          <b className="text-green-600">
                            {item.histories.length}
                          </b>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Link
                            title="Visualizar"
                            to={`/dashboard/period/${item.year}`}
                            className="rounded inline-flex items-center gap-2 text-sm font-medium bg-blue-600 hover:bg-blue-800 p-2 text-white transition-colors"
                          >
                            <AiOutlineAlignLeft size={20}/>
                          </Link>

                          <button
                            onClick={() => handleDelete(item)}
                            className=" p-2 bg-red-500 hover:bg-red-700 rounded transition-colors duration-200 text-white  cursor-pointer"
                            title="Eliminar"
                          >
                            <AiFillDelete size={20} />
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-600 hover:bg-yellow-800 p-2 rounded transition-colors duration-200 text-white  cursor-pointer"
                            title="Editar"
                          >
                            <AiFillEdit size={20} />
                          </button>
                        </div>
                      </div>

                      <img
                        className="w-full md:w-[380px] h-auto rounded-lg aspect-video max-h-full"
                        src={`${API_URL}/image${item.image_url}`}
                        alt={`Imagen de ${item.year}`}
                      />
                    </div>
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
PeriodTable.propTypes = {
  setFormData: PropTypes.func.isRequired,
  changeStage: PropTypes.func.isRequired,
  updateSignalState: PropTypes.array.isRequired,
};

export default PeriodTable;
