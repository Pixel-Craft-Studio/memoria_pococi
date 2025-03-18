import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="flex flex-col items-center bg-gray-300 w-full h-25">
        <div className="flex">
          <Link className='p-2 text-center text-neutral-500' to='/team'>Equipo de trabajo</Link>
          <Link className='p-2 text-center text-neutral-500' to='/about'>Sobre este sitio</Link>
          <Link className='p-2 text-center text-neutral-500' to='/contacto'>Contáctenos</Link>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500">© Copyright</p>
          <p className="text-gray-500">Todos los derechos reservados</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
