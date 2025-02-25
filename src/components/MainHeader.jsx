import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" w-[100vw] flex justify-center items-center bg-gray-300">
      <div className="container flex justify-around items-center  w-full z-10">
        <Link to={"/"}>
          <img
            className="h-20 w-20 p-2 rounded-2xl"
            src="/imgs/logo.png"
            alt="Municipalidad Pococi"
          />
        </Link>

        <h1 className="hidden text-xl  text-gray-500 lg:block">
          Reconstrucción de la memoria histórica de Pococí
        </h1>

        <div className="flex gap-4 lg:flex-row">
          <Link className="text-gray-500 hover:text-green-800" to="/">
            Inicio
          </Link>

          <Link className="text-gray-500 hover:text-green-800" to="/linea-inicial">
            Línea de tiempo
          </Link>

          <Link className="text-gray-500 hover:text-green-800" to="/">
            Aportar
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Footer;
