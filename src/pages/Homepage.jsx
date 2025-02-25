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
          <div className="container">
            <div className="flex flex-col items-center">
              <div className="flex flex-col ">
                <h2 className="text-2xl text-right">What is Lorem Ipsum?</h2>
                <div className="flex">
                  <img className="h-60" src="/imgs/info.webp" alt="" />
                  <p className="px-5 m-auto">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
              <div className="flex flex-col ">
                <h2 className="text-2xl text-right">What is Lorem Ipsum?</h2>
                <div className="flex">
                  <img className="h-60" src="/imgs/info.webp" alt="" />
                  <p className="px-5 m-auto">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
