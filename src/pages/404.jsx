import { useEffect } from 'react';
import 'animate.css';

function Error404() {

    useEffect(() => {
        // Agregar la clase para el fondo monocromático al body
        document.body.classList.add('bg-gradient-to-r', 'from-gray-700', 'to-gray-900');

        return () => {
            // Limpiar cuando el componente se desmonte
            document.body.classList.remove('bg-gradient-to-r', 'from-gray-700', 'to-gray-900');
        };
    }, []);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-5 text-gray-100">
                <div className="text-center">
                    {/* Número 404 con animación */}
                    <h1 className="animate__animated animate__fadeIn animate__delay-1s text-9xl font-extrabold mb-8">
                        <span className="animate__animated animate__rubberBand animate__delay-2s inline-block">4</span>
                        <span className="animate__animated animate__flip animate__delay-3s inline-block">0</span>
                        <span className="animate__animated animate__rubberBand animate__delay-4s inline-block">4</span>
                    </h1>

                    {/* Mensaje de error con animación */}
                    <h2 className="animate__animated animate__fadeInUp animate__delay-2s text-2xl md:text-4xl font-bold mb-8 text-gray-200">
                        Oops! Página no encontrada
                    </h2>

                    {/* Línea decorativa animada */}
                    <div className="animate__animated animate__fadeIn animate__delay-3s w-24 h-1 bg-gray-400 mx-auto my-6 rounded-full"></div>

                    {/* Mensaje descriptivo */}
                    <p className="animate__animated animate__fadeIn animate__delay-3s text-lg mb-8 max-w-md mx-auto text-gray-300">
                        La página que estás buscando podría haber sido eliminada, renombrada o temporalmente no disponible.
                    </p>

                    {/* Botón para regresar con animación */}
                    <button
                        onClick={() => window.location.href = '/'}
                        className="cursor-pointer animate__animated animate__pulse animate__infinite animate__slow bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105"
                    >
                        Regresar al inicio
                    </button>

                    {/* Elemento decorativo - estrella animada */}
                    <div className="animate__animated animate__fadeIn animate__delay-4s absolute top-1/4 left-1/4 opacity-20">
                        <div className="animate__animated animate__rotateIn animate__infinite animate__slower">
                            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>

                    {/* Elemento decorativo - círculo animado */}
                    <div className="hidden sm:block animate__animated animate__fadeIn animate__delay-4s absolute bottom-1/4 right-1/4 opacity-20">
                        <div className="animate__animated animate__swing animate__infinite animate__slower">
                            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error404