import PropTypes from "prop-types";
import { PREVIEW } from "../../../utils/constants";
import { useContent } from "../ContentContext";
import { useRef, useEffect } from "react";
import ExpandableController from "./ExpandableController";

const TemplateOne = ({ index, hasControllers=true }) => {
  const { getContent, setContent } = useContent();
  const content = getContent(index);

  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const contentRef = useRef(null);

  const handleContentEditableChange = (e, field) => {
    setContent(index, { [field]: e.currentTarget.innerText });
  };

  useEffect(() => {
    if (titleRef.current && titleRef.current.innerText !== content.title) {
      titleRef.current.innerText = content.title || "";
    }
    if (yearRef.current && yearRef.current.innerText !== content.year) {
      yearRef.current.innerText = content.year || "";
    }
    if (
      contentRef.current &&
      contentRef.current.innerText !== content.content
    ) {
      contentRef.current.innerText = content.content || "";
    }
  }, [content, content.stage]); 

  return (
    <div
      className={`flex flex-col justify-center items-center relative ${
        index % 2 == 0 ? "bg-[#f0f0f0]" : "bg-neutral-100"
      } `}
    >
      {hasControllers && <ExpandableController index={index}></ExpandableController>}

      {/* Container principal - flex-col en móvil, flex-row en desktop */}
      <div
        className={`container flex w-full justify-between flex-col lg:flex-row ${
          content.inverted && "lg:flex-row-reverse"
        } `}
      >
        {/* Columna de texto - ocupa todo el ancho en móvil, 50% en desktop */}
        <div className="w-full lg:w-1/2 px-4">
          <div>
            <div>
              {content.stage === PREVIEW ? (
                <h2 className="mt-2 text-xl border-1 text-left border-transparent min-h-8">
                  {content.title}
                </h2>
              ) : (
                <h2
                  ref={titleRef}
                  className="mt-2 text-xl border-gray-300 border-1 text-left outline-transparent min-h-8 "
                  contentEditable
                  suppressContentEditableWarning
                  dangerouslySetInnerHTML={{ __html: content.title || "" }}
                  onBlur={(e) => handleContentEditableChange(e, "title")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                ></h2>
              )}
            </div>
          </div>

          <div>
            {content.stage === PREVIEW ? (
              <div className="py-2 mt-1 border-1 border-transparent overflow-auto whitespace-pre-line">
                {content.content}
              </div>
            ) : (
              <div
                ref={contentRef}
                className="py-2 mt-1 border-gray-300 border-1 outline-transparent overflow-auto"
                contentEditable
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: content.content || "" }}
                onBlur={(e) => handleContentEditableChange(e, "content")}
              ></div>
            )}
          </div>
        </div>

        {/* Columna de imagen - ocupa todo el ancho en móvil, 50% en desktop */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            className="w-full h-auto object-cover bg-center aspect-[16/9]"
            src="https://www.lateja.cr/resizer/ZUEmhfPxRiuJa7O-F2UP1_Uu8L4=/1440x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gruponacion/66MI6XPCI5D3XBLMI3XG7GHOEU.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

TemplateOne.propTypes = {
  index: PropTypes.number.isRequired,
  hasControllers: PropTypes.bool
};

export default TemplateOne;