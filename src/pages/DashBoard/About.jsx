import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { ENDPOINTS } from "../../api/api_constants";
import { useGetById, usePatch } from "../../hooks/useBaseEndpointQueries";

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


  useEffect(() => {
    if (patchData) {
      refetchOne();
    }
  }, [patchData, refetchOne]);

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
          description: description || response.data.content.description ,
          image_url: imageUrl || response.data.content.image_url,
        },
      },
    };

    updateDataApi(updatedData);
  };

  // Manejar estados de carga y errores
  if (isFetching) return <p>Cargando...</p>;
  if (errorAll) return <p>Salio mal</p>;
  if (!response) return <p>No hubo datos en la respuesta</p>;

  return (
    <div className="relative flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white duration-300 ease-in-out">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Sobre nosotros</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Aquí puedes ver y actualizar la sección sobre nosotros.
        </p>

        {/* Sección de Visualización */}
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-3xl font-bold my-5">Información Actual</h2>
          <div className="w-3/4">
            <p className="text-md font-medium my-5">
              {response.data.content.description}
            </p>
            <img
              className="my-5 rounded-xl h-60 w-full object-cover"
              src={response.data.content.image_url}
              alt="About"
            />
            <p>{response.data.content.image_url}</p>
          </div>
        </div>

        {/* Sección de Actualización */}
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-3xl font-bold my-5">Actualizar Información</h2>
          <div className="w-3/4">
            <textarea
              className="w-full p-2 border rounded mb-5"
              placeholder="Nueva descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 border rounded mb-5"
              placeholder="Nueva URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleUpdate}
              disabled={isPatching}
            >
              {isPatching ? "Actualizando..." : "Actualizar"}
            </button>
            {patchError && (
              <p className="text-red-500 mt-2">Error al actualizar</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
