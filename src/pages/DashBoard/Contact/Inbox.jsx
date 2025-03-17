/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaSync,
  FaTrash,
  FaInbox,
  FaPaperPlane,
  FaEye,
  FaArchive,
} from "react-icons/fa";
import CustomCheckBox from "./CustomCheckBox";
import { ENDPOINTS } from "../../../api/api_constants";
import { useDelete, useGetAll, usePatch } from "../../../hooks/useBaseEndpointQueries";
import BallLoader from "../../../components/BallLoader";
import BaseModal from "../../../components/BaseModal";
import EmailViewerModal from "./Components/EmailViewerModal";

const InboxComponent = () => {
  const [selectedEmails, setSelectedEmails] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    emailId: null,
  });

  const checkboxRefs = useRef({});
  const [currentMessages, setCurrentMessages] = useState("new");
  const [contextMenuStatus, setContextMenuStatus] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const {
    data: allResponseData,
    isFetching: isFetchingAll,
    error: errorAll,
    refetch,
  } = useGetAll(ENDPOINTS.CONTACTS + `?status=${currentMessages}`);

  const {
    data: patchData,
    mutate: updateDataApi,
    isLoading: isPatching,
  } = usePatch(ENDPOINTS.CONTACTS);

  const {
    data: deleteData,
    mutate: deleteDataApi,
    isLoading: isDeleting,
  } = useDelete(ENDPOINTS.CONTACTS);

  useEffect(() => {
    if (allResponseData) {
      setemails(allResponseData.data);
    }
  }, [allResponseData]);

  const [emails, setemails] = useState([]);

  // Cerrar el menú contextual cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.show) {
        setContextMenu({ show: false, x: 0, y: 0, emailId: null });
      }
    };

    const handleScroll = () => {
      if (contextMenu.show) {
        setContextMenu({ show: false, x: 0, y: 0, emailId: null });
      }
    };

    const emailListContainer = document.querySelector(".overflow-auto");

    if (emailListContainer) {
      emailListContainer.addEventListener("scroll", handleScroll);
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleScroll);
    };
  }, [contextMenu]);

  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);

    const newSelectedEmails = {};
    emails.forEach((email) => {
      newSelectedEmails[email.id] = isChecked;

      if (checkboxRefs.current[email.id]) {
        checkboxRefs.current[email.id].updateCheckState(isChecked);
      }
    });

    setSelectedEmails(newSelectedEmails);
  };

  const handleSendModal = () => {
    const deleteEmails = Object.keys(selectedEmails);
    
    if (deleteEmails.length == 0) {
      return;
    }

    if (currentMessages == "deleted") {
      deleteDataApi({
        id: "bulk",
        data: { contact_ids: deleteEmails },
      });
    }
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

  // Añade esta función para manejar la apertura del modal:
const handleEmailClick = (email) => {
  setSelectedEmail(email);
  setIsEmailModalOpen(true);
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Manejador para el menú contextual
  const handleContextMenu = (e, emailId) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.pageX - 200,
      y: e.pageY,
      emailId: emailId,
    });
  };

  // Funciones para cambiar el estado de un correo
  const handleChangeEmailStatus = (status) => {
    setContextMenu({ show: false, x: 0, y: 0, emailId: null });
    setContextMenuStatus(status);
    setUpdateId(contextMenu.emailId);
  };

  useEffect(() => {
    console.log(contextMenuStatus);

    if (contextMenuStatus === "permanently-deleted") {

      deleteDataApi({
        id: "bulk",
        data: { contact_ids: [updateId] },
      });

      return;
    }
    
    if (contextMenuStatus && updateId) {
      updateDataApi({
        id: updateId + "/status",
        data: {},
        queryParams: `status=${contextMenuStatus}`,
      });
      setUpdateId("");
    }
  }, [contextMenu.emailId, contextMenuStatus, updateDataApi]);

  useEffect(() => {
    if (patchData) {
      refetch();
    }
  }, [patchData]);

  useEffect(() => {
    if (deleteData) {
      setIsModalOpen(false);
      refetch();
    }
  }, [deleteData]);

  const handleDeletion = () => {
    const deleteEmails = Object.keys(selectedEmails);
    if (deleteEmails.length == 0) {
      return;
    }

    // Move to deleated
    if (currentMessages !== "deleted") {
      updateDataApi({
        id: "status/bulk",
        data: { contact_ids: deleteEmails },
        queryParams: `status=deleted`,
      });
    }
    // Delete permanently
    else {
      setIsModalOpen(true)
    }
  };

  // Add this to your component state
  const [searchQuery, setSearchQuery] = useState("");

  // Add this function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmails = emails.filter((email) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    return (
      email.email.toLowerCase().includes(query) ||
      email.subject.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex h-screen dark:bg-gray-900 px-10 py-6">
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
            <FaEye className="h-5 w-5 mr-3" />
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
            <FaArchive className="h-5 w-5 mr-3" />
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
            <button
              className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
              onClick={handleDeletion}
            >
              <FaTrash className="h-5 w-5" />
            </button>
            <button
              onClick={refetch}
              className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
            >
              <FaSync className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center flex-1 mx-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Buscar correo..."
                className="block w-full pl-10 pr-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
          {errorAll && (
            <div className="flex flex-col gap-2 items-center justify-center h-full">
              <BallLoader />
              <p className="text-gray-400 text-xl font-semibold">
                Surgió un error al cargar los correos...
              </p>
            </div>
          )}

          {isFetchingAll || isDeleting || isPatching && (
            <div className="flex flex-col gap-2 items-center justify-center h-full">
              <BallLoader />
              <p className="text-gray-400 text-xl font-semibold">
                Cargando correos...
              </p>
            </div>
          )}

          {!errorAll && !isFetchingAll && !isDeleting && !isPatching && filteredEmails.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-xl font-semibold">
                {searchQuery.trim()
                  ? "No se encontraron resultados"
                  : `No hay correos ${
                      currentMessages == "new"
                        ? "nuevos"
                        : currentMessages == "readed"
                        ? "leídos"
                        : currentMessages == "responded"
                        ? "respondidos"
                        : currentMessages == "archived"
                        ? "archivados"
                        : "eliminados"
                    }`}
              </p>
            </div>
          )}

          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className="grid grid-cols-12 px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer relative"
              onContextMenu={(e) => handleContextMenu(e, email.id)}
              onClick={() => handleEmailClick(email)}
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
              <div className="col-span-3">{email.email}</div>
              <div className="col-span-5">{email.subject}</div>
              <div className="col-span-3 text-right text-xs absolute right-2 bottom-2">
                {formatDate(email.updated_at)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menú contextual */}
      {contextMenu.show && (
        <div
          className="absolute bg-white dark:bg-gray-800 shadow-lg rounded py-1 border border-gray-200 dark:border-gray-700 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <>
            {currentMessages !== "readed" && (
              <div
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleChangeEmailStatus("readed")}
              >
                <FaEye className="h-4 w-4 mr-2" />
                <span>Marcar como leído</span>
              </div>
            )}

            {currentMessages !== "responded" && (
              <div
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleChangeEmailStatus("responded")}
              >
                <FaPaperPlane className="h-4 w-4 mr-2" />
                <span>Marcar como respondido</span>
              </div>
            )}

            {currentMessages !== "archived" && (
              <div
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleChangeEmailStatus("archived")}
              >
                <FaArchive className="h-4 w-4 mr-2" />
                <span>Archivar</span>
              </div>
            )}

            {currentMessages !== "deleted" && (
              <div
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleChangeEmailStatus("deleted")}
              >
                <FaTrash className="h-4 w-4 mr-2" />
                <span>Eliminar</span>
              </div>
            )}
          </>

          <div
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => handleChangeEmailStatus("permanently-deleted")}
          >
            <FaTrash className="h-4 w-4 mr-2" />
            <span>Eliminar Definitivamente</span>
          </div>
        </div>
      )}

      <BaseModal
        enabledSend={true}
        modalState={[!!isModalOpen, setIsModalOpen]}
        modalType={"delete"}
        cancelable
        onSend={() => handleSendModal()}
      >
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-red-500">Atención</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-neutral-200">
            Esta acción no se puede deshacer. Una vez eliminada, la información
            no podrá recuperarse.
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-neutral-200">
            ¿Está seguro de que desea continuar?
          </p>
        </div>
      </BaseModal>

      <EmailViewerModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        email={selectedEmail}
      />
    </div>
  );
};

export default InboxComponent;
