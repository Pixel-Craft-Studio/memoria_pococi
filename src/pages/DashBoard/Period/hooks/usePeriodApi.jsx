import { useCallback, useEffect, useState } from "react";
import { CREATE, DELETE, ENDPOINTS, UPDATE } from "../../../../api/api_constants";
import { useDelete, usePatch, usePost } from "../../../../hooks/useBaseEndpointQueries";
import { convertJsonToFormData } from "../../../../api/api_core";

export const usePeriodApi = (setIsModalOpen, setFormData, emptyFormData) => {
  const [updateSignal, setUpdateSignal] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const {
    data: createDataResponse,
    mutate: postDataApi,
    isLoading: isPosting,
    error: postError,
  } = usePost(ENDPOINTS.TIMELINE_YEAR);

  const {
    data: updateDataResponse,
    mutate: updateDataApi,
    isLoading: isPatching,
    error: patchError,
  } = usePatch(ENDPOINTS.TIMELINE_YEAR);

  const {
    data: deleteDataResponse,
    mutate: deleteDataApi,
    isLoading: isDeleting,
    error: deleteError,
  } = useDelete(ENDPOINTS.TIMELINE_YEAR);

  const handleSendModal = (stage, formData) => {
    if (stage === DELETE) {
      deleteDataApi({id: formData.id});
    } else if (stage === CREATE) {
      postDataApi(convertJsonToFormData({ ...formData }));
    } else if (stage === UPDATE) {
      updateDataApi({
        id: formData.id,
        data: convertJsonToFormData({ ...formData }),
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
    handleSuccess("Se ha registrado el año exitosamente");
  }, [createDataResponse, handleSuccess]);

  useEffect(() => {
    if (!updateDataResponse) return;
    handleSuccess("Se ha actualizado el año exitosamente");
  }, [handleSuccess, updateDataResponse]);

  useEffect(() => {
    if (!deleteDataResponse) return;
    handleSuccess("Se ha eliminado el año exitosamente");
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
