import React from "react";
import "@fontsource/manrope";

const Nav = () => {
  return (
    <div className="fixed z-40 top-0 w-full pl-8 pt-5 pr-12 backdrop-blur-xl items-center flex gap-10 mx-auto justify-between pb-5 shadow-sm">
      {/* <img src="/img/shopEasy.png" alt="logo" className="w-40" /> */}
      <p className="font-['manrope'] font-bold text-slate-900 tracking-tighter text-2xl">
        SHOPEASY
      </p>

      <ul className="  ml-8 flex gap-7  list-none cursor-pointer  ">
        <li className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm  text-slate-500 font-['manrope'] ">
          New
        </li>
        <li className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500">
          Home
        </li>
        <li className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500">
          Mobile
        </li>
        <li className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium  text-sm font-['manrope'] text-slate-500">
          Tablet
        </li>
        <li className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500">
          Laptop
        </li>
        <li className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500">
          Headphone
        </li>
      </ul>

      <label className="border-gray-500 border bg-gray-100 rounded-2xl w-[15%] p-1">
        <input
          className="rounded-2xl w-[80%] bg-gray-100 pl-5 outline-none"
          type="text"
          placeholder="Search"
        />
      </label>
    </div>
  );
};

export default Nav;
