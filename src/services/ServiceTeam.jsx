export const getTeam = async () => {
  try {
      const response = await fetch('http://localhost:8001/team-member');
      if (!response.ok) {
          throw new Error('Error al obtener los datos del equipo');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};

