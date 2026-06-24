import React from "react";
import "@fontsource/manrope";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] mt-24 sm:mt-28 md:mt-32 lg:mt-50 px-4 sm:px-6 md:px-8 lg:px-0 gap-8 lg:gap-0 max-w-7xl mx-auto lg:max-w-none">
      <section className="lg:pl-8 mt-4 sm:mt-8 lg:mt-15 order-2 lg:order-1">
        <p className="uppercase text-xs sm:text-sm md:text-md mb-4 sm:mb-7 tracking-[0.2em] font-['manrope'] font-semibold text-gray-600">
          The New Standard
        </p>

        <h1 className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-['manrope'] font-bold tracking-wide leading-tight">
          apple
          <br />
          <span className="text-slate-500">m5 pro</span>
        </h1>

        <p className="text-slate-700 font-medium text-sm sm:text-base md:text-lg font-['manrope'] mt-4 sm:mt-7 w-full lg:w-[85%]">
          Engineered for absolute performance. Featuring the M5 Silicon
          architecture and a Liquid Retina XDR display that redefines clarity.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-10">
          <button
            onClick={() => navigate("/new")}
            className="bg-slate-900 text-white px-6 sm:px-8 py-3 font-medium hover:bg-slate-800 transition-all duration-300 cursor-pointer text-sm sm:text-base"
          >
            Shop Now
          </button>
          <button
            onClick={() => navigate("/laptop")}
            className="border-slate-300 border text-slate-900 px-6 sm:px-8 py-3 font-medium hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer text-sm sm:text-base"
          >
            Learn More
          </button>
        </div>
      </section>
      <section className="mb-10 sm:mb-16 lg:mb-40 order-1 lg:order-2">
        <img
          className="w-full lg:w-[90%] h-auto max-h-[280px] sm:max-h-[360px] md:max-h-[420px] lg:max-h-none object-cover mx-auto rounded-2xl sm:rounded-3xl"
          src="https://static0.pocketlintimages.com/wordpress/wp-content/uploads/2023/02/apple-mac-tips-10.jpg?q=49&fit=crop&w=750&dpr=2"
          alt="laptop image"
        />
      </section>
    </div>
  );
};

export default Home;
