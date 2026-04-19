import React from "react";
import "@fontsource/manrope";

const Home = () => {
  return (
    <div className="grid grid-cols-[40%_60%] mt-50  ">
      <section className="pl-8 mt-15 ">
        <p className="uppercase text-md mb-7 tracking-[0.2em] font-['manrope'] font-semibold text-gray-600 ">
          The New Standard
        </p>

        <h1 className="uppercase text-8xl font-['manrope'] font-bold tracking-wide">
          apple
          <br />
          <span className="text-slate-500 ">m5 pro</span>
        </h1>

        <p className="text-slate-700 font-medium text-lg font-['manrope'] mt-7 w-[85%]">
          Engineered for absolute performance. Featuring the M5 Silicon
          architecture and a Liquid Retina XDR display that redefines clarity.
        </p>

        <div className="flex gap-5 mt-10">
          <button className="bg-slate-900 text-white px-8 py-3  font-medium hover:bg-slate-800 transition-all duration-300">
            Shop Now
          </button>
          <button className="border-slate-300 border text-slate-900 px-8 py-3 font-medium hover:bg-slate-900 hover:text-white transition-all duration-300">
            Learn More
          </button>
        </div>
      </section>
      <section className="mb-40">
        <img
          className="w-[90%] h-full object-cover mx-auto  rounded-3xl"
          src="https://static0.pocketlintimages.com/wordpress/wp-content/uploads/2023/02/apple-mac-tips-10.jpg?q=49&fit=crop&w=750&dpr=2"
          alt="laptop image"
        />
      </section>
    </div>
  );
};

export default Home;
