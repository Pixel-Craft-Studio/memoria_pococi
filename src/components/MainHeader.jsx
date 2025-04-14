import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

const ElegantNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white bg-opacity-95 shadow-sm py-2' : 'bg-[#353535] bg-opacity-30 py-4'}`}>
      <div className="container mx-auto px-4 animate__animated animate__fadeIn">
        <div className="flex justify-between items-center">
          {/* Logo - Versión mejorada */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-300"
          >
            <div className={`p-1.5 rounded-full transition-all duration-500 ${scrolled ? 'bg-[#C2DBF1] bg-opacity-70' : 'bg-white bg-opacity-90'} group-hover:bg-opacity-100 group-hover:shadow-md`}>
              <img
                src="/imgs/logo.png"
                alt="Logo"
                className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className={`text-xl font-light tracking-wider transition-all duration-500 ${scrolled ? 'text-[#CB5C1F]' : 'text-white'} group-hover:text-[#EABF34]`}>
            Memoria Histórica
            </span>
          </Link>

          {/* Menú para desktop - Versión mejorada */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative py-2 px-1 transition-all duration-300 ${scrolled ? 'text-[#CB5C1F]' : 'text-white'} hover:text-[#EABF34] group`}
            >
              <span className="relative z-10 font-medium">Inicio</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#EABF34] transition-all duration-500 w-0 group-hover:w-full`}></span>
            </Link>
            <Link 
              to="/linea-inicial" 
              className={`relative py-2 px-1 transition-all duration-300 ${scrolled ? 'text-[#CB5C1F]' : 'text-white'} hover:text-[#EABF34] group`}
            >
              <span className="relative z-10 font-medium">Línea de Tiempo</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#EABF34] transition-all duration-500 w-0 group-hover:w-full`}></span>
            </Link>
            <Link 
              to="/aportar" 
              className={`relative py-2 px-1 transition-all duration-300 ${scrolled ? 'text-[#CB5C1F]' : 'text-white'} hover:text-[#EABF34] group`}
            >
              <span className="relative z-10 font-medium">Aportar</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#EABF34] transition-all duration-500 w-0 group-hover:w-full`}></span>
            </Link>
            <Link 
              to="/contacto" 
              className={`relative py-2 px-1 transition-all duration-300 ${scrolled ? 'text-[#CB5C1F]' : 'text-white'} hover:text-[#EABF34] group`}
            >
              <span className="relative z-10 font-medium">Contacto</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#EABF34] transition-all duration-500 w-0 group-hover:w-full`}></span>
            </Link>
          </div>

          {/* Botón para mobile - Versión mejorada */}
          <button 
            className="md:hidden focus:outline-none p-2 rounded-full hover:bg-[#C2DBF1] hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 flex flex-col space-y-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-180' : ''}`}>
              <span className={`h-0.5 w-full transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-[#CB5C1F]' : 'bg-white'} ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-[#CB5C1F]' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`h-0.5 w-full transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-[#CB5C1F]' : 'bg-white'} ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Menú mobile - Versión mejorada */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 pt-4 animate__animated animate__fadeIn">
            <Link 
              to="/" 
              className="text-[#CB5C1F] hover:text-white hover:bg-[#CB5C1F] transition-all duration-300 py-3 px-6 rounded-full font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/linea-inicial" 
              className="text-[#CB5C1F] hover:text-white hover:bg-[#CB5C1F] transition-all duration-300 py-3 px-6 rounded-full font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Línea de Tiempo
            </Link>
            <Link 
              to="/aportar" 
              className="text-[#CB5C1F] hover:text-white hover:bg-[#CB5C1F] transition-all duration-300 py-3 px-6 rounded-full font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Aportar
            </Link>
            <Link 
              to="/contacto" 
              className="text-[#CB5C1F] hover:text-white hover:bg-[#CB5C1F] transition-all duration-300 py-3 px-6 rounded-full font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ElegantNav;