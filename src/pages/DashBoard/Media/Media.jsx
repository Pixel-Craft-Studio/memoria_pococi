//import MediaTable from "../Components/MediaTable";
import MediaForm from "../Components/MediaForm";
import { useMediaForm } from "./hooks/useMediaForm";
import { CREATE, UPDATE } from "../../../api/api_constants";
import BaseModal from "../../../components/BaseModal";
import AlertModal from "../../../components/AlertModal";
import { useMediaApi } from "./hooks/useMediaApi";
import MediaCards from "../Components/MediaCards";
import { PlusIcon } from "@heroicons/react/24/solid";

const Media = () => {
  const {
    formData,
    setFormData,
    stage,
    isModalOpen,
    setIsModalOpen,
    handleChange,
    handleCreate,
    handleCloseModal,
    handleCancelModal,
    changeStage,
    isValidForm,
  } = useMediaForm();

  const { updateSignal, setUpdateSignal, alert, setAlert, handleSendModal } =
    useMediaApi(setIsModalOpen, setFormData);

  return (
    <div className="relative flex min-h-screen pt-15 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">

      <div className="p-4 w-full">
        <div className="flex justify-between p-4">
          <div>Redes sociales</div>
          <button
            type="button"
            className="flex gap-2 items-center font-bold cursor-pointer px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700 transition-colors duration-200"
            onClick={handleCreate}
          >
            <PlusIcon width={20}></PlusIcon>
            Crear
          </button>
        </div>

       {/* <MediaTable
          setFormData={setFormData}
          setAlert={setAlert}
          changeStage={changeStage}
          updateSignalState={[updateSignal, setUpdateSignal]}
        />
        */}
        <MediaCards
          setFormData={setFormData}
          setAlert={setAlert}
          changeStage={changeStage}
          updateSignalState={[updateSignal, setUpdateSignal]}
        />

        <BaseModal
          enabledSend={isValidForm()}
          modalState={[!!isModalOpen, setIsModalOpen]}
          modalType={stage}
          submitText={
            stage === CREATE
              ? "Enviar"
              : stage === UPDATE
                ? "Actualizar"
                : "Eliminar"
          }
          cancelable
          onCancel={handleCancelModal}
          onClose={handleCloseModal}
          onSend={() => handleSendModal(stage, formData)}
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
          onClose={() => setAlert({ message: "", type: "" })}
        />
      </div>
    </div>
  );
};

export default Media;
