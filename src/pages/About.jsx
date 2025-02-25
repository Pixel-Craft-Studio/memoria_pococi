import { PiWarning } from "react-icons/pi";
import { API_URL, ENDPOINTS } from "../api/api_constants";
import { useGetById } from "../hooks/useBaseEndpointQueries";
import BallLoader from "../components/BallLoader";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";

function About() {
  const {
    data: response,
    isFetching: isFetching,
    error: errorAll,
  } = useGetById(ENDPOINTS.CONFIGURATION, "about-us");

  const [isImageError, setIsImageError] = useState(false);

  const renderLoading = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full m-auto">
          <BallLoader></BallLoader>

          <p className="text-center text-gray-400 text-xl animate-pulse font-bold">
            Cargando equipo...
          </p>
        </div>
      </>
    );
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  const renderError = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full m-auto">
          <PiWarning className="text-gray-400" size={36}></PiWarning>

          <p className="text-center text-gray-400 text-xl font-bold">
            Surgió un error al cargar, inténtelo nuevamente.
          </p>
        </div>
      </>
    );
  };

  if (isFetching) return renderLoading();

  if (errorAll) return renderError();

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-3/4 mt-15">
          <h2 className="text-3xl font-bold text-center mb-6 text-neutral-500 animate__animated animate__fadeIn">
            Sobre nosotros
          </h2>
          <p
            className="text-md font-medium my-5 animate__animated animate__fadeIn"
            style={{ animationDelay: `0.3s` }}
          >
            {response.data.content.description}
          </p>
        </div>

        {!isImageError && (
          <img
            className="my-5 rounded-xl h-60 w-3/4 object-cover animate__animated animate__fadeInUp"
            style={{ animationDelay: `1s` }}
            src={`${API_URL}/imaage${response.data.content.image_url}`}
            alt="About"
            onError={handleImageError}
          />
        )}

        {isImageError && (
          <div
            className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate__animated animate__fadeInUp"
            style={{ animationDelay: `0.7s` }}
          >
            <AiOutlinePicture className="text-gray-500 w-[300px] h-[300px]" />
          </div>
        )}
      </div>
    </>
  );
}

export default About;
