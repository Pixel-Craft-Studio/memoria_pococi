/* eslint-disable react-hooks/exhaustive-deps */
import TemplateZero from "./components/TemplateZero";
import TemplateOne from "./components/TemplateOne";
import TemplateTwo from "./components/TemplateTwo";
import { useContent } from "./ContentContext";
import TemplateController from "./components/TemplateController";
import YearDateSelector from "./components/YearDateSelector";
import CategorySelector from "./components/CategorySelector";
import { useEffect, useState } from "react";
import 'animate.css';

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
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row">
      {/* Panel de configuración - Responsive */}
      <div className="w-full lg:w-60 bg-white rounded-xl shadow-md lg:mr-6 mb-6 lg:mb-0 h-fit lg:sticky lg:top-6 p-5 border border-gray-100">
        <h2 className="text-2xl mb-6 font-light text-[#CB5C1F] border-b border-[#EABF34] pb-3">
          Configuración
        </h2>

        <div className="mb-6">
          <YearDateSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
        
        <div className="border-t border-gray-200 my-4"/>

        <div className="mb-8">
          <CategorySelector />
        </div>

        <button className="w-full bg-[#CB5C1F] hover:bg-[#EABF34] text-white py-3 px-4 rounded-lg transition-all duration-300 text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Guardar Cambios
        </button>
      </div>

      {/* Área de contenido - Responsive */}
      <div className="flex-1 border-2 border-dashed border-[#C2DBF1] rounded-xl bg-white bg-opacity-50 shadow-sm p-4 md:p-6">
        {contents.map((content, index) => {
          const Template = templates[content.template];
          return (
            <div
              key={index}
              className="animate__animated animate__fadeIn mb-6 last:mb-0"
            >
              <Template index={index} />
            </div>
          );
        })}

        <div className="flex w-full justify-center mt-6 md:mt-8 mb-4">
          <TemplateController />
        </div>
      </div>
    </div>
  );
};

export default Contribute;