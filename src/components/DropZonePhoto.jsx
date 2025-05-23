import { useCallback, useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { API_URL } from "../api/api_constants";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const DropZoneTeam = ({ formData, handleChange }) => {
  const [imgError, setImgError] = useState(false);
  const [preview, setPreview] = useState(null);

  console.log(formData);
  

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          handleChange({
            target: {
              name: "image",
              value: file,
            },
          });
        };
        reader.readAsDataURL(file);
      }
    },
    [handleChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

  useEffect(() => {
    if (formData && formData.photo_url && !formData.image) {
      setPreview(`${API_URL}/image${formData.photo_url}`);
      setImgError(false);
    }
  }, [formData]);

  return (
    <>
      <div
        {...getRootProps()}
        className="w-full p-4 border-2 border-dashed rounded-md dark:bg-gray-700 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input
          onInput={handleChange}
          name="image"
          id="image"
          {...getInputProps()}
        />

        {preview && !imgError ? (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Vista previa"
              className="w-16 h-16 object-contain border rounded mb-2"
              onError={() => setImgError(true)}
            />
            <p className="text-sm text-gray-500">
              Click o arrastra para cambiar
            </p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 shadow rounded flex items-center justify-center bg-gray-100 dark:bg-gray-700 mb-2">
              <AiOutlinePicture className="text-gray-400" size={24} />
            </div>
            <p className="text-sm text-gray-500">
              Arrastra y suelta una imagen o haz clic aquí
            </p>
          </>
        )}
      </div>
    </>
  );
};

DropZoneTeam.propTypes = {
  handleChange: PropTypes.func,
  formData: PropTypes.shape({
    photo_url: PropTypes.string,
    image: PropTypes.file,
  }).isRequired,
};

export default DropZoneTeam;
