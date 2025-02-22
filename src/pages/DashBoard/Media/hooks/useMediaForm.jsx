import { useState } from "react";
import { CREATE, DELETE, UPDATE } from "../../../../api/api_constants";

const emptyFormData = {
  name: "",
  image_url: "",
};

export const useMediaForm = () => {
  const [formData, setFormData] = useState(emptyFormData);
  const [stage, setStage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  };

  const handleCloseModal = () => {
    setFormData({ ...emptyFormData });
  };

  const handleCancelModal = () => {
    setFormData({ ...emptyFormData });
  };

  const changeStage = (newStage) => {
    setIsModalOpen(true);
    setStage(newStage);
  };

  const isValidForm = () => {
    console.log(formData);
    
    if (stage === DELETE) {
      return formData.confirm === formData.name;
    }

    if (stage === CREATE) {
      return formData.name !== "" && formData.image;
    }

    if (stage === UPDATE) {
      return formData.name !== "";
    }
    return false;
  };

  return {
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
  };
};
