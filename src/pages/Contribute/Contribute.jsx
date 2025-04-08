/* eslint-disable react-hooks/exhaustive-deps */
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
  }, [selectedYear]);

  const templates = {
    template_zero: TemplateZero,
    template_one: TemplateOne,
    template_two: TemplateTwo,
  };

  return (
    <div className="flex container mx-auto ">
      <div className="flex flex-col w-72 bg-white rounded-lg shadow-sm mr-1 h-fit sticky top-6">
        <h2 className="text-xl mt-2 font-light text-gray-800 ">Configuración</h2>

        <div className="mb-6">
          <YearDateSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
        
        <div className="border-1 border-gray-200"/>

        <div >
          <CategorySelector />
        </div>

        <button className="cursor-pointer w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-200 ease-in-out text-sm font-medium">
          Guardar Cambios
        </button>
      </div>
      <div className="w-full border-dashed border-2 border-gray-300 rounded-lg  bg-white shadow-sm p-2 my-2">
        {contents.map((content, index) => {
          const Template = templates[content.template];
          return (
            <div
              key={index}
              className="animate__animated animate__bounceInRight"
            >
              <Template index={index} />
            </div>
          );
        })}

        <div className="flex w-full justify-center m-1 mb-12">
          <TemplateController></TemplateController>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
