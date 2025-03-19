import { useState } from "react";
import { CREATE } from "../../../api/api_constants";
import { useContactoApi } from "./useContactoApi"; 

const emptyFormData = {
  subject: "",
  name: "",
  email: "",
  message: "",
};

export const useContactoForm = () => {
  const [formData, setFormData] = useState(emptyFormData);
  const [stage, setStage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Usa la API
  const { handleSendModal, isLoading, alert } = useContactoApi(setIsModalOpen, setFormData, emptyFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    setStage(CREATE);
    setIsModalOpen(true);
    setFormData({ ...emptyFormData });

    // Envía los datos a la API
    handleSendModal(CREATE, formData);
  };

  return {
    formData,
    setFormData,
    stage,
    isModalOpen,
    setIsModalOpen,
    handleChange,
    handleCreate,
    alert, // Devolvemos la alerta
    isLoading,
  };
};
