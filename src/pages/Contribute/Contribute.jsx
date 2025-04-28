/* eslint-disable react-hooks/exhaustive-deps */
import TemplateZero from "./components/TemplateZero";
import TemplateOne from "./components/TemplateOne";
import TemplateTwo from "./components/TemplateTwo";
import { useContent } from "./ContentContext";
import TemplateController from "./components/TemplateController";
import YearDateSelector from "./components/YearDateSelector";
import CategorySelector from "./components/CategorySelector";
import { useEffect, useState } from "react";
import "animate.css";

const Contribute = () => {
  const { contents, setContent } = useContent();
  const [selectedYear, setSelectedYear] = useState();
  const [dateValue, setDateValue] = useState("");
  useEffect(() => {
    setContent(0, { year: selectedYear });
  }, [selectedYear]);

  useEffect(() => {
    setContent(0, { date: dateValue });
  }, [dateValue]);

  const templates = {
    template_zero: TemplateZero,
    template_one: TemplateOne,
    template_two: TemplateTwo,
  };

  const handleSave = () => {
    const historyYear = contents[0].year;
    const timelineSections = [];
    const errors = [];

    const timelineHistory = {
      title: contents[0].title,
      description: contents[0].content,
      timeline_id: historyYear,
      event_date: contents[0].date,
      image: contents[0].image,
    };

    errors.push(validateTimelineHistory(timelineHistory));

    if (contents.length > 1) {
      contents.slice(1).map((section, index) => {
        const timelineSection = {
          title: section.title,
          description: section.content,
          image: section.image,
          template: section.template,
          isInverted: section.inverted,
        };

        errors.push(validateTimelineSection(timelineSection, index+1));


        timelineSections.push(timelineSection);
      });
    }
    
    if (errors.length > 0) {
      return console.log("Errores de validación:", errors);
    } 

    

  };

  function validateTimelineHistory(timelineHistory) {
    const errors = [];

    if (
      typeof timelineHistory.title !== "string" ||
      !timelineHistory.title.trim()
    ) {
      errors.push("El título es inválido.");
    }

    if (
      typeof timelineHistory.description !== "string" ||
      !timelineHistory.description.trim()
    ) {
      errors.push("La descripción es inválida.");
    }

    if (
      typeof timelineHistory.timeline_id !== "string" ||
      !timelineHistory.timeline_id.trim()
    ) {
      errors.push("El año del timeline es inválido.");
    }

    if (!Date.parse(timelineHistory.event_date)) {
      errors.push("La fecha del evento es inválida.");
    }

    const image = timelineHistory.image;
    if (!image || !(image instanceof File)) {
      errors.push("La imagen no es un archivo válido.");
    } else if (
      !["image/jpeg", "image/png", "image/webp"].includes(image.type)
    ) {
      errors.push("El tipo de imagen debe ser JPEG, PNG o WEBP.");
    } else if (image.size > 5 * 1024 * 1024) {
      // 5 MB
      errors.push("La imagen supera el tamaño máximo permitido (5MB).");
    }

    return errors;
  }

  function validateTimelineSection(section, index) {
    const errors = [];

    if (typeof section.title !== "string" || !section.title.trim()) {
      errors.push(`Sección ${index}: el título es inválido.`);
    }

    if (
      typeof section.description !== "string" ||
      !section.description.trim()
    ) {
      errors.push(`Sección ${index}: la descripción es inválida.`);
    }

    if (typeof section.template !== "string" || !section.template.trim()) {
      errors.push(`Sección ${index}: el template es inválido.`);
    }

    if (typeof section.isInverted !== "boolean") {
      errors.push(`Sección ${index}: el campo isInverted debe ser booleano.`);
    }

    const image = section.image;
    if (!image || !(image instanceof File)) {
      errors.push(`Sección ${index}: la imagen no es un archivo válido.`);
    } else if (
      !["image/jpeg", "image/png", "image/webp"].includes(image.type)
    ) {
      errors.push(
        `Sección ${index}: el tipo de imagen debe ser JPEG, PNG o WEBP.`
      );
    } else if (image.size > 5 * 1024 * 1024) {
      errors.push(`Sección ${index}: la imagen supera los 5MB permitidos.`);
    }

    return errors;
  }

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row">
      {/* Panel de configuración - Responsive */}
      <div className="w-full lg:w-70 bg-white rounded-xl shadow-md lg:mr-6 mb-6 lg:mb-0 h-fit lg:sticky lg:top-6 p-5 border border-gray-100">
        <h2 className="text-2xl mb-6 font-light text-[#CB5C1F] border-b border-[#EABF34] pb-3">
          Configuración
        </h2>

        <div className="mb-6">
          <YearDateSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            dateValue={dateValue}
            setDateValue={setDateValue}
          />
        </div>

        <div className="border-t border-gray-200 my-4" />

        <div className="mb-8">
          <CategorySelector />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#CB5C1F] hover:bg-[#EABF34] text-white py-3 px-4 rounded-lg transition-all duration-300 text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
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
