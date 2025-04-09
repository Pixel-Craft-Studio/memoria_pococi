import { useEffect } from 'react';
import 'animate.css';

const HomePage = () => {
  useEffect(() => {
    // Inicialización de animaciones (opcional)
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Hero Banner */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src="/imgs/banners/home1.jpg"
          alt="Pococí - Memoria histórica"
        />
        <div className="absolute inset-0 bg-[#CB5C1F] bg-opacity-20 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4 drop-shadow-lg">
              Memoria Histórica de Pococí
            </h1>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto drop-shadow-md">
              Descubre y contribuye a la preservación de nuestra herencia cultural
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="bg-[#E6E7E8] bg-opacity-10 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {[1, 2].map((item) => (
            <div 
              key={item} 
              className={`flex flex-col ${item % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-20 animate__animated animate__fadeInUp`}
            >
              <div className="md:w-1/2">
                <img 
                  className="w-full h-72 md:h-80 object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105" 
                  src="/imgs/info.webp" 
                  alt="Historia de Pococí" 
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-light text-[#CB5C1F] mb-4">
                  {item === 1 ? 'Nuestra Historia' : 'Contribuye con Nosotros'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s 
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                  a type specimen book.
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className="bg-[#EABF34] bg-opacity-20 py-12">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-2xl md:text-3xl font-light text-[#CB5C1F] mb-6">
            ¿Tienes fotos o documentos históricos?
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Ayúdanos a reconstruir la memoria colectiva de Pococí compartiendo tus archivos históricos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;