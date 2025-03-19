const timelineData = [
  {
    year: "1871",
    title: "Título 1",
    description:
      "Turrialba se convirtió en un punto estratégico gracias al desarrollo del Ferrocarril al Caribe, una obra impulsada por el gobierno de Próspero Fernández y ejecutada bajo la dirección del ingeniero John Durbin. Este proyecto atrajo a cientos de trabajadores, principalmente inmigrantes que buscaban oportunidades en la creciente industria del transporte ferroviario. Con el tiempo, la región experimentó un auge económico, impulsado por la producción agrícola y el comercio con las provincias cercanas.",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNW6gTHWQc9rm_5ux-mTGbRHSeS2oFn0Hx13wPfo2RK6zgZxuSBHX-0E2dGQpRRePN9_A9eSzkR66-gYKxQIy3f-dwm6wPQ8nSC14D3Pb1VJIHVpRHFnvEAKO9amwNvdpA9cTqXHqCs4g/s1600/1106.jpg",
  },
  {
    year: "1871",
    title: "Título 1",
    description:
      "Turrialba se convirtió en un punto estratégico gracias al desarrollo del Ferrocarril al Caribe, una obra impulsada por el gobierno de Próspero Fernández y ejecutada bajo la dirección del ingeniero John Durbin. Este proyecto atrajo a cientos de trabajadores, principalmente inmigrantes que buscaban oportunidades en la creciente industria del transporte ferroviario. Con el tiempo, la región experimentó un auge económico, impulsado por la producción agrícola y el comercio con las provincias cercanas.",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNW6gTHWQc9rm_5ux-mTGbRHSeS2oFn0Hx13wPfo2RK6zgZxuSBHX-0E2dGQpRRePN9_A9eSzkR66-gYKxQIy3f-dwm6wPQ8nSC14D3Pb1VJIHVpRHFnvEAKO9amwNvdpA9cTqXHqCs4g/s1600/1106.jpg",
  },

];

import "./InitialTimeline.css"

// eslint-disable-next-line react/prop-types
const TimelineItem = ({ year, title, description, image, isReversed }) => {
  return (
<div
  className={`flex justify-between flex-col md:flex-row mt-6 ${
    isReversed ? "lg:flex-row-reverse" : ""
  }`}
>
  {/* Columna 2 */}
  <div className="w-full md:w-[45%] flex flex-col gap-3 px-4 order-3 md:order-3 lg:order-1 mt-2">
    <h2 className="font-bold text-2xl text-neutral-500">{title}</h2>
    <p className="line-clamp-5 text-justify">{description}</p>
    <button className="text-sm text-left cursor-pointer text-blue-500 hover:underline">
      Ver historias
    </button>
  </div>

  {/* Columna 1 */}
  <div className="flex justify-evenly gap-4 items-center w-full md:w-[45%] flex-col md:flex-row order-2 md:order-4 lg:order-3">
    <img
      className="w-full md:w-[380px] h-auto rounded-lg"
      src={image}
      alt={`Imagen de ${year}`}
    />
  </div>

  <div className={`flex w-full  gap-3 items-center md:flex-col justify-center order-1 md:order-2 lg:order-2 md:w-10 mb-2 ${isReversed ? "" : "lg:ml-10"}`}>
      <h2 className="font-bold text-neutral-500 text-2xl ">{year}</h2>
      <img
        src="/imgs/notification.png"
        alt="Notificación"
        className="w-[30px] h-[30px] opacity-30 transition duration-300 cursor-pointer rotate-10"
      />
  </div>
  

  {/* Columna 3 */}
  <div className={`relative hidden  md:block n md:absolute md:left-10 lg:relative md:order-1 lg-order-3 hidden-900 ${isReversed ? "lg:mr-17" : "lg:ml-13"}`}>
    <div className="bg-neutral-200 w-[41px] h-[41px] rounded-full"></div>
    <div className="absolute h-[220px] border-neutral-400 border-l-2 top-[40px] left-[20px]"></div>
  </div>



</div>

  );
};

const InitialTimeline = () => {
  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-4 ">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} {...item} isReversed={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default InitialTimeline;
