const HomePage = () => {
  return (
    <>
      <div className="">
        <img
          className="h-60 w-full object-cover"
          src="/imgs/banners/home1.jpg"
          alt="Imagen home"
        />

        <div className="flex w-full justify-center">
          <div className="container max-w-screen-lg px-4 py-10">
            <div className="flex flex-col items-center gap-12">
              {[1, 2].map((item) => (
                <div key={item} className="flex flex-col items-center text-center md:text-left">
                  <h2 className="text-3xl font-semibold mb-4">What is Lorem Ipsum?</h2>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img className="h-60 rounded-lg shadow-lg" src="/imgs/info.webp" alt="Info" />
                    <p className="text-gray-700 leading-relaxed">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s 
                      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                      a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                      remaining essentially unchanged.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
