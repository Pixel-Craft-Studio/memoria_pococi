import TemplateZero from "./components/TemplateZero";
import TemplateOne from "./components/TemplateOne";
import TemplateTwo from "./components/TemplateTwo";
import { useContent } from "./ContentContext";
import TemplateController from "./components/TemplateController";
import YearDateSelector from "./components/YearDateSelector";
import CategorySelector from "./components/CategorySelector";
import { useEffect, useState } from "react";

const Contribute = () => {
  const { contents, setContent } = useContent();

  const [selectedYear, setSelectedYear] = useState();

  useEffect(() => {
    setContent(0, { year: selectedYear });
  }, [selectedYear, setContent]);

  const templates = {
    template_zero: TemplateZero,
    template_one: TemplateOne,
    template_two: TemplateTwo,
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex container">
          <YearDateSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          ></YearDateSelector>
          <CategorySelector></CategorySelector>
        </div>
      </div>
      {contents.map((content, index) => {
        const Template = templates[content.template];
        return (
          <div key={index} className="animate__animated animate__bounceInRight">
            <Template index={index} />
          </div>
        );
      })}

      <div className="flex w-full justify-center m-1 mb-12">
        <TemplateController></TemplateController>
      </div>
    </div>
  );
};

export default Contribute;
