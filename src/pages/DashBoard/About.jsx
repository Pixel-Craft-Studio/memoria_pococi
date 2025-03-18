import { useEffect, useState } from "react";
import { API_URL, ENDPOINTS } from "../../api/api_constants";
import { useGetById, usePatch } from "../../hooks/useBaseEndpointQueries";
import { convertJsonToFormData } from "../../api/api_core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import DropZone from "../../components/DropZone";

function About() {
  const { data: response, isFetching, error: errorAll, refetch: refetchOne } = useGetById(ENDPOINTS.CONFIGURATION, "about-us");
  const { data: patchData, mutate: updateDataApi, isLoading: isPatching, error: patchError } = usePatch(ENDPOINTS.CONFIGURATION);

  const [showPopup, setShowPopup] = useState(false);
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {    
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const payload = {
      description: description || response.data.content.description,
    };

    if (formData.image) {
      payload["image"] = formData.image;
    }

    updateDataApi({
      id: "about-us",
      data: convertJsonToFormData(payload),
    });
  };

  useEffect(() => {
    if (patchData) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
      refetchOne();
    }
  }, [patchData, refetchOne]);

  if (isFetching)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
        <div className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
          <ExclamationCircleIcon className="h-6 w-6" />
          <span>Cargando...</span>
        </div>
      </div>
    );

  if (errorAll)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
          <ExclamationCircleIcon className="h-6 w-6" />
          <span>Algo salió mal. Inténtalo de nuevo.</span>
        </div>
      </div>
    );

  return (
    <div className="relative flex min-h-screen pt-15 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white ">
      <main className="flex-1  max-w-screen-lg mx-auto p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center lg:text-left mb-4">Sobre nosotros</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center lg:text-left mb-8">
          Aquí puedes ver y actualizar la sección sobre nosotros.
        </p>

        {/* Sección de Visualización */}
        <div className="flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <div className="lg:w-1/2 px-4">
            <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Información Actual</h2>
            <p className="text-gray-700 dark:text-gray-300 text-justify">{response.data.content.description}</p>
          </div>

          <div className="lg:w-1/2 flex justify-center px-4 mt-6 lg:mt-0">
            <img
              className="rounded-lg w-full h-auto max-w-lg md:max-w-xl lg:max-w-2xl object-cover"
              src={`${API_URL}/image${response.data.content.image_url}`}
              alt="About"
            />
          </div>
        </div>

        {/* División */}
        <div className="h-px bg-gray-300 dark:bg-gray-700 my-8"></div>

        {/* Sección de Actualización */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Actualizar Información</h2>
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Nueva descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />

            <DropZone formData={formData} handleChange={handleChange} />

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Nota:</strong> La nueva imagen debe tener un tamaño de 1920x500 píxeles para una mejor visualización.
              </p>
            </div>

            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUpdate}
              disabled={isPatching}
            >
              {isPatching ? "Actualizando..." : "Actualizar"}
            </button>
            {patchError && (
              <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
                <ExclamationCircleIcon className="h-6 w-6" />
                <span>Error al actualizar.</span>
              </div>
            )}
          </div>
        </div>

        {/* Popup de éxito */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
              <CheckCircleIcon className="h-6 w-6" />
              <span>¡Actualización exitosa!</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default About;
