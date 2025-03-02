import React, { useState } from "react";
import PropTypes from "prop-types";
import { DOWN, EDIT, PREVIEW, UP } from "../../../utils/constants";
import { useContent } from "../ContentContext";
import AddIcon from "../icons/AddIcon";

const TemplateController = () => {
  const { addEmptyTemplate } = useContent();

  const [expanded, setExpanded] = useState(false);

  const handleAddTemplate = (templateType) => {
    addEmptyTemplate(templateType);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const btnClass =
    "cursor-pointer bg-white hover:bg-gray-100 rounded-full border border-neutral-300 active:scale-95 p-2 transition-all shadow-sm flex items-center justify-center w-10 h-10 absolute";

  const buttons = [
    {
      onClick: () => {
        handleAddTemplate("template_one");
      },
      title: "Texto e Imagen",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.05 0.675049H4.95C3.675 0.675049 2.625 1.72505 2.625 3.00005V21C2.625 22.275 3.675 23.3625 4.9875 23.3625H19.0875C20.3625 23.3625 21.45 22.3125 21.45 21V3.00005C21.375 1.72505 20.325 0.675049 19.05 0.675049ZM19.6875 21C19.6875 21.375 19.3875 21.675 19.0125 21.675H4.95C4.575 21.675 4.275 21.375 4.275 21V3.00005C4.275 2.62505 4.575 2.32505 4.95 2.32505H19.05C19.425 2.32505 19.725 2.62505 19.725 3.00005V21H19.6875Z"
            fill="#1C2434"
          />
          <path
            d="M17.0625 3.48755H12.975C12.3 3.48755 11.7375 4.05005 11.7375 4.72505V9.67505C11.7375 10.35 12.3 10.9125 12.975 10.9125H17.0625C17.7375 10.9125 18.3 10.35 18.3 9.67505V4.68755C18.2625 4.05005 17.7375 3.48755 17.0625 3.48755ZM16.575 9.18755H13.425V5.17505H16.575V9.18755Z"
            fill="#1C2434"
          />
          <path
            d="M6.63755 5.8125H9.37505C9.82505 5.8125 10.2375 5.4375 10.2375 4.95C10.2375 4.4625 9.86255 4.125 9.37505 4.125H6.60005C6.15005 4.125 5.73755 4.5 5.73755 4.9875C5.73755 5.475 6.15005 5.8125 6.63755 5.8125Z"
            fill="#1C2434"
          />
          <path
            d="M6.63755 10.5751H9.37505C9.82505 10.5751 10.2375 10.2001 10.2375 9.7126C10.2375 9.2251 9.86255 8.8501 9.37505 8.8501H6.60005C6.15005 8.8501 5.73755 9.2251 5.73755 9.7126C5.73755 10.2001 6.15005 10.5751 6.63755 10.5751Z"
            fill="#1C2434"
          />
          <path
            d="M17.4375 13.6501H6.63752C6.18752 13.6501 5.77502 14.0251 5.77502 14.5126C5.77502 15.0001 6.15002 15.3751 6.63752 15.3751H17.4375C17.8875 15.3751 18.3 15.0001 18.3 14.5126C18.3 14.0251 17.8875 13.6501 17.4375 13.6501Z"
            fill="#1C2434"
          />
          <path
            d="M17.4375 18.4126H6.63752C6.18752 18.4126 5.77502 18.7876 5.77502 19.2751C5.77502 19.7626 6.15002 20.1376 6.63752 20.1376H17.4375C17.8875 20.1376 18.3 19.7626 18.3 19.2751C18.3 18.7876 17.8875 18.4126 17.4375 18.4126Z"
            fill="#1C2434"
          />
        </svg>
      ),
    },
    {
      onClick: () => {
        handleAddTemplate("template_two");
      },
      title: "Texto",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.05 0.675H4.95C3.675 0.675 2.625 1.725 2.625 3V21C2.625 22.275 3.675 23.3625 4.9875 23.3625H19.0875C20.3625 23.3625 21.45 22.3125 21.45 21V3C21.375 1.725 20.325 0.675 19.05 0.675ZM19.6875 21C19.6875 21.375 19.3875 21.675 19.0125 21.675H4.95C4.575 21.675 4.275 21.375 4.275 21V3C4.275 2.625 4.575 2.325 4.95 2.325H19.05C19.425 2.325 19.725 2.625 19.725 3V21H19.6875Z"
            fill="#1C2434"
          />

          <path
            d="M16.5 5.8125H7.5"
            stroke="#1C2434"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M16.5 10.575H7.5"
            stroke="#1C2434"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M16.5 14.5125H7.5"
            stroke="#1C2434"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M16.5 18.4125H7.5"
            stroke="#1C2434"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="absolute  z-50">
      {buttons.map((button, i) => {
        const angleInRadians = (30 * i * Math.PI - 50) / 90;
        const x = 60 * Math.sin(angleInRadians);
        const y = -60 * Math.cos(angleInRadians);

        return (
          <button
            key={i}
            className={`${btnClass} ${
              expanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={button.onClick}
            title={button.title}
            style={{
              transform: expanded
                ? `translate(${x}px, ${y}px)`
                : "translate(0, 0)",
              transition: `transform 0.3s ease ${
                i * 0.05
              }s, opacity 0.3s ease ${i * 0.05}s`,
            }}
          >
            {button.icon}
          </button>
        );
      })}

      <button
        onClick={toggleExpanded}
        className={`${btnClass} z-10 bg-blue-500 hover:bg-blue-600 text-white`}
        style={{ transform: "translate(0, 0)" }}
        title={expanded ? "Contraer panel" : "Expandir panel"}
      >
        <AddIcon width="24" height="24"></AddIcon>
      </button>
    </div>
  );
};

TemplateController.propTypes = {
  index: PropTypes.number.isRequired,
};

export default TemplateController;
