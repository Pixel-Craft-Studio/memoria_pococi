import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className="flex justify-around items-center w-full">
                <div>
                    <img className='h-20 w-20' src="/public/imgs/logo.jpg" alt="Municipalidad Pococi" />
                </div>
                <div>
                   <h1>Reconstrucción de la memoria histórica de Pococí</h1>
                </div>
                <div className='flex gap-4'>   
                    <Link to="/">Inicio</Link>
                    <Link to="/">Inicio</Link>
                </div>
            </div>
        </>
    );
};

export default Footer;
