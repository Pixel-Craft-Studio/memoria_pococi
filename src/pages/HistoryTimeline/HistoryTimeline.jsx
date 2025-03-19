import TemplateOne from "../Contribute/components/TemplateOne";
import TemplateTwo from "../Contribute/components/TemplateTwo";
import TemplateZero from "../Contribute/components/TemplateZero";
import { useContent } from "../Contribute/ContentContext";

const HistoryTimeline = () => {
  const { contents, changeFullContent } = useContent();

  changeFullContent(
    [
      {
        template: "template_zero",
        stage: "preview",
        inverted: false,
        title: "Auge de la Agricultura",
        year: "1874",
        content:
          "Turrialba se convirtió en un punto estratégico gracias al desarrollo del Ferrocarril al Caribe, una obra impulsada por el gobierno de Próspero Fernández y ejecutada bajo la dirección del ingeniero John Durbin. Este proyecto atrajo a cientos de trabajadores, principalmente inmigrantes que buscaban oportunidades en la creciente industria del transporte ferroviario. Con el tiempo, la región experimentó un auge económico, impulsado por la producción agrícola y el comercio con las provincias cercanas.",
        image_url: "",
      }
  
    ]
  );

  const templates = {
    template_zero: TemplateZero,
    template_one: TemplateOne,
    template_two: TemplateTwo,
  };

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
