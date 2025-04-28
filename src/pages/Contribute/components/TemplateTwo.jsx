import PropTypes from "prop-types";
import { PREVIEW } from "../../../utils/constants";
import { useContent } from "../ContentContext";
import { useRef, useEffect } from "react";
import ExpandableController from "./ExpandableController";

const TemplateTwo = ({ index, hasControllers=true }) => {
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
      className={`p-2 flex flex-col justify-center items-center relative ${
        index % 2 == 0 ? "bg-[#f0f0f0]" : "bg-neutral-100"
      } `}
    >
      {hasControllers && <ExpandableController index={index}></ExpandableController>}
      

      <div
        className={`container flex w-full justify-between gap-4 flex-col lg:flex-row ${
          content.inverted && "lg:flex-row-reverse"
        } `}
      >
        <div className="w-full">
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
              <div className="py-2 mt-1  w-full border-1 border-transparent overflow-auto whitespace-pre-line">
                {content.content}
              </div>
            ) : (
              <div
                ref={contentRef}
                className="py-2 mt-1  w-full border-gray-300 border-1 outline-transparent overflow-auto"
                contentEditable
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: content.content || "" }}
                onBlur={(e) => handleContentEditableChange(e, "content")}
              ></div>
            )}
          </div>

          <p className="mt-10"></p>
        </div>

      </div>
    </div>
  );
};

TemplateTwo.propTypes = {
  index: PropTypes.number.isRequired,
  hasControllers: PropTypes.bool
};

export default TemplateTwo;
