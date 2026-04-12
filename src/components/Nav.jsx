import React from "react";
import "@fontsource/manrope";

const Nav = () => {
  return (
    <div className=" pl-12 pt-4 pr-12 blackfrop-blur-xl items-center flex gap-10 justify-between pb-4 shadow-sm">
      <img src="/img/shopEasy.png" alt="logo" className="w-40" />
      <label className="border-gray-500 border  rounded-2xl w-[38%] p-1">
        <input
          className="rounded-2xl w-[95%] pl-5 outline-none"
          type="text"
          placeholder="Search"
        />
      </label>
      <ul className="mr-8 flex gap-7  list-none cursor-pointer  ">
        <li className="hover:text-cyan-700 text-slate-700">Home</li>
        <li className="hover:text-cyan-700 font-['manrope'] text-slate-700">
          Laptop
        </li>
        <li className="hover:text-cyan-700 font-['manrope'] text-slate-700">
          Mobile
        </li>
        <li className="hover:text-cyan-700 font-['manrope'] text-slate-700">
          Tablet
        </li>
        <li className="hover:text-cyan-700 font-['manrope'] text-slate-700">
          Headphone
        </li>
        <li className="hover:text-cyan-700 font-['manrope'] text-slate-700">
          Cart
        </li>
      </ul>
    </div>
  );
};

export default Nav;
