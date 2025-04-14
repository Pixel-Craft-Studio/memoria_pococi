import { Link } from "react-router-dom";
import { API_URL, ENDPOINTS } from "../../api/api_constants";
import { useGetAll } from "../../hooks/useBaseEndpointQueries"; // Adjust the path as needed
import { useEffect, useState } from "react";
import BallLoader from "../../components/BallLoader";
import { PiWarning } from "react-icons/pi";

// eslint-disable-next-line react/prop-types
const TimelineItem = ({ year, title, description, image_url, isReversed }) => {
  return (
    <div
      className={`flex justify-between flex-col md:flex-row mt-6 ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Columna 2 */}
      <div className="w-full md:w-[45%] flex flex-col gap-3 px-4 order-3 md:order-3 lg:order-1 mt-2">
        <h2 className="font-bold text-2xl text-neutral-500">{title}</h2>
        <p className="line-clamp-5 text-justify">{description}</p>
        <Link
          to={`/linea-anual/${year}`}
          className="text-sm text-left cursor-pointer text-blue-500 hover:underline"
        >
          Ver historias
        </Link>
      </div>

      {/* Columna 1 */}
      <div className="flex justify-evenly gap-4 items-center w-full md:w-[45%] flex-col md:flex-row order-2 md:order-4 lg:order-3">
        <img
          className="w-full md:w-[380px] h-auto rounded-lg aspect-video"
          src={`${API_URL}/image${image_url}`}
          alt={`Imagen de ${year}`}
        />
      </div>

      <div
        className={`flex w-full  gap-3 items-center md:flex-col justify-center order-1 md:order-2 lg:order-2 md:w-10 mb-2 ${
          isReversed ? "" : "lg:ml-10"
        }`}
      >
        <h2 className="font-bold text-neutral-500 text-2xl ">{year}</h2>

      </div>

      {/* Columna 3 */}
      <div
        className={`relative hidden  md:block n md:absolute md:left-10 lg:relative md:order-1 lg-order-3 hidden-900 ${
          isReversed ? "lg:mr-17" : "lg:ml-13"
        }`}
      >
        <div className="bg-[#f0f0f0] w-[41px] h-[41px] rounded-full"></div>
        <div className="absolute h-[220px] border-neutral-400 border-l-2 top-[40px] left-[20px]"></div>
      </div>
    </div>
  );
};

const InitialTimeline = () => {
  const [timelineYears, setTimelineYears] = useState([]);

  const {
    data: allResponseData,
    isFetching: isFetchingAll,
    error: errorAll,
  } = useGetAll(ENDPOINTS.TIMELINE_YEAR);

  useEffect(() => {
    if (allResponseData) {
      setTimelineYears(allResponseData.data);
    }
  }, [allResponseData]);

  const renderLoading = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full m-auto">
          <BallLoader></BallLoader>

          <p className="text-center text-gray-400 text-xl animate-pulse font-bold">
            Cargando años...
          </p>
        </div>
      </>
    );
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

  if (errorAll) {
    return renderError();
  }

  if (isFetchingAll) {
    return renderLoading();
  }

  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-4 ">
        {timelineYears.map((item, index) => (
          <TimelineItem key={index} {...item} isReversed={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default InitialTimeline;
