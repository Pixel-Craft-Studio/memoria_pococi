import { useEffect, useState } from "react";
import { getTeam } from "../services/ServiceTeam";
import TeamCard from "../components/CardTeams";


const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const result = await getTeam();
      if (result) {
        setTeam(result.data);
      }
    };

    fetchTeam();
  }, []);

  if (team.length === 0) return <p className="text-center text-gray-500">Cargando equipo...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Nuestro Equipo</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {team.map((partner) => (
          <TeamCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default Team;
