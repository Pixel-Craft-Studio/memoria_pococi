import PerfilTable from "./PerfilTable";
import PerfilForm from "./PerfilForm";
import { usePerfilForm } from "./hooks/usePerfilForm";
import { CREATE, UPDATE } from "../../../api/api_constants";
import BaseModal from "../../../components/BaseModal";
import AlertModal from "../../../components/AlertModal";
import { usePerfilApi } from "./hooks/usePerfilApi";


const Perfil = () => {
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
    } = usePerfilForm();

    const { updateSignal, setUpdateSignal, alert, setAlert, handleSendModal } =
        usePerfilApi(setIsModalOpen, setFormData);

    return (
        <div className="relative flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="p-4 w-full">
                <div className="flex justify-between p-4">
                    <div>Perfiles existentes</div>
                    <button
                        type="button"
                        className="cursor-pointer px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700 transition-colors duration-200"
                        onClick={handleCreate}
                    >
                        Crear
                    </button>
                </div>

                < PerfilTable
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
                    <PerfilForm
                        stage={stage}
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
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

export default Perfil;
