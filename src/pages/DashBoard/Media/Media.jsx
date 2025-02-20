import Sidebar from "../Sidebar";

import { CREATE, UPDATE, DELETE, ENDPOINTS } from "../../../api/api_constants";
import { useEffect, useState } from "react";
import BaseModal from "../../../components/BaseModal";
import MediaForm from "./MediaForm";
import {
  useDelete,
  usePatch,
  usePost,
} from "../../../hooks/useBaseEndpointQueries";
import AlertModal from "../../../components/AlertModal";
import MediaTable from "./MediaTable";

const emptyFormData = {
  name: "",
  icon_url: "",
};

const Media = () => {
  const [formData, setFormData] = useState(emptyFormData);
  const [stage, setStage] = useState("");
  const [updateSignal, setUpdateSignal] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  const {
    data: createDataResponse,
    mutate: postDataApi,
    isLoading: isPosting,
    error: postError,
  } = usePost(ENDPOINTS.SOCIAL_PLATFORM);

  const {
    data: updateDataResponse,
    mutate: updateDataApi,
    isLoading: isPatching,
    error: patchError,
  } = usePatch(ENDPOINTS.SOCIAL_PLATFORM);

  const {
    data: deleteDataResponse,
    mutate: deleteDataApi,
    isLoading: isDeleting,
    error: deleteError,
  } = useDelete(ENDPOINTS.SOCIAL_PLATFORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    changeStage(CREATE);
    setisModalOpen(true);
    setFormData({ ...emptyFormData });
  };

  const handleCloseModal = () => {
    setFormData({ ...emptyFormData });
  };

  const handleCancelModal = () => {
    setFormData({ ...emptyFormData });
  };

  const handleSendModal = () => {
    console.log(stage);

    if (stage == DELETE) {
      deleteDataApi(formData.id);
    }

    if (stage == CREATE) {
      postDataApi({ ...formData });
    }

    if (stage == UPDATE) {
      updateDataApi({
        id: formData.id,
        data: { ...formData },
      });
    }
  };

  const changeStage = (stage) => {
    setisModalOpen(true);
    setStage(stage);
  };

  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const isValidForm = () => {
    if (stage == DELETE) {
      return formData.confirm == formData.name;
    }

    if (stage == CREATE) {
      return formData.name != "" && formData.icon_url != "";
    }

    if (stage == UPDATE) {
      return formData.name != "" && formData.icon_url != "";
    }

    return false;
  };

  useEffect(() => {
    if (!stage) {
      return;
    }

    setisModalOpen(true);
  }, [stage]);

  useEffect(() => {
    if (!postError && !patchError && !deleteError) {
      return;
    }

    setAlert((prev) => ({
      ...prev,
      message: "Hubo un error al procesar, inténtalo nuevamente",
      type: "error",
    }));
  }, [postError, patchError, deleteError]);

  useEffect(() => {
    if (!createDataResponse) {
      return;
    }

    setisModalOpen(false);
    setFormData({ ...emptyFormData });
    setUpdateSignal(true);
    setAlert((prev) => ({
      ...prev,
      message: "Se ha registrado la red social exitosamente",
      type: "success",
    }));
  }, [createDataResponse]);

  useEffect(() => {
    if (!updateDataResponse) {
      return;
    }

    setisModalOpen(false);
    setFormData({ ...emptyFormData });
    setUpdateSignal(true);
    setAlert((prev) => ({
      ...prev,
      message: `Se ha actualizado la red social exitosamente`,
      type: "success",
    }));
  }, [updateDataResponse]);

  useEffect(() => {
    if (!deleteDataResponse) {
      return;
    }

    setisModalOpen(false);
    setFormData({ ...emptyFormData });
    setUpdateSignal(true);
    setAlert((prev) => ({
      ...prev,
      message: "Se ha eliminado la red social exitosamente",
      type: "success",
    }));
  }, [deleteDataResponse]);

  useEffect(() => {
    if (!isPosting && !isPatching && !isDeleting) {
      return;
    }

    setAlert((prev) => ({
      ...prev,
      message: "Cargando...",
      type: "loading",
    }));
  }, [isPosting, isPatching, isDeleting]);

  return (
    <div className="relative flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white duration-300 ease-in-out">
      <Sidebar />

      <div className="p-4 w-full">
        <div className="flex justify-between p-4">
          <div>Redes sociales</div>

          <button
            type="button"
            className="cursor-pointer px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
            onClick={handleCreate}
          >
            Crear
          </button>
        </div>

        <MediaTable
          setFormData={setFormData}
          setAlert={setAlert}
          changeStage={changeStage}
          updateSignalState={[updateSignal, setUpdateSignal]}
        />

        <BaseModal
          enabledSend={isValidForm()}
          modalState={[!!isModalOpen, setisModalOpen]}
          modalType={stage}
          submitText={
            stage == CREATE
              ? "Enviar"
              : stage == UPDATE
              ? "Actualizar"
              : "Eliminar"
          }
          cancelable
          onCancel={handleCancelModal}
          onClose={handleCloseModal}
          onSend={handleSendModal}
        >
          <MediaForm
            stage={stage}
            formData={formData}
            handleChange={handleChange}
          />
        </BaseModal>

        <AlertModal
          message={alert.message}
          type={alert.type}
          onClose={() =>
            setAlert((prev) => ({ ...prev, message: "", type: "" }))
          }
        />
      </div>
    </div>
  );
};

export default Media;
