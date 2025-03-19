import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaSync,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaInbox,
  FaClock,
  FaPaperPlane,
  FaFileAlt,
} from "react-icons/fa";
import CustomCheckBox from "./CustomCheckBox";
import { ENDPOINTS } from "../../../api/api_constants";
import { useGetAll } from "../../../hooks/useBaseEndpointQueries";
import BallLoader from "../../../components/BallLoader";

const InboxComponent = () => {
  const [selectedEmails, setSelectedEmails] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const checkboxRefs = useRef({});

  const [currentMessages, setCurrentMessages] = useState("new");

  const {
    data: allResponseData,
    isFetchingAll,
    errorAll,
    refetch,
  } = useGetAll(ENDPOINTS.CONTACTS + `?status=${currentMessages}`);

  console.log(allResponseData);

  useEffect(() => {
    if (allResponseData) {
      setemails(allResponseData.data);
    }
  }, [allResponseData]);

  const [emails, setemails] = useState([]);

  // Función para manejar el clic en "seleccionar todos"
  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);

    // Actualizar estado para cada correo
    const newSelectedEmails = {};
    emails.forEach((email) => {
      newSelectedEmails[email.id] = isChecked;

      // Actualizar el checkbox individual si hay referencia
      if (checkboxRefs.current[email.id]) {
        checkboxRefs.current[email.id].updateCheckState(isChecked);
      }
    });

    setSelectedEmails(newSelectedEmails);
  };

  // Función para manejar selecciones individuales
  const handleSelectEmail = (id, isChecked) => {
    setSelectedEmails((prev) => ({
      ...prev,
      [id]: isChecked,
    }));

    // Comprobar si todos están seleccionados
    const allSelected =
      Object.values({
        ...selectedEmails,
        [id]: isChecked,
      }).every((value) => value) &&
      Object.keys(selectedEmails).length + 1 >= emails.length;

    // Actualizar el estado de "seleccionar todos" sin disparar su handler
    if (selectAll !== allSelected) {
      setSelectAll(allSelected);
      if (checkboxRefs.current["all"]) {
        checkboxRefs.current["all"].updateCheckState(allSelected);
      }
    }
  };

  const handleNewEmails = () => {
    setCurrentMessages("new");
  };

  const handleReadEmails = () => {
    setCurrentMessages("readed");
  };

  const handleArchivedEmails = () => {
    setCurrentMessages("archived");
  };

  const handleRespondedEmails = () => {
    setCurrentMessages("responded");
  };

  const handleDeletedEmails = () => {
    setCurrentMessages("deleted");
  };

  return (
    <div className="flex h-screen  dark:bg-gray-900 px-10 py-6 ">
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col shadow-xl">
        <button className="bg-indigo-700 text-white py-3 px-4 rounded font-medium mb-6">
          Contactos
        </button>

        <div className="space-y-1">
          <div
            onClick={handleNewEmails}
            className={`flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer ${
              currentMessages === "new" ? "bg-gray-200 dark:bg-indigo-500" : ""
            }`}
          >
            <FaInbox className="h-5 w-5 mr-3" />
            <span>Nuevos</span>
          </div>
          <div
            onClick={handleReadEmails}
            className={`flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer ${
              currentMessages === "readed"
                ? "bg-gray-200 dark:bg-indigo-500"
                : ""
            }`}
          >
            <FaFileAlt className="h-5 w-5 mr-3" />
            <span>Leídos</span>
          </div>

          <div
            onClick={handleRespondedEmails}
            className={`flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer ${
              currentMessages === "responded"
                ? "bg-gray-200 dark:bg-indigo-500"
                : ""
            }`}
          >
            <FaPaperPlane className="h-5 w-5 mr-3" />
            <span>Respondidos</span>
          </div>

          <div
            onClick={handleArchivedEmails}
            className={`flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer ${
              currentMessages === "archived"
                ? "bg-gray-200 dark:bg-indigo-500"
                : ""
            }`}
          >
            <FaClock className="h-5 w-5 mr-3" />
            <span>Archivados</span>
          </div>

          <div
            onClick={handleDeletedEmails}
            className={`flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer ${
              currentMessages === "deleted"
                ? "bg-gray-200 dark:bg-indigo-500"
                : ""
            }`}
          >
            <FaTrash className="h-5 w-5 mr-3" />
            <span>Eliminados</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col shadow-xl">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CustomCheckBox
              key="all"
              onCheckChange={handleSelectAll}
              ref={(ref) => {
                if (ref) checkboxRefs.current["all"] = ref;
              }}
            />
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
              <FaTrash className="h-5 w-5" />
            </button>
            <button onClick={refetch} className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
              <FaSync className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center flex-1 mx-4">
            <div className="relative flex-1 ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Buscar correo..."
                className="block w-full pl-10 pr-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
          {isFetchingAll && (
            <div className="flex flex-col gap-2 items-center justify-center h-full">
              <BallLoader />
              <p className="text-gray-400 text-xl font-semibold">
                Cargando correos...
              </p>
            </div>
          )}

          {!isFetchingAll && emails.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-xl font-semibold">
                No hay correos{" "}
                {currentMessages == "new"
                  ? "nuevos"
                  : currentMessages == "readed"
                  ? "leidos"
                  : currentMessages == "responded"
                  ? "respondidos"
                  : currentMessages == "archived"
                  ? "archivados"
                  : "eliminados"}
              </p>
            </div>
          )}

          {emails.map((email) => (
            <div
              key={email.id}
              className="grid grid-cols-12 px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="col-span-1 flex items-center space-x-2">
                <CustomCheckBox
                  key={email.id}
                  id={email.id}
                  onCheckChange={(isChecked) =>
                    handleSelectEmail(email.id, isChecked)
                  }
                  ref={(ref) => {
                    if (ref) checkboxRefs.current[email.id] = ref;
                  }}
                />
              </div>
              <div className="col-span-3">{email.sender}</div>
              <div className="col-span-6">{email.subject}</div>
              <div className="col-span-2 text-right">{email.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxComponent;
