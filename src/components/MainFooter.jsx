import { Link } from 'react-router-dom';
import 'animate.css';

const Footer = () => {
  return (
    <footer className="z-0 animate__animated animate__fadeIn bg-[#ffffff] bg-opacity-30 py-16 border-t-2 border-neutral-200 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Enlaces principales */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <Link
            to="/team"
            className="text-[#CB5C1F] hover:text-[#EABF34] transition-all duration-300 px-5 py-2 rounded-full text-lg font-medium hover:bg-white hover:bg-opacity-20"
          >
            Equipo de trabajo
          </Link>
          <Link
            to="/about"
            className="text-[#CB5C1F] hover:text-[#EABF34] transition-all duration-300 px-5 py-2 rounded-full text-lg font-medium hover:bg-white hover:bg-opacity-20"
          >
            Sobre este sitio
          </Link>
          <Link
            to="/contacto"
            className="text-[#CB5C1F] hover:text-[#EABF34] transition-all duration-300 px-5 py-2 rounded-full text-lg font-medium hover:bg-white hover:bg-opacity-20"
          >
            Contáctenos
          </Link>
        </div>

        {/* Línea divisoria */}
        <div className="animate__animated animate__fadeIn animate__delay-1s border-t border-[#EABF34] border-opacity-30 w-1/3 mx-auto my-8"></div>

        {/* Información de copyright */}
        <div className="animate__animated animate__fadeIn animate__delay-2s flex flex-col items-center text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#CB5C1F]"></div>
            <div className="w-3 h-3 rounded-full bg-[#EABF34]"></div>
            <div className="w-3 h-3 rounded-full bg-[#C2DBF1]"></div>
          </div>
          <p className="text-[#CB5C1F] text-opacity-90 text-sm mb-1 font-light tracking-wide ">
            © {new Date().getFullYear()} Memoria Histórica
          </p>
          <p className="text-[#CB5C1F] text-opacity-60 text-xs font-light tracking-wide">
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;