
import TeamForm from "./TeamForm";
import { useTeamForm } from "./hooks/useTeamForm";
import { CREATE, UPDATE } from "../../../api/api_constants";
import BaseModal from "../../../components/BaseModal";
import AlertModal from "../../../components/AlertModal";
import { useTeamApi } from "./hooks/useTeamApi";
import TeamCards from "./useTeamCard";
import { PlusIcon } from "@heroicons/react/24/solid";


const Equipo = () => {
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
    } = useTeamForm();

    const { updateSignal, setUpdateSignal, alert, setAlert, handleSendModal } =
        useTeamApi(setIsModalOpen, setFormData);

    return (
        <div className="relative flex min-h-screen pt-15 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="p-4 w-full">
                <div className="flex justify-between p-4">
                    <div>Equipo de trabajo.</div>
                    <button
                        type="button"
                        className="flex gap-2 items-center font-bold cursor-pointer px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700 transition-colors duration-200"
                        onClick={handleCreate}
                    >
                        <PlusIcon width={20}></PlusIcon>
                        Crear
                    </button>
                </div>

                <TeamCards
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
                    <TeamForm
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

export default Equipo;
