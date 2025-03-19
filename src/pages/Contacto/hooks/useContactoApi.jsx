import { useCallback, useEffect, useState } from "react";
import { CREATE, DELETE, ENDPOINTS, UPDATE } from "../../../api/api_constants";
import { useDelete, usePatch, usePost } from "../../../hooks/useBaseEndpointQueries";

export const useContactoApi = (setIsModalOpen, setFormData, emptyFormData) => {
  const [updateSignal, setUpdateSignal] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const {
    data: createDataResponse,
    mutate: postDataApi,
    isLoading: isPosting,
    error: postError,
  } = usePost(ENDPOINTS.CONTACTS);

  const {
    data: updateDataResponse,
    mutate: updateDataApi,
    isLoading: isPatching,
    error: patchError,
  } = usePatch(ENDPOINTS.CONTACTS);

  const {
    data: deleteDataResponse,
    mutate: deleteDataApi,
    isLoading: isDeleting,
    error: deleteError,
  } = useDelete(ENDPOINTS.CONTACTS);

  const handleSendModal = (stage, formData) => {
    if (stage === DELETE) {
      deleteDataApi(formData.id);
    } else if (stage === CREATE) {
      postDataApi({ ...formData });
    } else if (stage === UPDATE) {
      updateDataApi({
        id: formData.id,
        data: { ...formData },
      });
    }
  };

  const handleSuccess = useCallback(
    (message) => {
      setIsModalOpen(false);
      setFormData({ ...emptyFormData });
      setUpdateSignal(true);
      setAlert({
        message,
        type: "success",
      });
    },
    [setIsModalOpen, setFormData, emptyFormData, setUpdateSignal, setAlert]
  );

  // Success handling effects
  useEffect(() => {
    if (!createDataResponse) return;
    handleSuccess("Se ha enviado exitosamente el formulario");
  }, [createDataResponse, handleSuccess]);

  useEffect(() => {
    if (!updateDataResponse) return;
    handleSuccess("Pendiente por definir");
  }, [handleSuccess, updateDataResponse]);

  useEffect(() => {
    if (!deleteDataResponse) return;
    handleSuccess("Pendiente por definir");
  }, [deleteDataResponse, handleSuccess]);

  // Error handling effect
  useEffect(() => {
    if (!postError && !patchError && !deleteError) return;
    setAlert({
      message: "Hubo un error al procesar, inténtalo nuevamente",
      type: "error",
    });
  }, [postError, patchError, deleteError]);

  // Loading effect
  useEffect(() => {
    if (!isPosting && !isPatching && !isDeleting) return;
    setAlert({
      message: "Cargando...",
      type: "loading",
    });
  }, [isPosting, isPatching, isDeleting]);



  return {
    updateSignal,
    setUpdateSignal,
    alert,
    setAlert,
    handleSendModal,
    isLoading: isPosting || isPatching || isDeleting,
  };
};
