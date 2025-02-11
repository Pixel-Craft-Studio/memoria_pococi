import { useEffect, useState } from "react"
import { getAbout } from "../services/ServiceAbout";

function About() {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAbout();
            console.log(result)
            if (result) {
                setData(result.data[0].content);
            }
        };

        fetchData();
    }, []);

    if (!data) return <p>Cargando...</p>;

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex flex-col w-3/4 mt-15">
                    <h2 className="text-3xl font-bold my-5">Sobre nosotros</h2>
                    <p className="text-md font-medium my-5">{data.description}</p>
                </div>

                <img className="my-5 rounded-xl h-60 w-3/4 object-cover" src={data.image_url} alt="About" />

            </div>
        </>
    )
}

export default About