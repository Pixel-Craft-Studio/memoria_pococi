import TemplateZero from "./components/TemplateZero";
import TemplateOne from "./components/TemplateOne";
import TemplateTwo from "./components/TemplateTwo";
import { useContent } from "./ContentContext";
import TemplateController from "./components/TemplateController";

const Contribute = () => {
  const { contents } = useContent();

  const templates = {
    template_zero: TemplateZero,
    template_one: TemplateOne,
    template_two: TemplateTwo,
  };

  return (
    <div>
      {contents.map((content, index) => {
        const Template = templates[content.template];
        return (
          <div key={index} className="animate__animated animate__bounceInRight">
            <Template index={index} />
          </div>
        );
      })}

      <div className="flex w-full justify-center m-1">
        <TemplateController></TemplateController>
      </div>
    </div>
  );
};

export default Contribute;
