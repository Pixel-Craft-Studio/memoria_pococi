import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

// Datos de ejemplo con variación en la cantidad de categorías
const timelineData = [
  {
    id: "272df49a-7ff6-467d-aab9-77426a1ae74a",
    title: "El Ferrocarril al Caribe",
    description:
      "Turrialba se convirtió en un punto estratégico gracias al desarrollo del Ferrocarril al Caribe, una obra impulsada por el gobierno de Próspero Fernández y ejecutada bajo la dirección del ingeniero John Durbin. Este proyecto atrajo a cientos de trabajadores, principalmente inmigrantes que buscaban oportunidades en la creciente industria del transporte ferroviario. Con el tiempo, la región experimentó un auge económico, impulsado por la producción agrícola y el comercio con las provincias cercanas.",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNW6gTHWQc9rm_5ux-mTGbRHSeS2oFn0Hx13wPfo2RK6zgZxuSBHX-0E2dGQpRRePN9_A9eSzkR66-gYKxQIy3f-dwm6wPQ8nSC14D3Pb1VJIHVpRHFnvEAKO9amwNvdpA9cTqXHqCs4g/s1600/1106.jpg",
    categories: ["Ferrocarril", "Comercio"]
  },
  {
    id: "28514bc3-7d19-4584-8978-d0b701bd748a",
    title: "Auge de la Agricultura",
    description:
      "Turrialba se convirtió en un punto estratégico gracias al desarrollo del Ferrocarril al Caribe, una obra impulsada por el gobierno de Próspero Fernández y ejecutada bajo la dirección del ingeniero John Durbin. Este proyecto atrajo a cientos de trabajadores, principalmente inmigrantes que buscaban oportunidades en la creciente industria del transporte ferroviario. Con el tiempo, la región experimentó un auge económico, impulsado por la producción agrícola y el comercio con las provincias cercanas.",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNW6gTHWQc9rm_5ux-mTGbRHSeS2oFn0Hx13wPfo2RK6zgZxuSBHX-0E2dGQpRRePN9_A9eSzkR66-gYKxQIy3f-dwm6wPQ8nSC14D3Pb1VJIHVpRHFnvEAKO9amwNvdpA9cTqXHqCs4g/s1600/1106.jpg",
    categories: ["Agricultura", "Economía", "Desarrollo Rural", "Exportación", "Café", "Caña de Azúcar", "Inmigración"]
  },
];

const TimelineItem = ({ id, title, description, image, categories, isReversed }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Definir cuántas categorías mostrar inicialmente
  const categoryLimit = 3;
  const hasManyCatagories = categories && categories.length > categoryLimit;
  
  return (
    <div
      className={`flex justify-between flex-col md:flex-row mt-6 ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Columna 2 - Contenido principal */}
      <div className="w-full md:w-[45%] flex flex-col gap-3 px-4 order-3 md:order-3 lg:order-1 mt-2">
        <h2 className="font-bold text-2xl text-neutral-500">{title}</h2>
        <p className="line-clamp-5 text-justify">{description}</p>
        
        {/* Contenedor para "Ver nota" y categorías */}
        <div className="flex justify-between space-y-2">
          {/* Botón "Ver nota" */}
          <Link to={`/linea-especifica/${id}`} className="text-sm text-left cursor-pointer text-blue-500 hover:underline">
            Ver entrada
          </Link>

          {/* Categorías */}
          <div className="flex flex-wrap items-center gap-1">
            
            {/* Mostrar categorías limitadas o todas */}
            <div className="flex flex-wrap gap-1">
              {categories && categories.slice(0, showAllCategories ? categories.length : categoryLimit).map((category, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  {category}
                </span>
              ))}
              
              {/* Botón para mostrar más/menos */}
              {hasManyCatagories && (
                <button 
                  //onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-xs px-2 py-1 text-blue-500 hover:underline cursor-pointer"
                >
                  {showAllCategories ? "Ver menos" : `+${categories.length - categoryLimit} más`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    
      {/* Columna 1 - Imagen */}
      <div className="flex justify-evenly gap-4 items-center w-full md:w-[45%] flex-col md:flex-row order-2 md:order-4 lg:order-3">
        <img
          className="w-full md:w-[380px] h-auto rounded-lg shadow-sm"
          src={image}
          alt={`Imagen de ${title}`}
        />
      </div>
    
      {/* Ícono notificación */}
      <div className={`flex w-full gap-3 items-center md:flex-col justify-center order-1 md:order-2 lg:order-2 md:w-10 mb-2 ${isReversed ? "" : "lg:ml-10"}`}>
        <img
          src="/imgs/notification.png"
          alt="Notificación"
          className="w-[30px] h-[30px] opacity-30 transition duration-300 cursor-pointer hover:opacity-60"
        />
      </div>
      
      {/* Línea de tiempo */}
      <div className={`relative hidden md:block md:absolute md:left-10 lg:relative md:order-1 lg-order-3 hidden-900 ${isReversed ? "lg:mr-17" : "lg:ml-13"}`}>
        <div className="bg-neutral-200 w-[41px] h-[41px] rounded-full"></div>
        <div className="absolute h-[220px] border-neutral-400 border-l-2 top-[40px] left-[20px]"></div>
      </div>
    </div>
  );
};
TimelineItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  isReversed: PropTypes.bool,
};


const HistoriesTimeline = () => {
  const { year } = useParams();

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-4xl m-2 mt-4 ml-14 text-gray-400">
        {year}
      </div>
      <div className="container mx-auto p-4">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} {...item} isReversed={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default HistoriesTimeline;