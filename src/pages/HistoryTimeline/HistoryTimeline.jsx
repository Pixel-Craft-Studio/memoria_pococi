import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../../api/api_constants";
import { useGetById } from "../../hooks/useBaseEndpointQueries";
import TemplateOne from "../Contribute/components/TemplateOne";
import TemplateTwo from "../Contribute/components/TemplateTwo";
import TemplateZero from "../Contribute/components/TemplateZero";
import { useContent } from "../Contribute/ContentContext";
import { useEffect, useState } from "react";
import { PiWarning } from "react-icons/pi";
import BallLoader from "../../components/BallLoader";

const HistoryTimeline = () => {
  const { id } = useParams();
  const { contents, changeFullContent } = useContent();

  const [timelineHistory, setTimelineHistory] = useState({});

  const {
    data: response,
    isFetching: isFetching,
    error: errorAll,
  } = useGetById(ENDPOINTS.TIMELINE_HISTORY, id);


  useEffect(() => {
    if (response) {
      setTimelineHistory(response.data);
    }
  }, [response]);

  useEffect(() => {
    if (timelineHistory) {
      console.log(timelineHistory);
      
      changeFullContent([
        {
          template: "template_zero",
          stage: "preview",
          inverted: false,
          title: timelineHistory.title,
          year: timelineHistory.year,
          content: timelineHistory.description,
          image_url: timelineHistory.image_url,
        },
      ]);
    }
  
  }, [changeFullContent, timelineHistory])
  

  const templates = {
    template_zero: TemplateZero,
    template_one: TemplateOne,
    template_two: TemplateTwo,
  };

  const renderLoading = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full m-auto">
          <BallLoader></BallLoader>

          <p className="text-center text-gray-400 text-xl animate-pulse font-bold">
            Cargando historia...
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

  if (isFetching) {
    return renderLoading();
  }

  return (
    <>
      {contents.map((content, index) => {
        const Template = templates[content.template];
        return (
          <div key={index} className="animate__animated animate__bounceInRight">
            <Template hasControllers={false} index={index} />
          </div>
        );
      })}
    </>
  );
};

export default HistoryTimeline;
