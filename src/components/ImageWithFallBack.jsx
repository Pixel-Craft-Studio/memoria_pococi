/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";

const ImageWithFallback = (props) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [props.src]);

  return (
    <div>
      {!hasError ? (
        <img {...props} onError={() => setHasError(true)} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded">
          <svg
            className="w-24 h-24 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <p className="text-gray-500 text-sm">Imagen no disponible</p>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
