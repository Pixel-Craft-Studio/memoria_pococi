import PropTypes from "prop-types";
import { PREVIEW } from "../../../utils/constants";
import { useContent } from "../ContentContext";
import { useRef, useEffect } from "react";

const TemplateZero = ({ index }) => {
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
        index % 2 == 0 ? "bg-neutral-200" : "bg-neutral-100"
      } `}
    >
      {/* Container principal - flex-col en móvil, flex-row en desktop */}
      <div
        className={`container flex w-full justify-between items-center flex-col lg:flex-row ${
          content.inverted && "lg:flex-row-reverse"
        } `}
      >
        {/* Columna de texto - ocupa todo el ancho en móvil, 50% en desktop */}
        <div className="w-full lg:w-1/2 px-4">
          <div className="text-center">
            <div>
              {content.stage === PREVIEW ? (
                <h2 className="text-3xl border-1 border-transparent">
                  {content.title}
                </h2>
              ) : (
                <h2
                  ref={titleRef}
                  className="text-3xl border-gray-300 border-1 text-center outline-transparent min-h-8 px-2"
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

            <div>
              {content.stage === PREVIEW ? (
                <h2 className="mt-2 text-2xl border-1 border-transparent">
                  {content.year}
                </h2>
              ) : (
                <h2
                  ref={yearRef}
                  className="mt-2 text-2xl border-gray-300 border-1 text-center outline-transparent min-h-8 px-2"
                  contentEditable
                  suppressContentEditableWarning
                  dangerouslySetInnerHTML={{ __html: content.year || "" }}
                  onBlur={(e) => handleContentEditableChange(e, "year")}
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
              <div className="p-2 mt-10 w-full border-1 border-transparent overflow-auto whitespace-pre-line">
                {content.content}
              </div>
            ) : (
              <div
                ref={contentRef}
                className="p-2 mt-10 w-full border-gray-300 border-1 outline-transparent overflow-auto"
                contentEditable
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: content.content || "" }}
                onBlur={(e) => handleContentEditableChange(e, "content")}
              ></div>
            )}
          </div>

          <p className="mt-10"></p>
        </div>

        {/* Columna de imagen - ocupa todo el ancho en móvil, 50% en desktop */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            className="w-full h-auto object-cover bg-center aspect-[16/9]"
            src="https://images7.alphacoders.com/592/thumb-1920-592678.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

TemplateZero.propTypes = {
  index: PropTypes.number.isRequired,
};

export default TemplateZero;