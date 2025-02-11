export const getTeam = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: "Miembros del equipo obtenidos exitosamente.",
          data: [
            {
              id: 1001,
              name: "Juan Pérez",
              photo_url: "https://example.com/images/juan_perez.jpg",
              description: "Juan es un desarrollador frontend con una gran pasión por crear interfaces de usuario atractivas y funcionales.",
              role: "Desarrollador Frontend",
              created_at: "2025-02-10T10:00:00+00:00",
              updated_at: "2025-02-10T10:00:00+00:00",
              social_media: [
                {
                  platform_id: 1,
                  platform: "Twitter",
                  icon_url: "https://example.com/icons/twitter.png",
                  url: "https://twitter.com/juanperez",
                  created_at: "2025-02-10T10:00:00+00:00",
                  updated_at: "2025-02-10T10:00:00+00:00"
                },
                {
                  platform_id: 2,
                  platform: "LinkedIn",
                  icon_url: "https://example.com/icons/linkedin.png",
                  url: "https://linkedin.com/in/juanperez",
                  created_at: "2025-02-10T10:00:00+00:00",
                  updated_at: "2025-02-10T10:00:00+00:00"
                }
              ]
            },
            {
              id: 1002,
              name: "María González",
              photo_url: "https://example.com/images/maria_gonzalez.jpg",
              description: "María es una diseñadora UX/UI apasionada por crear experiencias de usuario intuitivas y accesibles.",
              role: "Diseñadora UX/UI",
              created_at: "2025-02-10T11:00:00+00:00",
              updated_at: "2025-02-10T11:00:00+00:00",
              social_media: [
                {
                  platform_id: 1,
                  platform: "Twitter",
                  icon_url: "https://example.com/icons/twitter.png",
                  url: "https://twitter.com/mariagonzalez",
                  created_at: "2025-02-10T11:00:00+00:00",
                  updated_at: "2025-02-10T11:00:00+00:00"
                },
                {
                  platform_id: 4,
                  platform: "Behance",
                  icon_url: "https://example.com/icons/behance.png",
                  url: "https://behance.net/mariagonzalez",
                  created_at: "2025-02-10T11:00:00+00:00",
                  updated_at: "2025-02-10T11:00:00+00:00"
                }
              ]
            }
          ]
        });
      }, 1000); // Simula un retraso para que parezca una API real
    });
  };
  