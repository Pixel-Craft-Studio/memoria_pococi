import { API_URL, ENDPOINTS } from "../api/api_constants";
import { useGetById } from "../hooks/useBaseEndpointQueries";

function About() {
  const {
    data: response,
    isFetching: isFetching,
    error: errorAll,
  } = useGetById(ENDPOINTS.CONFIGURATION, "about-us");
  console.log(response);

  if (isFetching) return <p>Cargando...</p>;
  if (errorAll) return <p>Salio mal</p>;
  if (!response) return <p>No hubo datos en la respuesta</p>;
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-3/4 mt-15">
          <h2 className="text-3xl font-bold my-5">Sobre nosotros</h2>
          <p className="text-md font-medium my-5">
            {response.data.content.description}
          </p>
        </div>

        <img
          className="my-5 rounded-xl h-60 w-3/4 object-cover"
          src={`${API_URL}/image${response.data.content.image_url}`}
          alt="About"
        />
      </div>
    </>
  );
}

export default About;
