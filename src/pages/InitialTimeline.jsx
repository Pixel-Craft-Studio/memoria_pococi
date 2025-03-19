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
  // Puedes agregar más objetos aquí para más eventos en la línea de tiempo
];

// eslint-disable-next-line react/prop-types
const TimelineItem = ({ year, title, description, image, isReversed }) => {
  return (
    <div
      className={`flex justify-between flex-col md:flex-row ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex justify-evenly gap-4 items-center w-full md:w-[45%] flex-col md:flex-row">
        <img className="w-full md:w-[380px] h-auto rounded-lg" src={image} alt={`Imagen de ${year}`} />
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-neutral-500 text-2xl mb-2">{year}</h2>
          <img
            src="/imgs/favorites.png"
            alt="Favoritos"
            className="w-[30px] h-[30px] grayscale hover:grayscale-0 transition duration-300 cursor-pointer mb-1"
          />
          <img
            src="/imgs/notification.png"
            alt="Notificación"
            className="w-[30px] h-[30px] opacity-30 transition duration-300 cursor-pointer rotate-10"
          />
        </div>
      </div>

      <div className="relative w-[5%] hidden md:block">
        <div className="bg-neutral-200 w-[41px] h-[41px] rounded-full"></div>
        <div className="absolute h-[200px] border-neutral-400 border-l-2 top-[40px] left-[20px]"></div>
      </div>

      <div className="w-full md:w-[45%] flex flex-col gap-3 px-4">
        <h2 className="font-bold text-2xl text-neutral-500">{title}</h2>
        <p className="line-clamp-5 text-justify">{description}</p>
        <button className="text-sm text-left cursor-pointer text-blue-500 hover:underline">Ver historias</button>
      </div>
    </div>
  );
};

const InitialTimeline = () => {
  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-4">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} {...item} isReversed={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default InitialTimeline;
