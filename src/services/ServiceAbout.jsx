export const getAbout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Se obtuvo exitosamente la información.",
        data: [
          {
            config_key: "about_us",
            content: {
              image_url: "https://example.com/image.jpg",
              description: "Nuestra empresa se especializa en soluciones innovadoras."
            }
          }
        ]
      });
    }, 500); // Simula un pequeño retraso como si fuera una API real
  });
};
