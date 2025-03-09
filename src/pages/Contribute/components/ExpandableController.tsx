import React, { useState } from "react";
import PropTypes from "prop-types";
import { DOWN, EDIT, PREVIEW, UP } from "../../../utils/constants";
import { useContent } from "../ContentContext";
import BinIcon from "../icons/BinIcon";
import SwapIcon from "../icons/SwapIcon";
import PenIcon from "../icons/PenIcon";
import PreviewIcon from "../icons/PreviewIcon";
import ArrowIcon from "../icons/ArrowIcon";

const ExpandableController = ({ index }) => {
  const { getContent, setContent, moveContent, removeContent } = useContent();
  const [expanded, setExpanded] = useState(true);
  const content = getContent(index);

  const handleOnEdit = () => {
    setContent(index, {
      stage: content.stage === PREVIEW ? EDIT : PREVIEW,
    });
  };

  const handleOnInvert = () => {
    setContent(index, {
      inverted: !content.inverted,
    });
  };

  const handleOnMove = (direction) => {
    moveContent(index, direction);
  };

  const handleOnRemove = () => {
    removeContent(index);
  };

  const nextTemplate = {
    "template_zero": "template_zero",
    "template_one": "template_two",
    "template_two": "template_one",
  };

  const handleOnChangeTemplate = () => {
    setContent(index, {
      template: nextTemplate[content.template],
    });
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const btnClass = 
    "cursor-pointer bg-white hover:bg-gray-100 rounded-full border border-neutral-300 active:scale-99 p-2 transition-all shadow-sm flex items-center justify-center w-10 h-10";

  const buttons = [
    {
      onClick: handleOnEdit,
      title: content.stage === EDIT ? "Deshabilitar edición" : "Habilitar edición",
      icon: content.stage === EDIT ? (
        <PenIcon/>
      ) : (
        <PreviewIcon/>
      ),
    },
    {
      onClick: handleOnInvert,
      title: "Cambiar columnas",
      icon: (
        <SwapIcon/>
      ),
   
    },
    {
      onClick: handleOnRemove,
      title: "Eliminar sección",
      icon: (
        <BinIcon/>
      ),
     
    },
    {
      onClick: () => handleOnMove(UP),
      title: "Subir sección",
      icon: (
        <ArrowIcon/>
      ),
     
    },
    {
      onClick: () => handleOnMove(DOWN),
      title: "Bajar sección",
      icon: (
        <ArrowIcon className="rotate-180"/>
      ),
      
    },
    {
      onClick: handleOnChangeTemplate,
      title: "Cambiar plantilla",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
     
    }
  ];

  if (index == 0) {
    buttons.length = 1;
  }

  return (
    <div className="absolute top-1 right-5 z-50 ">
      
      {buttons.map((button, i) => {
        return (
          <button
            key={i}
            className={`${btnClass} absolute ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={button.onClick}
            title={button.title}
            style={{
              transform: expanded ? `translateX(${((i+1)*-45)}px)` : "translateX(-10px)",
              transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s, opacity 0.3s ease ${i * 0.06}s`,
            }}
          >
            {button.icon}
          </button>
        );
      })}

      {/* Botón principal para expandir/contraer */}
      <button 
        onClick={toggleExpanded}
        className={`${btnClass} z-10 bg-blue-500 hover:bg-blue-600 text-neutral-800`}
        style={{ transform: "translate(0, 0)" }}
        title={expanded ? "Contraer panel" : "Expandir panel"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {expanded ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M12 5v14M5 12h14" />
          )}
        </svg>
      </button>
    </div>
  );
};

ExpandableController.propTypes = {
  index: PropTypes.number.isRequired,
};

export default ExpandableController;