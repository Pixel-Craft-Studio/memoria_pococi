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

  const handleImageError = () => {
    setIsImageError(true);
  };

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <BallLoader />
      <p className="text-center text-gray-400 text-xl animate-pulse font-bold">
        Cargando equipo...
      </p>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <PiWarning className="text-gray-400" size={36} />
      <p className="text-center text-gray-400 text-xl font-bold">
        Surgió un error al cargar, inténtelo nuevamente.
      </p>
    </div>
  );

  if (isFetching) return renderLoading();
  if (errorAll) return renderError();

  return (
    <div className="flex flex-col my-10  lg:my-0 lg:flex-row items-center justify-center min-h-screen max-w-screen-xl mx-auto px-5 overflow-y-auto">
      <div className="flex flex-col text-center lg:text-left mb-8 lg:mb-0 px-4 lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6 text-neutral-600 animate__animated animate__fadeIn">
          Sobre nosotros
        </h2>
        <p
          className="text-md text-justify animate__animated animate__fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          {response.data.content.description}
        </p>
      </div>

      <div className="px-4 lg:w-1/2 flex justify-center">
        {!isImageError ? (
          <img
            className="rounded-md w-full h-auto max-w-[400px] md:max-w-[500px] lg:max-w-[400px] xl:max-w-[400px] object-cover animate__animated animate__fadeIn"
            style={{ animationDelay: "0.5s" }}
            src={`${API_URL}/image${response.data.content.image_url}`}
            alt="About"
            onError={handleImageError}
          />
        ) : (
          <div
            className="overflow-hidden flex items-center justify-center animate__animated animate__fadeInUp"
            style={{ animationDelay: "0.5s" }}
          >
            <AiOutlinePicture className="text-gray-500 w-[200px] h-[200px]" />
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
