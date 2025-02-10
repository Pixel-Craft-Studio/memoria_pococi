import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className="flex justify-around items-center bg-gray-300 w-full">

                <img className='h-20 w-20 p-2 rounded-2xl' src="/public/imgs/logo.png" alt="Municipalidad Pococi" />

                <h1 className='hidden text-xl font-bold text-gray-500 lg:block'>Reconstrucción de la memoria histórica de Pococí</h1>

                <div className='flex gap-4 lg:flex-row'>
                    <Link className='font-bold text-gray-500 hover:text-green-800' to="/">Inicio</Link>
                    <Link className='font-bold text-gray-500 hover:text-green-800' to="/">Aportar</Link>
                    <Link className='font-bold text-gray-500 hover:text-green-800' to="/">Contáctenos</Link>
                </div>
            </div>
        </>
    );
};

export default Footer;
