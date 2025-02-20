import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { ENDPOINTS } from "../../api/api_constants";
import { useGetById, usePatch } from "../../hooks/useBaseEndpointQueries";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

function About() {
  // Obtener los datos actuales
  const {
    data: response,
    isFetching: isFetching,
    error: errorAll,
    refetch: refetchOne,
  } = useGetById(ENDPOINTS.CONFIGURATION, "about-us");

  // Hook para actualizar los datos
  const {
    data: patchData,
    mutate: updateDataApi,
    isLoading: isPatching,
    error: patchError,
  } = usePatch(ENDPOINTS.CONFIGURATION);

  // Estado para controlar la visibilidad del popup
  const [showPopup, setShowPopup] = useState(false);

  // Estados para los inputs de actualización
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Manejar la actualización
  const handleUpdate = async () => {
    const updatedData = {
      id: "about-us",
      data: {
        key: "about-us",
        content: {
          description: description || response.data.content.description,
          image_url: imageUrl || response.data.content.image_url,
        },
      },
    };

    updateDataApi(updatedData);
  };

  // Efecto para mostrar el popup y recargar los datos
  useEffect(() => {
    if (patchData) {
      setShowPopup(true); // Mostrar popup
      setTimeout(() => setShowPopup(false), 1000); // Ocultar después de 1 segundo
      refetchOne(); // Recargar datos
    }
  }, [patchData, refetchOne]);

  // Manejar estados de carga y errores
  if (isFetching)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
          <ExclamationCircleIcon className="h-6 w-6" />
          <span>Cargando...</span>
        </div>
      </div>
    );

  if (errorAll)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
          <ExclamationCircleIcon className="h-6 w-6" />
          <span>Algo salió mal. Inténtalo de nuevo.</span>
        </div>
      </div>
    );

  if (!response)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-yellow-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
          <ExclamationCircleIcon className="h-6 w-6" />
          <span>No hubo datos en la respuesta.</span>
        </div>
      </div>
    );

  return (
    <div className="relative flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white duration-300 ease-in-out">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Sobre nosotros</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Aquí puedes ver y actualizar la sección sobre nosotros.
        </p>

        {/* Sección de Visualización */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Información Actual</h2>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {response.data.content.description}
            </p>
            <img
              className="rounded-lg h-60 w-full object-cover"
              src={response.data.content.image_url}
              alt="About"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Enlace de la imagen publicada:</p>
              <p className="break-all">{response.data.content.image_url}</p>
            </div>
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
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Nota:</strong> Al subir la nueva imagen debe tener un tamaño de 1920x500 píxeles. Si se sube una imagen de un tamaño diferente, su visualización puede cambiar.
              </p>
            </div>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Nueva URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
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
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            showPopup ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Fondo semitransparente */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ${
              showPopup ? "opacity-50" : "opacity-0"
            }`}
          ></div>

          {/* Contenido del popup */}
          <div
            className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${
              showPopup ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2">
              <CheckCircleIcon className="h-6 w-6" />
              <span>¡Actualización exitosa!</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;