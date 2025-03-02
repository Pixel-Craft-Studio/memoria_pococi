/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { DOWN, UP } from "../../utils/constants";

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [contents, setContents] = useState([
    {
      template: "template_zero",
      stage: "preview",
      inverted: false,
      title: "Example",
      year: "2024",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      image_url: "",
    }

  ]);

  const addEmptyTemplate = (templateType = "template_one") => {
    setContents((prevContents) => [
      ...prevContents,
      {
        template: templateType,
        stage: "preview",
        inverted: false,
        title: "Example",
        year: "2024",
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
        image_url: "",
      },
    ]);
  };

  const setContent = (index, data) => {
    setContents((prevContents) =>
      prevContents.map((item, i) => (i === index ? { ...item, ...data } : item))
    );
  };

  const getContent = (index) => {
    if (index < 0 || index >= contents.length) {
      return null;
    }
    return contents[index];
  };

  const moveContent = (index, direction) => {
    setContents((prevContents) => {
      const newContents = [...prevContents];

      // Avoid move title section
      if (index == 0){
        return newContents;
      }

      if (
        (direction === UP && index > 1) ||
        (direction === DOWN && index < newContents.length - 1)
      ) {
        const swapIndex = direction === UP ? index - 1 : index + 1;
        [newContents[index], newContents[swapIndex]] = [
          newContents[swapIndex],
          newContents[index],
        ];
      }

      return newContents;
    });
  };

  const removeContent = (index) => {
    
    // Avoid remove title section
    if (index == 0){
      return;
    }

    setContents((prevContents) =>
      prevContents.filter((_, i) => i !== index)
    );
  };

  return (
    <ContentContext.Provider
      value={{ contents, setContent, getContent, moveContent, removeContent, addEmptyTemplate }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
