import { useState } from "react";
import { CREATE, DELETE, UPDATE } from "../../../../api/api_constants";

const emptyFormData = {
  year: "",
  title: "",
  description: "",
  image_url: "",
};

export const usePeriodForm = () => {
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
    if (stage === DELETE) {
      return formData.confirm == formData.year;
    }

    if (stage === CREATE) {
      return formData.title !== "" && formData.description !== "" && formData.image !== "" && formData.year !== "";
    }

    if (stage === UPDATE) {
      return formData.title !== "" && formData.description !== "" && formData.image !== "" && formData.year !== "";
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
