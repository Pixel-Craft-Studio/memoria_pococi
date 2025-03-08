import TeamCard from "../components/CardTeams";

import { PiWarning } from "react-icons/pi";
import { ENDPOINTS } from "../api/api_constants";
import { useGetAll } from "../hooks/useBaseEndpointQueries";
import BallLoader from "../components/BallLoader";

const Team = () => {
  const {
    data: allResponseData,
    isFetching: isFetchingAll,
    error: errorAll,
  } = useGetAll(ENDPOINTS.TEAM_MEMBER);

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

  if (isFetchingAll) return renderLoading();
  if (errorAll) return renderError();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl text-center mb-6 text-neutral-500 animate__animated animate__fadeIn">
        Nuestro Equipo
      </h2>
      <div className="flex flex-wrap justify-center gap-8  ">
        {allResponseData &&
          allResponseData.data.map((partner, i) => (
            <TeamCard key={partner.id} partner={partner} index={i} />
          ))}
      </div>
    </div>
  );
};

export default Team;
